import "dotenv/config";
import { ethers } from "hardhat";

export async function deployDescriptor() {
  const Descriptor = await ethers.getContractFactory("Descriptor");
  const descriptor = await Descriptor.deploy({
    maxFeePerGas: ethers.BigNumber.from(10000000000),
    maxPriorityFeePerGas: ethers.BigNumber.from(1000000000),
  });
  await descriptor.deployed();
  console.log(`Descriptor address: ${descriptor.address}`);
  return descriptor;
}
