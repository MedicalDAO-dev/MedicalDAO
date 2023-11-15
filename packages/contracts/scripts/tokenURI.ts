import { AUCTION_HOUSE_PROXY_ADDRESS, TOKEN_ADDRESS } from "./helpers/const";
import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("Signer account: ", signer.address);

  const Token = await ethers.getContractFactory("MedicalDAONFT");
  const token = Token.attach(TOKEN_ADDRESS);

  try {
    console.log(await token.tokenURI(0));
  } catch (e) {
    console.log(e);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
