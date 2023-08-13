import { ethers, upgrades } from "hardhat";
import "dotenv/config";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account: ", deployer.address);

  const Descriptor = await ethers.getContractFactory("Descriptor");
  const descriptor = await Descriptor.deploy();

  await descriptor.deployed();

  console.log(`Descriptor address: ${descriptor.address}`);

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy(
    descriptor.address,
    descriptor.address,
    descriptor.address,
    descriptor.address,
    descriptor.address
  );
  console.log(`Token address: ${token.address}`);

  const auctionHouseDeployArgs = [
    token.address,
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    300,
    1,
    2,
    86400,
  ];

  const AuctionHouse = await ethers.getContractFactory("AuctionHouse");
  const auctionHouseProxy = await upgrades.deployProxy(
    AuctionHouse,
    auctionHouseDeployArgs,
    {
      kind: "uups",
      initializer: "initialize",
    }
  );
  await auctionHouseProxy.deployed();
  console.log(`AuctionHouseProxy address: ${auctionHouseProxy.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
