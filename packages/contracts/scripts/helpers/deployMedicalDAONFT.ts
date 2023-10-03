import "dotenv/config";
import { ethers } from "hardhat";

export async function deployMedicalDAONFT(
  foundersDAO: string,
  foundersDAO2: string,
  minter: string,
  descriptor: string,
) {
  const MedicalDAONFT = await ethers.getContractFactory("MedicalDAONFT");
  const medicalDAONFT = await MedicalDAONFT.deploy(
    foundersDAO,
    foundersDAO2,
    minter,
    descriptor,
    {
      maxFeePerGas: ethers.BigNumber.from(10000000000),
      maxPriorityFeePerGas: ethers.BigNumber.from(1000000000),
    },
  );
  await medicalDAONFT.deployed();
  console.log(`MedicalDAONFT address: ${medicalDAONFT.address}`);
  return medicalDAONFT;
}
