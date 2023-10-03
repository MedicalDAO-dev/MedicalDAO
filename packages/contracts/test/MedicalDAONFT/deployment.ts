import { deployDescriptor } from "../deployments/DeployDescriptor";
import { deployMedicalDAONFT } from "../deployments/DeployMedicalDAONFT";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

export const deploy = async (
  deployer: SignerWithAddress,
  foundersDAO: SignerWithAddress,
  foundersDAO2: SignerWithAddress,
  minter: SignerWithAddress,
) => {
  const { descriptor } = await deployDescriptor(deployer);
  const { medicalDAONFT } = await deployMedicalDAONFT(
    deployer,
    foundersDAO,
    foundersDAO2,
    minter,
    descriptor.address,
  );
  return { descriptor, medicalDAONFT };
};
