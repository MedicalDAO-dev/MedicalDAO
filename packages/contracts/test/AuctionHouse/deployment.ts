import { deployAuctionHouse } from "../deployments/DeployAuctionHouse";
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
  const { auctionHouse } = await deployAuctionHouse(
    deployer,
    medicalDAONFT.address,
    "0x4200000000000000000000000000000000000006", // optimism-goerli weth
    5, // 終了時刻5秒後以内にBidがなければ落札
    2, // 最小Bidは1wei
    2, // 2%以上でBid
    10, // テスト用にオークションは10秒に1回に設定
  );
  await (await medicalDAONFT.setMinter(auctionHouse.address)).wait();
  return { descriptor, medicalDAONFT, auctionHouse };
};
