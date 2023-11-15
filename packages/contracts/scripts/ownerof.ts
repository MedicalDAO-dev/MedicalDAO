import { AUCTION_HOUSE_PROXY_ADDRESS, TOKEN_ADDRESS } from "./helpers/const";
import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  console.log("Signer account: ", signer.address);

  const Token = await ethers.getContractFactory("MedicalDAONFT");
  const token = Token.attach(TOKEN_ADDRESS);

  try {
    for (let i = 0; i < 10; i++) {
      console.log(await token.ownerOf(2));
    }
  } catch (e) {
    console.log(e);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
