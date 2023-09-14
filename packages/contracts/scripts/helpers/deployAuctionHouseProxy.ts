import "dotenv/config";
import { ethers, upgrades } from "hardhat";

type auctionHouseDeployArgsType = [
  string,
  string,
  number,
  number,
  number,
  number,
];

export async function deployAuctionHouseProxy(
  nft: string,
  weth: string,
  timeBuffer: number,
  reservePrice: number,
  minBidIncrementPercentage: number,
  duration: number,
) {
  const AuctionHouse = await ethers.getContractFactory("AuctionHouse");
  const auctionHouseDeployArgs: auctionHouseDeployArgsType = [
    nft,
    weth,
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
  await auctionHouseProxy.deployed();
  console.log(`AuctionHouseProxy address: ${auctionHouseProxy.address}`);
  const auctionHouseImplementationAddress =
    await upgrades.erc1967.getImplementationAddress(auctionHouseProxy.address);
  console.log(
    `AuctionHouse implementation address: ${auctionHouseImplementationAddress}`,
  );
  return {
    auctionHouseProxy,
    auctionHouseImplementationAddress,
    auctionHouseDeployArgs,
  };
}
