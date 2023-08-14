import { ethers, run } from "hardhat";
import "dotenv/config";
import { TOKEN_ADDRESS } from "./helpers/const";

async function main() {
  const network = await ethers.provider.getNetwork();

  const [deployer] = await ethers.getSigners();
  console.log("Deployer account: ", deployer.address);

  const Descriptor = await ethers.getContractFactory("Descriptor");
  const descriptor = await Descriptor.deploy();

  await descriptor.deployed();

  console.log(`New Descriptor address: ${descriptor.address}`);

  const Token = await ethers.getContractFactory("Token");
  const token = Token.attach(TOKEN_ADDRESS);

  console.log(`Token address: ${token.address}`);

  try {
    await (await token.setDescriptor(descriptor.address)).wait();
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
