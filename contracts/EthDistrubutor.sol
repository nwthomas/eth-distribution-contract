// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "hardhat/console.sol";

contract EthDistributor is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    bool private isContractLocked = false;
    uint256 private maximumContributionLimit = 10**18;
    uint256 public contributionLimit;
    mapping(address => uint256) public contributionsPerAddress;
    mapping(address => bool) public hasContributed;
    address[] public contributors;

    modifier isUnlocked() {
        require(!isContractLocked, "The contract is currently locked");
        _;
    }

    constructor(uint256 _contributionLimit) {
        updateContributionLimit(_contributionLimit);
    }

    function updateContributionLimit(uint256 _newContributionLimit) public onlyOwner isUnlocked {
        require(
            _newContributionLimit <= maximumContributionLimit,
            "The new contribution limit must be less than 10 ether"
        );
        require(
            _newContributionLimit >= contributionLimit,
            "The new contribution limit must be greater-than-or-equal-to the previous one"
        );
        contributionLimit = _newContributionLimit;
    }

    function withdrawAllAddressEther() external payable isUnlocked {
        require(contributionsPerAddress[msg.sender] > 0, "This address has no ether to withdraw");
        uint256 addressBalance = contributionsPerAddress[msg.sender];

        for (uint256 i = 0; i <= contributors.length; i.add(1)) {
            if (contributors[i] == msg.sender) {
                contributionsPerAddress[contributors[i]] = 0;
                hasContributed[contributors[i]] = false;
                _rotateContributorArrayValueAtIndex(i);
                break;
            }
        }

        contributionsPerAddress[msg.sender] = 0;
        (bool success, ) = msg.sender.call{value: addressBalance}("");
        require(success);
    }

    function contribute() external payable isUnlocked {
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

    function distributeEther() external onlyOwner isUnlocked nonReentrant {
        isContractLocked = true;

        uint256 totalBalance = address(this).balance;
        uint256 amountPerAddress = totalBalance / contributors.length.sub(1);

        // Due to updates in the contribute and withdrawAllAddressEther() functions,
        // we can trust that this array is current and can use it to distribute ether
        for (uint256 i = 0; i < contributors.length; i.add(1)) {
            contributionsPerAddress[contributors[i]] = 0;
            hasContributed[contributors[i]] = false;
            _rotateContributorArrayValueAtIndex(0);
            (bool success, ) = contributors[i].call{value: amountPerAddress}("");
            require(success);
        }

        isContractLocked = false;
    }

    function _rotateContributorArrayValueAtIndex(uint256 _index) private onlyOwner {
        if (contributors.length <= 0) {
            return;
        }

        address formerLastAddress = contributors[contributors.length - 1];
        contributors.pop();
        contributors[_index] = formerLastAddress;
    }
}
