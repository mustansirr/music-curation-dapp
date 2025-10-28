import pkg from 'hardhat';
const { ethers } = pkg;

async function main() {
  console.log("Starting deployment...");

  // Deploy GrooveToken
  console.log("Deploying GrooveToken...");
  const grooveToken = await hre.ethers.deployContract("GrooveToken");
  await grooveToken.waitForDeployment();
  console.log("GrooveToken deployed to:", grooveToken.target);

  // Deploy PlaylistDAO with GrooveToken address
  console.log("\nDeploying PlaylistDAO...");
  const playlistDAO = await hre.ethers.deployContract("PlaylistDAO", [grooveToken.target]);
  await playlistDAO.waitForDeployment();
  console.log("PlaylistDAO deployed to:", playlistDAO.target);

  console.log("\nDeployment completed!");
  console.log("-------------------");
  console.log("Contract Addresses");
  console.log("-------------------");
  console.log("GrooveToken:", grooveToken.target);
  console.log("PlaylistDAO:", playlistDAO.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });