import { AUCTION_HOUSE_PROXY_ADDRESS } from "./helpers/const";
import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("Signer account: ", signer.address);

  const AuctionHouse = await ethers.getContractFactory("AuctionHouse");
  const auctionHouse = AuctionHouse.attach(AUCTION_HOUSE_PROXY_ADDRESS);

  try {
    console.log(await auctionHouse.auction());
  } catch (e) {
    console.log(e);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
