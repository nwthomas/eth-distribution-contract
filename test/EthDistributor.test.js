const { ethers } = require("hardhat");

describe("EthDistributor", () => {
  describe("constructor", () => {
    test("instantiates with the correct maximum ether and contributor values", async () => {
      const EthDistributor = await ethers.getContractFactory("EthDistributor");
      const ethDistributor = await EthDistributor.deploy(10000000000, 100);
      await ethDistributor.deployed();

      const contributionLimit = await ethDistributor.contributionLimit();
      expect(contributionLimit.toNumber()).toBe(10000000000);

      const contributorsLimit = await ethDistributor.maximumContributors();
      expect(contributorsLimit.toNumber()).toBe(100);
    });

    test("instantiates with owner address correctly", async () => {
      const [owner] = await ethers.getSigners();
      const EthDistributor = await ethers.getContractFactory("EthDistributor");
      const ethDistributor = await EthDistributor.deploy(10000000000, 100);
      await ethDistributor.deployed();

      const contractOwner = await ethDistributor.owner();
      expect(contractOwner).toBe(owner.address);
    });
  });

  describe("updateContributionLimit", () => {
    // finish
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
