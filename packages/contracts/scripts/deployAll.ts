import { deployAuctionHouseProxy } from "./helpers/deployAuctionHouseProxy";
import { deployDescriptor } from "./helpers/deployDescriptor";
import { deployMedicalDAONFT } from "./helpers/deployMedicalDAONFT";
import "dotenv/config";
import { ethers, run } from "hardhat";

async function main() {
  const network = await ethers.provider.getNetwork();
  const [deployer] = await ethers.getSigners();
  console.log("Deployer account: ", deployer.address);

  const descriptor = await deployDescriptor();
  const medicalDAONFT = await deployMedicalDAONFT(
    deployer.address,
    deployer.address,
    deployer.address,
    descriptor.address,
  );
  const {
    auctionHouseProxy,
    auctionHouseImplementationAddress,
    auctionHouseDeployArgs,
  } = await deployAuctionHouseProxy(
    medicalDAONFT.address,
    "0x4200000000000000000000000000000000000006", // optimism-goerli weth
    300,
    1,
    2,
    86400,
  );

  try {
    await (await medicalDAONFT.setMinter(auctionHouseProxy.address)).wait();
    const minterAddress: string = await medicalDAONFT.minter();
    console.log(`MedicalDAONFT minter address: ${minterAddress}`);
  } catch (e) {
    console.log(e);
  }

  if (network.chainId !== 31337) {
    console.log("====================================");
    console.log("Start verifying contracts");

    console.log("Waiting for 10 seconds before verification");
    await new Promise((resolve) => setTimeout(resolve, 10000));

    await verify("Descriptor", descriptor.address, []);

    await verify(
      "MedicalDAONFT",
      medicalDAONFT.address,
      auctionHouseDeployArgs,
    );

    await verify(
      "AuctionHouse implementation",
      auctionHouseImplementationAddress,
      [],
    );

    await verify(
      "AuctionHouseProxy",
      auctionHouseProxy.address,
      auctionHouseDeployArgs,
    );

    console.log("==========================");
  }
}

const verify = async (
  contractName: string,
  contractAddress: string,
  deployArgs: any[],
) => {
  console.log(`Verifying ${contractName}`);
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: deployArgs,
    });
  } catch (e) {
    console.log(`Failed to verify ${contractName}`);
    console.log(e);
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
