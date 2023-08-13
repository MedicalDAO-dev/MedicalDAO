import { ethers, upgrades } from "hardhat";
import "dotenv/config";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account: ", deployer.address);

  const Descriptor = await ethers.getContractFactory("Descriptor");
  const descriptor = await Descriptor.deploy();

  await descriptor.deployed();

  console.log(`Descriptor address: ${descriptor.address}`);

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy(
    descriptor.address,
    descriptor.address,
    descriptor.address,
    descriptor.address,
    descriptor.address
  );
  console.log(`Token address: ${token.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
