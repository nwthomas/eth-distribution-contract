const chai = require("chai");
const { solidity } = require("ethereum-waffle");
const { ethers } = require("hardhat");
const { expect } = chai;

chai.use(solidity);

describe("EthDistributor", () => {
  describe("constructor", () => {
    test("instantiates with the correct maximum ether and contributor values", async () => {
      const EthDistributor = await ethers.getContractFactory("EthDistributor");
      const ethDistributor = await EthDistributor.deploy(10000000000, 100);
      await ethDistributor.deployed();

      const contributionLimit = await ethDistributor.contributionLimit();
      expect(contributionLimit.toNumber()).to.equal(10000000000);

      const contributorsLimit = await ethDistributor.maximumContributors();
      expect(contributorsLimit.toNumber()).to.equal(100);
    });

    test("instantiates with owner address correctly", async () => {
      const [owner] = await ethers.getSigners();
      const EthDistributor = await ethers.getContractFactory("EthDistributor");
      const ethDistributor = await EthDistributor.deploy(10000000000, 100);
      await ethDistributor.deployed();

      const contractOwner = await ethDistributor.owner();
      expect(contractOwner).to.equal(owner.address);
    });
  });

  describe("updateContributionLimit", () => {
    test("updates the contribution limit when the owner calls it", async () => {
      const [owner] = await ethers.getSigners();
      const EthDistributor = await ethers.getContractFactory("EthDistributor");
      const ethDistributor = await EthDistributor.deploy(10000, 1);
      await ethDistributor.deployed();

      let contributionLimit = await ethDistributor.contributionLimit();
      expect(contributionLimit.toNumber()).to.equal(10000);

      const txn = await ethDistributor.updateContributionLimit(10, { from: owner.address });
      await txn.wait();

      contributionLimit = await ethDistributor.contributionLimit();
      expect(contributionLimit.toNumber()).to.equal(10);
    });

    test("throws when a non-owner address tries to call it", async () => {
      const [, secondAddress] = await ethers.getSigners();
      const EthDistributor = await ethers.getContractFactory("EthDistributor");
      const ethDistributor = await EthDistributor.deploy(10000, 1);
      await ethDistributor.deployed();

      let error;
      try {
        await ethDistributor.connect(secondAddress).updateContributionLimit(10);
      } catch (newError) {
        error = newError;
      }

      expect(error instanceof Error).to.equal(true);
      expect(String(error).indexOf("Ownable: caller is not the owner") > -1).to.equal(true);
    });

    test("throws when the new contribution limit is greater than the maximumContributionLimit", async () => {
      const [owner] = await ethers.getSigners();
      const EthDistributor = await ethers.getContractFactory("EthDistributor");
      const ethDistributor = await EthDistributor.deploy(10000, 1);
      await ethDistributor.deployed();

      let error;
      try {
        await ethDistributor.updateContributionLimit(10 ** 18 + 1, { from: owner.address });
      } catch (newError) {
        error = newError;
      }

      expect(error instanceof Error).to.equal(true);
    });
  });

  describe("contribute", () => {
    test("adds contribution to contract when called and updates tracking variables", async () => {
      const [, secondAddress] = await ethers.getSigners();
      const EthDistributor = await ethers.getContractFactory("EthDistributor");
      const ethDistributor = await EthDistributor.deploy(10000, 1);
      await ethDistributor.deployed();

      const txn = await ethDistributor.connect(secondAddress).contribute({ value: 1000 });
      txn.wait();

      const balance = await ethDistributor.provider.getBalance(ethDistributor.address);
      const firstContributor = await ethDistributor.contributors(0);
      const hasContributed = await ethDistributor.hasContributed(secondAddress.address);
      const contributionsForAddress = await ethDistributor.contributionsPerAddress(
        secondAddress.address
      );
      expect(balance.toNumber()).to.equal(1000);
      expect(firstContributor).to.equal(secondAddress.address);
      expect(hasContributed).to.equal(true);
      expect(contributionsForAddress).to.equal(1000);
    });

    test("throws if the maximum contributors limit for the contract has been reached", async () => {
      const [, secondAddress, thirdAddress] = await ethers.getSigners();
      const EthDistributor = await ethers.getContractFactory("EthDistributor");
      const ethDistributor = await EthDistributor.deploy(10000, 1);
      await ethDistributor.deployed();

      const txn = await ethDistributor.connect(secondAddress).contribute({ value: 1000 });
      txn.wait();

      let error;
      try {
        await ethDistributor.connect(thirdAddress).contribute({ value: 1000 });
      } catch (newError) {
        error = newError;
      }

      expect(error instanceof Error).to.equal(true);
      expect(String(error).indexOf("No more people can contribute to the contract") > -1).to.equal(
        true
      );
    });

    test("allows the same address to contribute again if contributors limit has been reached", async () => {
      const [, secondAddress] = await ethers.getSigners();
      const EthDistributor = await ethers.getContractFactory("EthDistributor");
      const ethDistributor = await EthDistributor.deploy(10000, 1);
      await ethDistributor.deployed();

      const firstTxn = await ethDistributor.connect(secondAddress).contribute({ value: 1000 });
      firstTxn.wait();

      const secondTxn = await ethDistributor.connect(secondAddress).contribute({ value: 1000 });
      secondTxn.wait();

      const contributionsForAddress = await ethDistributor.contributionsPerAddress(
        secondAddress.address
      );
      expect(contributionsForAddress.toNumber()).to.equal(2000);
    });

    test("throws if the maximum contract limit will be reached", async () => {
      const EthDistributor = await ethers.getContractFactory("EthDistributor");
      const ethDistributor = await EthDistributor.deploy(1000, 1000);
      await ethDistributor.deployed();

      const firstTxn = await ethDistributor.contribute({ value: 1000 });
      firstTxn.wait();

      let error;
      try {
        await ethDistributor.contribute({ value: 1 });
      } catch (newError) {
        error = newError;
      }

      expect(error instanceof Error).to.equal(true);
      expect(
        String(error).indexOf("Amount sent greater than the maximum contribution limit") > -1
      ).to.equal(true);
    });
  });

  describe("withdrawAllAddressEther", () => {
    // finish
  });

  describe("distributeEther", () => {
    // finish
  });

  describe("_rotateContibutorArrayValueAtIndex", () => {
    // finish
  });
});
