import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers, upgrades } from "hardhat";

type auctionHouseDeployArgsType = [
  string,
  string,
  number,
  number,
  number,
  number,
];

export const deployAuctionHouse = async (
  deployer: SignerWithAddress,
  nftAddress: string,
  wethAddress: string,
  timeBuffer: number,
  reservePrice: number,
  minBidIncrementPercentage: number,
  duration: number,
) => {
  const AuctionHouse = await ethers.getContractFactory("AuctionHouse");
  const auctionHouseDeployArgs: auctionHouseDeployArgsType = [
    nftAddress,
    wethAddress,
    timeBuffer,
    reservePrice,
    minBidIncrementPercentage,
    duration,
  ];
  const auctionHouseProxy = await upgrades.deployProxy(
    AuctionHouse,
    auctionHouseDeployArgs,
    {
      kind: "uups",
      initializer: "initialize",
    },
  );
  await auctionHouseProxy.connect(deployer).deployed();

  const auctionHouse = AuctionHouse.attach(auctionHouseProxy.address);

  return { auctionHouse };
};
