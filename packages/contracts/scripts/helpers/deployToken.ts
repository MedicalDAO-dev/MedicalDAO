import "dotenv/config";
import { ethers } from "hardhat";

export async function deployToken(
  foundersDAO: string,
  foundersDAO2: string,
  minter: string,
  descriptor: string,
) {
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy(
    foundersDAO,
    foundersDAO2,
    minter,
    descriptor,
    {
      maxFeePerGas: ethers.BigNumber.from(10000000000),
      maxPriorityFeePerGas: ethers.BigNumber.from(1000000000),
    },
  );
  await token.deployed();
  console.log(`Token address: ${token.address}`);
  return token;
}
