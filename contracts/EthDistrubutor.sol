// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/// @title A contract for distributing ether equally to any contributors
/// @author Nathan Thomas
/// @notice This contract is not audited - use at your own risk
contract EthDistributor is Ownable, ReentrancyGuard {
    using Strings for uint256;

    // Responsible for locking the contract while the distribution process occurs
    bool private isContractLocked = false;

    uint256 private maximumContributionLimit = 10**18;
    uint256 public contributionLimit;
    uint256 public minimumContribution;
    uint256 public maximumContributors;
    address[] public contributors;
    mapping(address => bool) public hasContributed;
    mapping(address => uint256) public contributionsPerAddress;

    event Contribution(address _from, uint256 _value);
    event Distribution(address _to, uint256 _amount);
    event Withdrawal(address _to, uint256 _value);

    modifier isUnlocked() {
        require(!isContractLocked, "The contract is currently locked");
        _;
    }

    modifier isValidContribution() {
        uint256 newContributionAmount = contributionsPerAddress[msg.sender] + msg.value;
        require(
            msg.value >= minimumContribution,
            string(
                abi.encodePacked(
                    "The amount sent must be greater-than-or-equal-to ",
                    minimumContribution.toString()
                )
            )
        );
        require(
            newContributionAmount <= contributionLimit,
            "Amount sent greater than the maximum contribution limit"
        );
        _;
    }

    modifier areContractContributionsFull() {
        require(
            hasContributed[msg.sender] || contributors.length + 1 <= maximumContributors,
            "No more people can contribute to the contract"
        );
        _;
    }

    /// @notice Instantiates a new contract with a contribution limit, minimum contribution, and maximum number of contributors.
    /// It's recommended that you use either 0.1 or 0.01 ether as the minimum contribution amount.
    /// @param _contributionLimit Sets an initial limit for the amount of ether each contributor can send to the contract
    /// @param _minimumContribution Sets a minimum amount that addresses have to contribute when sending ether to the contract
    /// @param _maximumContributors Sets a maximum amount of addresses that can contribute. This can not be updated.
    /// @dev The maximum limit that an owner can set is 10 ether, or 10**18 in preset variable maximumContributionLimie=t
    constructor(
        uint256 _contributionLimit,
        uint256 _minimumContribution,
        uint256 _maximumContributors
    ) {
        updateContributionLimit(_contributionLimit);
        maximumContributors = _maximumContributors;
        minimumContribution = _minimumContribution;
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

    /// @notice Allows any address to contribute to the contract if it's not locked, not full, and
    /// address has not previously contributed
    receive() external payable isUnlocked areContractContributionsFull isValidContribution {
        contributionsPerAddress[msg.sender] = contributionsPerAddress[msg.sender] + msg.value;

        // Iterating through the contributors array would be inefficient here, so
        // the stub hasContributed mapping allows us to check if the address would
        // have previously been pushed to it
        if (!hasContributed[msg.sender]) {
            hasContributed[msg.sender] = true;
            contributors.push(msg.sender);
        }

        emit Contribution(msg.sender, msg.value);
    }

    /// @notice This function allows a contributor address to withdraw all of their ether if the distribution process
    /// has not already been started by the owning address
    /// @dev This contract attempts to prevent the same address from repeatedly calling the contract by tracking and
    /// invalidating past contributors
    function withdrawAllAddressEther() external payable isUnlocked {
        require(contributionsPerAddress[msg.sender] > 0, "This address has no ether to withdraw");
        uint256 addressBalance = contributionsPerAddress[msg.sender];

        for (uint256 i = 0; i < contributors.length; i += 1) {
            if (contributors[i] == msg.sender) {
                contributionsPerAddress[contributors[i]] = 0;
                hasContributed[contributors[i]] = false;
                _rotateContributorsArrayValueAtIndex(i);
                break;
            }
        }

        (bool success, ) = msg.sender.call{value: addressBalance}("");
        require(success, "Transfer failed.");
        emit Withdrawal(msg.sender, addressBalance);
    }

    /// @notice This function will distribute any available ether to any current contributors - calling
    /// this function will lock the contract until it's done running
    function distributeEther() external onlyOwner isUnlocked nonReentrant {
        isContractLocked = true;

        uint256 totalBalance = address(this).balance;
        uint256 amountPerAddress = totalBalance / contributors.length;

        // Due to updates in the contribute and withdrawAllAddressEther() functions,
        // we can trust that this array is current and can use it to distribute ether
        while (contributors.length > 0) {
            contributionsPerAddress[contributors[0]] = 0;
            hasContributed[contributors[0]] = false;
            address currentContributor = contributors[0];
            _rotateContributorsArrayValueAtIndex(0);
            (bool success, ) = currentContributor.call{value: amountPerAddress}("");
            require(success, "Transfer failed.");
            emit Distribution(currentContributor, amountPerAddress);
        }

        isContractLocked = false;
    }

    /// @notice This removes a given index address and moves the last address in array to given
    /// that index in order to reduce the length of the array
    /// @param _index This is the index of the address that should be removed from the array
    /// @dev This can only be called by the address that instantiated the contract
    function _rotateContributorsArrayValueAtIndex(uint256 _index) private {
        if (contributors.length > 0) {
            contributors[_index] = contributors[contributors.length - 1];
            contributors.pop();
        }
    }
}
