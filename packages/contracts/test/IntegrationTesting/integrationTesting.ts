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
  let bidder3: SignerWithAddress;
  let bidder4: SignerWithAddress;

  beforeEach(async () => {
    [
      deployer,
      foundersDAO,
      foundersDAO2,
      minter,
      bidder1,
      bidder2,
      bidder3,
      bidder4,
    ] = await ethers.getSigners();
    ({ descriptor, medicalDAONFT, auctionHouse } = await deploy(
      deployer,
      foundersDAO,
      foundersDAO2,
      minter,
    ));
  });

  describe("integration testing", async () => {
    it("burn should not revert", async () => {
      //------------------unpause() test-------------------------
      await expect(auctionHouse.connect(foundersDAO).unpause()).to.be.reverted;

      expect(await auctionHouse.paused()).to.equal(true);

      await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
        .reverted;

      expect(await auctionHouse.paused()).to.equal(false);
      expect(await medicalDAONFT.ownerOf(1)).to.equal(auctionHouse.address);
      expect(await medicalDAONFT.balanceOf(auctionHouse.address)).to.equal(1);
      //   await expect(await auctionHouse.connect(deployer).pause()).not.to.be
      //     .reverted;
      //   expect(await auctionHouse.paused()).to.equal(true);
      //   let createAuction = await auctionHouse.connect(deployer).unpause();
      //   expect(await auctionHouse.paused()).to.equal(false);
      //   const startTime = (await ethers.provider.getBlock("latest")).timestamp;
      //   const duration = await auctionHouse.duration();
      //   expect(createAuction)
      //     .to.emit(auctionHouse, "AuctionCreated")
      //     .withArgs(1, startTime, startTime + duration.toNumber());
      //   await expect(await auctionHouse.connect(deployer).pause()).not.to.be
      //     .reverted;
      //   expect(await auctionHouse.paused()).to.equal(true);
      //   await expect(auctionHouse.connect(bidder1).createBid(1, { value: 2 })).to
      //     .be.reverted;
      //   createAuction = await auctionHouse.connect(deployer).unpause();
      //   expect(await auctionHouse.paused()).to.equal(false);

      //------------------burn() test-------------------------
      await expect(
        auctionHouse.connect(bidder1).createBid(1, { value: 1 }),
      ).to.be.revertedWith("Must send at least reservePrice");

      await new Promise((resolve) => setTimeout(resolve, 10000));

      const settleCurrentAndCreateNewAuctionAndCreateBid = await auctionHouse
        .connect(bidder3)
        .settleCurrentAndCreateNewAuctionAndCreateBid({
          value: 2,
        });

      const auctions = await auctionHouse.getAuctionsByIds([1]);
      expect(auctions[0].settled).to.equal(true);

      await expect(settleCurrentAndCreateNewAuctionAndCreateBid)
        .to.emit(auctionHouse, "AuctionSettled")
        .withArgs(1, ethers.constants.AddressZero, 0);

      await expect(
        settleCurrentAndCreateNewAuctionAndCreateBid,
      ).to.changeEtherBalances([deployer, auctionHouse], [0, 2]);

      await expect(medicalDAONFT.ownerOf(1)).to.be.reverted;
      expect(await medicalDAONFT.balanceOf(auctionHouse.address)).to.equal(1);
    });

    it("settleCurrentAndCreateNewAuctionAndCreateBid by other people should not revert", async () => {
      //------------------unpause() test-------------------------
      await expect(auctionHouse.connect(foundersDAO).unpause()).to.be.reverted;

      expect(await auctionHouse.paused()).to.equal(true);

      await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
        .reverted;

      expect(await auctionHouse.paused()).to.equal(false);
      expect(await medicalDAONFT.ownerOf(1)).to.equal(auctionHouse.address);
      expect(await medicalDAONFT.balanceOf(auctionHouse.address)).to.equal(1);

      //------------------createBid() test-------------------------
      await expect(
        auctionHouse.connect(bidder1).createBid(1, { value: 1 }),
      ).to.be.revertedWith("Must send at least reservePrice");

      const createBid = await auctionHouse.connect(bidder1).createBid(1, {
        value: 100,
      });

      await expect(
        auctionHouse.connect(bidder2).createBid(1, { value: 101 }),
      ).to.be.revertedWith(
        "Must send more than last bid by minBidIncrementPercentage amount",
      );

      await expect(createBid)
        .to.emit(auctionHouse, "AuctionBid")
        .withArgs(1, bidder1.address, 100, false);

      await expect(createBid).to.changeEtherBalances(
        [bidder1, auctionHouse],
        [-100, 100],
      );

      await expect(auctionHouse.connect(bidder1).createBid(2, { value: 2 })).to
        .be.reverted;

      const createBid2 = auctionHouse
        .connect(bidder2)
        .createBid(1, { value: 102 });

      await expect(createBid2).not.to.be.reverted;

      await expect(createBid2).to.changeEtherBalances(
        [bidder1, bidder2, auctionHouse],
        [100, -102, 2],
      );

      await new Promise((resolve) => setTimeout(resolve, 10000));

      const settleCurrentAndCreateNewAuctionAndCreateBid = await auctionHouse
        .connect(bidder3)
        .settleCurrentAndCreateNewAuctionAndCreateBid({
          value: 2,
        });

      const auctions = await auctionHouse.getAuctionsByIds([1]);
      expect(auctions[0].settled).to.equal(true);

      expect(await medicalDAONFT.ownerOf(1)).to.equal(bidder2.address);
      expect(await medicalDAONFT.balanceOf(bidder2.address)).to.equal(1);

      const startTime = (await ethers.provider.getBlock("latest")).timestamp;

      const duration = await auctionHouse.duration();

      await expect(settleCurrentAndCreateNewAuctionAndCreateBid)
        .to.emit(auctionHouse, "AuctionCreated")
        .withArgs(2, startTime, startTime + duration.toNumber());

      await expect(settleCurrentAndCreateNewAuctionAndCreateBid)
        .to.emit(auctionHouse, "AuctionBid")
        .withArgs(2, bidder3.address, 2, false);

      await expect(
        settleCurrentAndCreateNewAuctionAndCreateBid,
      ).to.changeEtherBalances(
        [bidder3, deployer, auctionHouse],
        [-2, 102, -100],
      );
    });
    it("settleCurrentAndCreateNewAuction by winner should not revert", async () => {
      //------------------unpause() test-------------------------
      await expect(auctionHouse.connect(foundersDAO).unpause()).to.be.reverted;

      expect(await auctionHouse.paused()).to.equal(true);

      await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
        .reverted;

      expect(await auctionHouse.paused()).to.equal(false);
      expect(await medicalDAONFT.ownerOf(1)).to.equal(auctionHouse.address);
      expect(await medicalDAONFT.balanceOf(auctionHouse.address)).to.equal(1);

      //------------------createBid() test-------------------------
      await expect(
        auctionHouse.connect(bidder1).createBid(1, { value: 1 }),
      ).to.be.revertedWith("Must send at least reservePrice");

      const createBid = await auctionHouse.connect(bidder1).createBid(1, {
        value: 100,
      });

      await expect(
        auctionHouse.connect(bidder2).createBid(1, { value: 101 }),
      ).to.be.revertedWith(
        "Must send more than last bid by minBidIncrementPercentage amount",
      );

      await expect(createBid)
        .to.emit(auctionHouse, "AuctionBid")
        .withArgs(1, bidder1.address, 100, false);

      await expect(createBid).to.changeEtherBalances(
        [bidder1, auctionHouse],
        [-100, 100],
      );

      await expect(auctionHouse.connect(bidder1).createBid(2, { value: 2 })).to
        .be.reverted;

      const createBid2 = auctionHouse
        .connect(bidder2)
        .createBid(1, { value: 102 });

      await expect(createBid2).not.to.be.reverted;

      await expect(createBid2).to.changeEtherBalances(
        [bidder1, bidder2, auctionHouse],
        [100, -102, 2],
      );

      await new Promise((resolve) => setTimeout(resolve, 10000));

      const settleCurrentAndCreateNewAuction =
        await auctionHouse.settleCurrentAndCreateNewAuction();

      const auctions = await auctionHouse.getAuctionsByIds([1]);
      expect(auctions[0].settled).to.equal(true);

      expect(await medicalDAONFT.ownerOf(1)).to.equal(bidder2.address);
      expect(await medicalDAONFT.balanceOf(bidder2.address)).to.equal(1);

      const startTime = (await ethers.provider.getBlock("latest")).timestamp;

      const duration = await auctionHouse.duration();

      await expect(settleCurrentAndCreateNewAuction)
        .to.emit(auctionHouse, "AuctionCreated")
        .withArgs(2, startTime, startTime + duration.toNumber());

      const auctions2 = await auctionHouse.getAuctionsByIds([2]);
      expect(auctions2[0].settled).to.equal(false);
    });
  });
});
