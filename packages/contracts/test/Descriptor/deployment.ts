import { deployDescriptor } from "../deployments/DeployDescriptor";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

export const deploy = async (deployer: SignerWithAddress) => {
  const { descriptor } = await deployDescriptor(deployer);
  return { descriptor };
};
