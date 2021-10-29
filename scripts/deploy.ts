import * as hre from "hardhat";

const main = async () => {
  const ethDistributorFactory = await hre.ethers.getContractFactory("EthDistributor");
  // Parameters for deploy are max contribution, min contribution, max contributors
  const ethDistributor = await ethDistributorFactory.deploy(1000, 1000, 1000);
  await ethDistributor.deployed();

  console.log("Contract deployed to:", ethDistributor.address);

  const txn = await ethDistributor.contributionLimit();
  console.log("Contribution limit: ", txn);
};

(async function runMain() {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
