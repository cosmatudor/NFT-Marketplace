const hre = require("hardhat");

async function main() {
    const [owner, otherAccount] = await hre.ethers.getSigners();
    console.log("Owner address: ", owner.address);
    console.log("Other account address: ", otherAccount.address);
    const NFTMarketplace = await hre.ethers.getContractAt("NFTMarketplace", "0x5FbDB2315678afecb367f032d93F642f64180aa3");
    const nftMarketplace = await NFTMarketplace.connect(otherAccount);
    console.log(await nftMarketplace.getOwnerUnlistedTokens());
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
