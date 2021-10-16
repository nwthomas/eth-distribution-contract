const chai = require("chai");
const { solidity } = require("ethereum-waffle");
const { ethers, waffle } = require("hardhat");
const { expect } = chai;

chai.use(solidity);

describe("EthDistributor", () => {
  let ownerAddress, secondAddress, thirdAddress;

  const getDeployedContract = async (maximumContribution, maximumContributors) => {
    const EthDistributor = await ethers.getContractFactory("EthDistributor");
    const ethDistributor = await EthDistributor.deploy(maximumContribution, maximumContributors);
    await ethDistributor.deployed();

    return ethDistributor;
  };

  beforeEach(async () => {
    const [owner, second, third] = await ethers.getSigners();
    ownerAddress = owner;
    secondAddress = second;
    thirdAddress = third;
  });

  describe("constructor", () => {
    it("instantiates with the correct maximum ether and contributor values", async () => {
      const ethDistributor = await getDeployedContract(10000000000, 100);

      const contributionLimit = await ethDistributor.contributionLimit();
      expect(contributionLimit.toNumber()).to.equal(10000000000);

      const contributorsLimit = await ethDistributor.maximumContributors();
      expect(contributorsLimit.toNumber()).to.equal(100);
    });

    it("instantiates with owner address correctly", async () => {
      const ethDistributor = await getDeployedContract(10000000000, 100);

      const contractOwner = await ethDistributor.owner();
      expect(contractOwner).to.equal(ownerAddress.address);
    });
  });

  describe("updateContributionLimit", () => {
    it("updates the contribution limit when the owner calls it", async () => {
      const ethDistributor = await getDeployedContract(10000, 1);

      let contributionLimit = await ethDistributor.contributionLimit();
      expect(contributionLimit.toNumber()).to.equal(10000);

      await ethDistributor.updateContributionLimit(10);

      contributionLimit = await ethDistributor.contributionLimit();
      expect(contributionLimit.toNumber()).to.equal(10);
    });

    it("throws when a non-owner address tries to call it", async () => {
      const ethDistributor = await getDeployedContract(10000, 1);

      let error;
      try {
        await ethDistributor.connect(secondAddress).updateContributionLimit(10);
      } catch (newError) {
        error = newError;
      }

      expect(error instanceof Error).to.equal(true);
      expect(String(error).indexOf("Ownable: caller is not the owner") > -1).to.equal(true);
    });

    it("throws when the new contribution limit is greater than the maximumContributionLimit", async () => {
      const ethDistributor = await getDeployedContract(10000, 1);

      let error;
      try {
        await ethDistributor.updateContributionLimit(10 ** 18 + 1);
      } catch (newError) {
        error = newError;
      }

      expect(error instanceof Error).to.equal(true);
    });
  });

  describe("contribute", () => {
    it("adds contribution to contract when called and updates tracking variables", async () => {
      const ethDistributor = await getDeployedContract(10000, 1);

      await ethDistributor.connect(secondAddress).contribute({ value: 1000 });

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

    it("throws if the maximum contributors limit for the contract has been reached", async () => {
      const ethDistributor = await getDeployedContract(10000, 1);

      await ethDistributor.connect(secondAddress).contribute({ value: 1000 });

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

    it("allows the same address to contribute again if contributors limit has been reached", async () => {
      const ethDistributor = await getDeployedContract(10000, 1);

      await ethDistributor.connect(secondAddress).contribute({ value: 1000 });
      await ethDistributor.connect(secondAddress).contribute({ value: 1000 });

      const contributionsForAddress = await ethDistributor.contributionsPerAddress(
        secondAddress.address
      );
      expect(contributionsForAddress.toNumber()).to.equal(2000);
    });

    it("throws if the maximum contract limit will be reached", async () => {
      const ethDistributor = await getDeployedContract(1000, 1000);

      await ethDistributor.contribute({ value: 1000 });

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
    it("removes ether from contract", async () => {
      const ethDistributor = await getDeployedContract(1000000000, 1);

      await ethDistributor.connect(secondAddress).contribute({ value: 10000000 });

      const beforeContractAddressBalance = await ethDistributor.provider.getBalance(
        ethDistributor.address
      );
      expect(beforeContractAddressBalance.toNumber()).to.equal(10000000);

      await ethDistributor.connect(secondAddress).withdrawAllAddressEther();

      const afterContractAddressBalance = await ethDistributor.provider.getBalance(
        ethDistributor.address
      );
      expect(afterContractAddressBalance.toNumber()).to.equal(0);
    });

    it("sends ether contributed so far back to address", async () => {
      const ethDistributor = await getDeployedContract(10 ** 10, 1);

      await ethDistributor.connect(secondAddress).contribute({ value: 1000000000 });

      await ethDistributor.connect(secondAddress).contribute({ value: 1 });

      let beforeAddressBalance = await ethDistributor.provider.getBalance(secondAddress.address);
      beforeAddressBalance = ethers.utils.formatEther(beforeAddressBalance);

      await ethDistributor.connect(secondAddress).withdrawAllAddressEther();

      let afterAddressBalance = await ethDistributor.provider.getBalance(secondAddress.address);
      afterAddressBalance = ethers.utils.formatEther(afterAddressBalance);

      expect(await ethDistributor.hasContributed(secondAddress.address)).to.equal(false);
      expect(await ethDistributor.contributionsPerAddress(secondAddress.address)).to.equal(0);
      expect(await ethDistributor.provider.getBalance(ethDistributor.address)).to.equal(0);
    });
  });

  describe("distributeEther", () => {
    // finish
  });

  describe("_rotateContibutorArrayValueAtIndex", async () => {
    it("rotates end of contributors array to location of removed contributor", async () => {
      const ethDistributor = await getDeployedContract(1000000000, 100);

      await ethDistributor.contribute({ value: 10000 });
      await ethDistributor.connect(secondAddress).contribute({ value: 10000 });
      await ethDistributor.connect(thirdAddress).contribute({ value: 10000 });

      const beforeWithdrawalAddress = await ethDistributor.contributors(1);

      await ethDistributor.connect(secondAddress).withdrawAllAddressEther();

      const afterWithdrawalAddress = await ethDistributor.contributors(1);

      expect(beforeWithdrawalAddress).to.equal(secondAddress.address);
      expect(afterWithdrawalAddress).to.equal(thirdAddress.address);
    });

    it("successfully handles when contributors.length == 1", async () => {
      const ethDistributor = await getDeployedContract(1000000000, 100);

      await ethDistributor.contribute({ value: 10000 });

      expect(await ethDistributor.contributors(0)).to.equal(ownerAddress.address);

      await ethDistributor.withdrawAllAddressEther();

      let error;
      try {
        await ethDistributor.contributors(0);
      } catch (newError) {
        error = newError;
      }

      expect(error instanceof Error).to.equal(true);
    });
  });
});
