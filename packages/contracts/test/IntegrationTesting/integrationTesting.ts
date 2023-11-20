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

  describe("pausable", async () => {
    it("should not revert", async () => {
      await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
        .reverted;

      const createBid = await auctionHouse.connect(bidder1).createBid(1, {
        value: 2,
      });

      await expect(createBid)
        .to.emit(auctionHouse, "AuctionBid")
        .withArgs(1, bidder1.address, 2, false);

      await expect(createBid).to.changeEtherBalances(
        [bidder1, auctionHouse],
        [-2, 2],
      );
    });
  });
});
