const hre = require("hardhat");

const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory("EthDistributor");
  // Parameters for deploy are max contribution, min contribution, max contributors
  const nftContract = await nftContractFactory.deploy(10 ^ 18, 1000, 100);
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);
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
