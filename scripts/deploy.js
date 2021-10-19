const hre = require("hardhat");

const main = async () => {
  const ethDistributorFactory = await hre.ethers.getContractFactory("EthDistributor");
  const ethDistributor = await ethDistributorFactory.deploy();
  await ethDistributor.deployed();

  console.log("Contract deployed to:", ethDistributor.address);

  let txn = await nftContract.makeNFT();
  await txn.wait();
  console.log("Minted an NFT");
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
