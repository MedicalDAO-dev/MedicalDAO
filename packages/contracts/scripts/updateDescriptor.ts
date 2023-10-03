import { TOKEN_ADDRESS } from "./helpers/const";
import "dotenv/config";
import { ethers, run } from "hardhat";

async function main() {
  const network = await ethers.provider.getNetwork();

  const [deployer] = await ethers.getSigners();
  console.log("Deployer account: ", deployer.address);

  const Descriptor = await ethers.getContractFactory("Descriptor");
  const descriptor = await Descriptor.deploy();

  await descriptor.deployed();

  console.log(`New Descriptor address: ${descriptor.address}`);

  const MedicalDAONFT = await ethers.getContractFactory("MedicalDAONFT");
  const medicalDAONFT = MedicalDAONFT.attach(TOKEN_ADDRESS);

  console.log(`MedicalDAONFT address: ${medicalDAONFT.address}`);

  try {
    await (await medicalDAONFT.setDescriptor(descriptor.address)).wait();
    console.log("Descriptor set successfully");
  } catch (e) {
    console.log("Descriptor set failed");
    console.log(e);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
