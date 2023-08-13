import { ethers } from "hardhat";

async function main() {
  const Descriptor = await ethers.getContractFactory("Descriptor");
  const descriptor = await Descriptor.deploy();

  await descriptor.deployed();

  console.log(`Descriptor deployed to ${descriptor.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
