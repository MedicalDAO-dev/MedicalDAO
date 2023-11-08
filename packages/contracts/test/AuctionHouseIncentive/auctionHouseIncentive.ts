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
      let array = [];

      for (let l = 1; l <= 2000; l++) {
        if (l % 10 === 0) {
          array.push(l);
        }
      }

      for (let i = 1; i <= 1449; i++) {
        settleCurrentAndCreateNewAuction =
          await auctionHouse.settleCurrentAndCreateNewAuction();

        auctions = await auctionHouse.getAuctionsByIds([i]);
        expect(auctions[0].settled).to.equal(true);
        if (i === array[arrayIndex] - coefficient) {
          arrayIndex++;
          coefficient += 2;
          for (let m = 1; m <= coefficient; m++) {
            if (m !== coefficient) {
              auctions = await auctionHouse.getAuctionsByIds([i + m]);
              expect(auctions[0].settled).to.equal(true);
            } else {
              auctions = await auctionHouse.getAuctionsByIds([i + m]);
              expect(auctions[0].settled).to.equal(false);
            }
          }
        }
      }
    });
  });

  // describe("incentive test", () => {
  //   it("should succeed", async () => {
  //     await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
  //       .reverted;

  //     let settleCurrentAndCreateNewAuction;
  //     let auctions;
  //     let arrayIndex = 0;
  //     let coefficient = 1;
  //     let array = [];

  //     for (let l = 1; l <= 2000; l++) {
  //       if (l % 10 === 0) {
  //         array.push(l);
  //       }
  //     }

  //     for (let i = 1; i <= 100; i++) {
  //       settleCurrentAndCreateNewAuction =
  //         await auctionHouse.settleCurrentAndCreateNewAuction();

  //       auctions = await auctionHouse.getAuctionsByIds([i]);
  //       expect(auctions[0].settled).to.equal(true);
  //       if (i === array[arrayIndex] - coefficient) {
  //         arrayIndex++;
  //         coefficient += 2;
  //         for (let m = 1; m <= coefficient; m++) {
  //           if (m !== coefficient) {
  //             auctions = await auctionHouse.getAuctionsByIds([i + m]);
  //             expect(auctions[0].settled).to.equal(true);
  //           } else {
  //             auctions = await auctionHouse.getAuctionsByIds([i + m]);
  //             expect(auctions[0].settled).to.equal(false);
  //           }
  //         }
  //       }
  //     }
  //   });
  // });
});
