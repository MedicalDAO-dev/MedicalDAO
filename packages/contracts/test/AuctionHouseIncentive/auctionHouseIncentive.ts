import { AuctionHouse, Descriptor, MedicalDAONFT } from "../../typechain-types";
import { deploy } from "./deployment";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Descriptor", () => {
  let descriptor: Descriptor;
  let medicalDAONFT: MedicalDAONFT;
  let auctionHouse: AuctionHouse;

  let deployer: SignerWithAddress;
  let foundersDAO: SignerWithAddress;
  let foundersDAO2: SignerWithAddress;
  let minter: SignerWithAddress;
  let bidder1: SignerWithAddress;
  let bidder2: SignerWithAddress;

  beforeEach(async () => {
    [deployer, foundersDAO, foundersDAO2, minter, bidder1, bidder2] =
      await ethers.getSigners();
    ({ descriptor, medicalDAONFT, auctionHouse } = await deploy(
      deployer,
      foundersDAO,
      foundersDAO2,
      minter,
    ));
  });

  describe("incentive test", function () {
    it("should succeed", async function () {
      this.timeout(200000);
      await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
        .reverted;

      let settleCurrentAndCreateNewAuction;
      let auctions;
      let arrayIndex = 0;
      let coefficient = 1;
      let arrayMultipleOften = [];

      for (let j = 1; j <= 2000; j++) {
        if (j % 10 === 0) {
          arrayMultipleOften.push(j);
        }
      }

      for (let i = 1; i <= 1500; i++) {
        settleCurrentAndCreateNewAuction =
          await auctionHouse.settleCurrentAndCreateNewAuction();
        auctions = await auctionHouse.getAuctionsByIds([i]);
        expect(auctions[0].settled).to.equal(true);

        if (i === arrayMultipleOften[arrayIndex] - coefficient) {
          arrayIndex++;
          if (i <= 1464) {
            coefficient += 2;
          } else {
            coefficient += 1;
          }
          for (let k = coefficient - 2; k <= coefficient; k++) {
            if (k !== coefficient) {
              auctions = await auctionHouse.getAuctionsByIds([i + k]);
              expect(auctions[0].settled).to.equal(true);
            } else {
              auctions = await auctionHouse.getAuctionsByIds([i + k]);
              expect(auctions[0].settled).to.equal(false);
            }
          }
        }
      }
    });
  });
});
