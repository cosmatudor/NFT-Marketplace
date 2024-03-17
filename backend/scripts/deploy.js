const hre = require("hardhat");

async function main() {
  const NFTMarketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const nftMarketplace = await NFTMarketplace.deploy();
  await nftMarketplace.waitForDeployment();

  console.log("NFTMarketplace deployed to:", nftMarketplace.target);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
