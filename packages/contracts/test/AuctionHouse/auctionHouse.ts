import { AuctionHouse, Descriptor, MedicalDAONFT } from "../../typechain-types";
import { deploy } from "./deployment";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("Descriptor", () => {
  let descriptor: Descriptor;
  let medicalDAONFT: MedicalDAONFT;
  let auctionHouse: AuctionHouse;

  let deployer: SignerWithAddress;
  let foundersDAO: SignerWithAddress;
  let foundersDAO2: SignerWithAddress;
  let minter: SignerWithAddress;

  beforeEach(async () => {
    [deployer, foundersDAO, foundersDAO2, minter] = await ethers.getSigners();
    ({ descriptor, medicalDAONFT, auctionHouse } = await deploy(
      deployer,
      foundersDAO,
      foundersDAO2,
      minter,
    ));
  });

  describe("init variables", () => {
    it("should return the correct medicalDAONFT address", async () => {
      expect(await auctionHouse.nft()).to.equal(medicalDAONFT.address);
    });

    it("should return the correct weth address", async () => {
      expect(await auctionHouse.weth()).to.equal(
        "0x4200000000000000000000000000000000000006",
      );
    });

    it("should return the correct timeBuffer", async () => {
      expect(await auctionHouse.timeBuffer()).to.equal(5);
    });

    it("should return the correct reservePrice", async () => {
      expect(await auctionHouse.reservePrice()).to.equal(1);
    });

    it("should check the correct  minBidIncrementPercentage", async () => {
      expect(await auctionHouse.minBidIncrementPercentage()).to.equal(2);
    });

    it("should check the correct  duration", async () => {
      expect(await auctionHouse.duration()).to.equal(30);
    });
  });
});
