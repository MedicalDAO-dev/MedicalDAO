import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";

export const deployDescriptor = async (deployer: SignerWithAddress) => {
  const Descriptor = await ethers.getContractFactory("Descriptor");
  const descriptor = await Descriptor.connect(deployer).deploy();
  descriptor.deployed();

  return { descriptor };
};
