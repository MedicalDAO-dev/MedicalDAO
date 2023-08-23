import { ethers, run, upgrades } from "hardhat";
import "dotenv/config";

async function main() {
  const network = await ethers.provider.getNetwork();

  const [deployer] = await ethers.getSigners();
  console.log("Deployer account: ", deployer.address);

  const Descriptor = await ethers.getContractFactory("Descriptor");
  const descriptor = await Descriptor.deploy();

  await descriptor.deployed();

  console.log(`Descriptor address: ${descriptor.address}`);

  const tokenDeployArgs: Array<string> = [
    deployer.address,
    deployer.address,
    deployer.address,
    descriptor.address,
    "0xa5409ec958C83C3f309868babACA7c86DCB077c1",
  ];

  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy(
    tokenDeployArgs[0],
    tokenDeployArgs[1],
    tokenDeployArgs[2],
    tokenDeployArgs[3],
    tokenDeployArgs[4]
  );
  console.log(`Token address: ${token.address}`);

  type auctionHouseDeployArgsType = [
    string,
    string,
    number,
    number,
    number,
    number
  ];

  const auctionHouseDeployArgs: auctionHouseDeployArgsType = [
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

  const auctionHouseImplementationAddress: string =
    await upgrades.erc1967.getImplementationAddress(auctionHouseProxy.address);
  console.log(
    `AuctionHouse implementation address: ${auctionHouseImplementationAddress}`
  );

  try {
    await (await token.setMinter(auctionHouseProxy.address)).wait();
    const minterAddress: string = await token.minter();
    console.log(`Token minter address: ${minterAddress}`);
  } catch (e) {
    console.log(e);
  }

  if (network.chainId === 11155111) {
    console.log("====================================");
    console.log("Start verifying contracts");

    console.log("Waiting for 10 seconds before verification");
    await new Promise((resolve) => setTimeout(resolve, 10000));

    await verify("Descriptor", descriptor.address, []);

    await verify("Token", token.address, auctionHouseDeployArgs);

    await verify(
      "AuctionHouse implementation",
      auctionHouseImplementationAddress,
      []
    );

    await verify(
      "AuctionHouseProxy",
      auctionHouseProxy.address,
      auctionHouseDeployArgs
    );

    console.log("==========================");
  }
}

const verify = async (
  contractName: string,
  contractAddress: string,
  deployArgs: any[]
) => {
  console.log(`Verifying ${contractName}`);
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: deployArgs,
    });
  } catch (e) {
    console.log(`Failed to verify ${contractName}`);
    console.log(e);
  }
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
