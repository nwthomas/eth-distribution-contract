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
      const [, secondary] = await ethers.getSigners();
      const EthDistributor = await ethers.getContractFactory("EthDistributor");
      const ethDistributor = await EthDistributor.deploy(10000, 1);
      await ethDistributor.deployed();

      let error;
      try {
        await ethDistributor.connect(secondary).updateContributionLimit(10);
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

  describe("withdrawAllAddressEther", () => {
    // finish
  });

  describe("contribute", () => {
    // finish
  });

  describe("distributeEther", () => {
    // finish
  });

  describe("_rotateContibutorArrayValueAtIndex", () => {
    // finish
  });
});
