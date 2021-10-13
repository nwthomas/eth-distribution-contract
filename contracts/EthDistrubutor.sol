// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

/// @title A contract for distributing ether equally to any contributors
/// @author Nathan Thomas
/// @notice This contract is not audited - use at your own risk
contract EthDistributor is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    // Responsible for locking the contract while
    bool private isContractLocked = false;

    uint256 private maximumContributionLimit = 10**18;
    uint256 public contributionLimit;
    uint256 private maximumContributors;
    address[] public contributors;
    mapping(address => bool) private invalidContributors;
    mapping(address => bool) public hasContributed;
    mapping(address => uint256) public contributionsPerAddress;

    modifier isUnlocked() {
        require(!isContractLocked, "The contract is currently locked");
        _;
    }

    modifier areContractContributionsFull() {
        require(
            contributors.length + 1 <= maximumContributors,
            "No more people can contribute to the contract"
        );
        _;
    }

    modifier isValidContributor() {
        require(
            !invalidContributors[msg.sender],
            "This address cannot contribute again to this contract"
        );
        _;
    }

    /// @notice Instantiates a new contract with a contribution limit and a maximum number of contributors.
    /// @param _contributionLimit Sets an initial limit for the amount of ether each contributor can send to the contract
    /// @param _maximumContributors Sets a maximum amount of addresses that can contribute. This can not be updated.
    /// @dev The maximum limit that an owner can set is 10 ether, or 10**18 in preset variable maximumContributionLimit
    constructor(uint256 _contributionLimit, uint256 _maximumContributors) {
        updateContributionLimit(_contributionLimit);
        maximumContributors = _maximumContributors;
    }

    /// @notice Takes in a new contribution limit and updates the contract with it
    /// @param _newContributionLimit The new contribution limit for the contract
    /// @dev The _newContributionLimit cannot be greater than 10 ether
    function updateContributionLimit(uint256 _newContributionLimit) public onlyOwner isUnlocked {
        require(
            _newContributionLimit <= maximumContributionLimit,
            "The new contribution limit must be less than 10 ether"
        );
        contributionLimit = _newContributionLimit;
    }

    /// @notice This function allows a contributor address to withdraw all of their ether if the distribution process
    /// has not already been started by the owning address
    /// @dev This contract attempts to prevent the same address from repeatedly calling the contract by tracking and
    /// invalidating past contributors
    function withdrawAllAddressEther() external payable isUnlocked {
        require(contributionsPerAddress[msg.sender] > 0, "This address has no ether to withdraw");
        uint256 addressBalance = contributionsPerAddress[msg.sender];

        for (uint256 i = 0; i <= maximumContributors; i.add(1)) {
            if (contributors[i] == msg.sender) {
                contributionsPerAddress[contributors[i]] = 0;
                hasContributed[contributors[i]] = false;
                invalidContributors[contributors[i]] = true;
                _rotateContributorArrayValueAtIndex(i);
                break;
            }
        }

        (bool success, ) = msg.sender.call{value: addressBalance}("");
        require(success);
    }

    /// @notice Allows any address to contribute to the contract if it's not locked, not full, and
    /// address has not previously contributed
    function contribute()
        external
        payable
        isUnlocked
        areContractContributionsFull
        isValidContributor
    {
        uint256 newContributionAmount = contributionsPerAddress[msg.sender].add(msg.value);
        require(
            newContributionAmount <= contributionLimit,
            "Amount sent greater than the maximum contribution limit"
        );
        contributionsPerAddress[msg.sender] = newContributionAmount;

        // Iterating through the contributors array would be inefficient here, so
        // the stub hasContributed mapping allows us to check if the address would
        // have previously been pushed to it
        if (!hasContributed[msg.sender]) {
            hasContributed[msg.sender] = true;
            contributors.push(msg.sender);
        }
    }

    /// @notice This function will distribute any available ether to any current contributors - calling
    /// this function will lock the contract until it's done running
    function distributeEther() external onlyOwner isUnlocked nonReentrant {
        isContractLocked = true;

        uint256 totalBalance = address(this).balance;
        uint256 amountPerAddress = totalBalance / contributors.length.sub(1);

        // Due to updates in the contribute and withdrawAllAddressEther() functions,
        // we can trust that this array is current and can use it to distribute ether
        for (uint256 i = 0; i < maximumContributors; i.add(1)) {
            contributionsPerAddress[contributors[i]] = 0;
            hasContributed[contributors[i]] = false;
            _rotateContributorArrayValueAtIndex(0);
            (bool success, ) = contributors[i].call{value: amountPerAddress}("");
            require(success);
        }

        isContractLocked = false;
    }

    /// @notice This removes a given index address and moves the last address in array to given
    /// that index in order to reduce the length of the array
    /// @param _index This is the index of the address that should be removed from the array
    /// @dev This can only be called by the address that instantiated the contract
    function _rotateContributorArrayValueAtIndex(uint256 _index) private onlyOwner {
        if (contributors.length <= 0) {
            return;
        }

        address formerLastAddress = contributors[contributors.length - 1];
        contributors.pop();
        contributors[_index] = formerLastAddress;
    }
}