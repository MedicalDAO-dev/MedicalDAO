import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";

export const deployMedicalDAONFT = async (
  deployer: SignerWithAddress,
  foundersDAO: SignerWithAddress,
  foundersDAO2: SignerWithAddress,
  minter: SignerWithAddress,
  descriptorAddress: string,
) => {
  const MedicalDAONFT = await ethers.getContractFactory("MedicalDAONFT");
  const medicalDAONFT = await MedicalDAONFT.connect(deployer).deploy(
    foundersDAO.address,
    foundersDAO2.address,
    minter.address,
    descriptorAddress,
  );
  medicalDAONFT.deployed();

  return { medicalDAONFT };
};
