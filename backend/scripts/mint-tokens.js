import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  
  console.log("Minting with address:", deployer.address);

  // Get the GrooveToken contract
  const grooveToken = await hre.ethers.getContractAt(
    "GrooveToken",
    "0x2c1D0ae11C69Bfe1689266A31fF05F835B9D0250"
  );

  console.log("Minting GROOVE tokens...");
  
  // Mint 1000 tokens (with 18 decimals)
  const mintAmount = hre.ethers.parseEther("1000");
  const tx = await grooveToken.mint(deployer.address, mintAmount);
  
  await tx.wait();
  
  console.log(`Minted ${hre.ethers.formatEther(mintAmount)} GROOVE tokens to ${deployer.address}`);
  
  // Check balance
  const balance = await grooveToken.balanceOf(deployer.address);
  console.log(`New balance: ${hre.ethers.formatEther(balance)} GROOVE`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });