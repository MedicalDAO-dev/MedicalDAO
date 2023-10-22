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
      expect(await auctionHouse.reservePrice()).to.equal(2);
    });

    it("should check the correct  minBidIncrementPercentage", async () => {
      expect(await auctionHouse.minBidIncrementPercentage()).to.equal(2);
    });

    it("should check the correct duration", async () => {
      expect(await auctionHouse.duration()).to.equal(10);
    });

    it("should check the correct all auctions data", async () => {
      const auctions = await auctionHouse.getAuctions();
      expect(auctions.length).to.equal(1);
      expect(auctions[0].tokenId).to.equal(0);
      expect(auctions[0].amounts).to.deep.equal([0]);
      expect(auctions[0].tokenId).to.equal(0);
      expect(auctions[0].tokenId).to.equal(0);
      expect(auctions[0].amounts).to.deep.equal([ethers.constants.AddressZero]);
      expect(auctions[0].settled).to.equal(true);
    });

    it("should check the correct the auctions data by token ids", async () => {
      const auctions = await auctionHouse.getAuctionsByIds([0]);
      expect(auctions.length).to.equal(1);
      expect(auctions[0].tokenId).to.equal(0);
      expect(auctions[0].amounts).to.deep.equal([0]);
      expect(auctions[0].tokenId).to.equal(0);
      expect(auctions[0].tokenId).to.equal(0);
      expect(auctions[0].amounts).to.deep.equal([ethers.constants.AddressZero]);
      expect(auctions[0].settled).to.equal(true);
    });
  });

  describe("Setter", async () => {
    describe("setTimeBuffer", async () => {
      it("should revert if not called by owner", async () => {
        await expect(
          auctionHouse.connect(foundersDAO).setTimeBuffer(10),
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });

      it("should set the timeBuffer", async () => {
        await expect(await auctionHouse.connect(deployer).setTimeBuffer(10))
          .to.emit(auctionHouse, "AuctionTimeBufferUpdated")
          .withArgs(10);
        expect(await auctionHouse.timeBuffer()).to.equal(10);
      });
    });

    describe("setReservePrice", async () => {
      it("should revert if not called by owner", async () => {
        await expect(
          auctionHouse.connect(foundersDAO).setReservePrice(10),
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });

      it("should set the reservePrice", async () => {
        await expect(await auctionHouse.connect(deployer).setReservePrice(10))
          .to.emit(auctionHouse, "AuctionReservePriceUpdated")
          .withArgs(10);
        expect(await auctionHouse.reservePrice()).to.equal(10);
      });
    });

    describe("setMinBidIncrementPercentage", async () => {
      it("should revert if not called by owner", async () => {
        await expect(
          auctionHouse.connect(foundersDAO).setMinBidIncrementPercentage(10),
        ).to.be.revertedWith("Ownable: caller is not the owner");
      });

      it("should set the minBidIncrementPercentage", async () => {
        await expect(
          await auctionHouse.connect(deployer).setMinBidIncrementPercentage(10),
        )
          .to.emit(auctionHouse, "AuctionMinBidIncrementPercentageUpdated")
          .withArgs(10);
        expect(await auctionHouse.minBidIncrementPercentage()).to.equal(10);
      });
    });
  });

  describe("pausable", async () => {
    describe("unpause", async () => {
      it("should revert if not called by owner", async () => {
        await expect(auctionHouse.connect(foundersDAO).unpause()).to.be
          .reverted;
      });

      it("should unpause", async () => {
        expect(await auctionHouse.paused()).to.equal(true);

        await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
          .reverted;
        expect(await auctionHouse.paused()).to.equal(false);
      });
    });

    describe("pause", async () => {
      it("should revert if not called by owner", async () => {
        await expect(auctionHouse.connect(foundersDAO).pause()).to.be.reverted;
      });

      it("should pause", async () => {
        await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
          .reverted;
        expect(await auctionHouse.paused()).to.equal(false);

        await expect(await auctionHouse.connect(deployer).pause()).not.to.be
          .reverted;
        expect(await auctionHouse.paused()).to.equal(true);
      });
    });
  });

  describe("main internal functions", async () => {
    describe("_createAuction", async () => {
      it("_createAuction excused by unpause()", async () => {
        const createAuction = await auctionHouse.connect(deployer).unpause();

        const startTime = (await ethers.provider.getBlock("latest")).timestamp;

        const duration = await auctionHouse.duration();

        expect(createAuction)
          .to.emit(auctionHouse, "AuctionCreated")
          .withArgs(1, startTime, startTime + duration.toNumber());
      });
    });

    describe("_createBid", async () => {
      it("should revert when paused", async () => {
        await expect(auctionHouse.connect(bidder1).createBid(1, { value: 2 }))
          .to.be.reverted;
      });

      it("should revert if tokenId is not auctioning", async () => {
        await expect(auctionHouse.connect(bidder1).createBid(2, { value: 2 }))
          .to.be.reverted;
      });

      it("should revert if when auction ends", async () => {
        await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
          .reverted;

        await new Promise((resolve) => setTimeout(resolve, 10000));

        await expect(
          auctionHouse.connect(bidder1).createBid(1, { value: 2 }),
        ).to.be.revertedWith("Auction expired");
      });

      it("should revert if when value is less than reservePrice", async () => {
        await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
          .reverted;

        await expect(
          auctionHouse.connect(bidder1).createBid(1, { value: 1 }),
        ).to.be.revertedWith("Must send at least reservePrice");
      });

      it("_createBid excused by createBid()", async () => {
        await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
          .reverted;

        const createBid = await auctionHouse.connect(bidder1).createBid(1, {
          value: 2,
        });

        await expect(createBid)
          .to.emit(auctionHouse, "AuctionBid")
          .withArgs(1, bidder1.address, 2, false);
      });

      it("should revert if when value is less than last bid plus minBidIncrementPercentage", async () => {
        await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
          .reverted;

        await expect(auctionHouse.connect(bidder1).createBid(1, { value: 100 }))
          .not.to.be.reverted;

        await expect(
          auctionHouse.connect(bidder2).createBid(1, { value: 101 }),
        ).to.be.revertedWith(
          "Must send more than last bid by minBidIncrementPercentage amount",
        );
      });

      it("_createBid when extended", async () => {
        await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
          .reverted;

        await new Promise((resolve) => setTimeout(resolve, 9000));

        await expect(auctionHouse.connect(bidder1).createBid(1, { value: 2 }))
          .not.to.be.reverted;

        await new Promise((resolve) => setTimeout(resolve, 2000));

        await expect(auctionHouse.connect(bidder2).createBid(1, { value: 3 }))
          .not.to.be.reverted;

        const createBid = await auctionHouse.connect(bidder1).createBid(1, {
          value: 3,
        });

        const lastBidTime = (await ethers.provider.getBlock("latest"))
          .timestamp;

        const timeBuffer = await auctionHouse.timeBuffer();

        await expect(createBid)
          .to.emit(auctionHouse, "AuctionExtended")
          .withArgs(1, lastBidTime + timeBuffer.toNumber());
      });
    });

    describe("_settleAuction", async () => {
      it("should revert if when not auction ends", async () => {
        await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
          .reverted;

        await expect(await auctionHouse.connect(deployer).pause()).not.to.be
          .reverted;
        expect(await auctionHouse.connect(deployer).paused()).to.equal(true);

        await new Promise((resolve) => setTimeout(resolve, 1));

        await expect(
          auctionHouse.connect(deployer).settleAuction(),
        ).to.be.revertedWith("Auction hasn't completed");
      });

      describe("_settleAuction excused by settleAuction()", async () => {
        it("settleAuction with burn", async () => {
          await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
            .reverted;

          expect(await medicalDAONFT.ownerOf(1)).to.equal(auctionHouse.address);
          expect(await medicalDAONFT.balanceOf(auctionHouse.address)).to.equal(
            1,
          );

          await expect(await auctionHouse.connect(deployer).pause()).not.to.be
            .reverted;
          expect(await auctionHouse.connect(deployer).paused()).to.equal(true);

          await new Promise((resolve) => setTimeout(resolve, 10000));

          await expect(await auctionHouse.connect(deployer).settleAuction())
            .to.emit(auctionHouse, "AuctionSettled")
            .withArgs(1, ethers.constants.AddressZero, 0);

          await expect(medicalDAONFT.ownerOf(1)).to.be.reverted;
          expect(await medicalDAONFT.balanceOf(auctionHouse.address)).to.equal(
            0,
          );
        });

        it("settleAuction with mint", async () => {
          await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
            .reverted;

          expect(await medicalDAONFT.ownerOf(1)).to.equal(auctionHouse.address);
          expect(await medicalDAONFT.balanceOf(auctionHouse.address)).to.equal(
            1,
          );
          expect(await medicalDAONFT.balanceOf(bidder1.address)).to.equal(0);

          await expect(
            await auctionHouse.connect(bidder1).createBid(1, {
              value: 2,
            }),
          )
            .to.emit(auctionHouse, "AuctionBid")
            .withArgs(1, bidder1.address, 2, false);

          await expect(await auctionHouse.connect(deployer).pause()).not.to.be
            .reverted;
          expect(await auctionHouse.connect(deployer).paused()).to.equal(true);

          await new Promise((resolve) => setTimeout(resolve, 10000));

          await expect(await auctionHouse.connect(deployer).settleAuction())
            .to.emit(auctionHouse, "AuctionSettled")
            .withArgs(1, bidder1.address, 2);

          // expect(await medicalDAONFT.ownerOf(1)).to.equal(bidder1.address);
          expect(await medicalDAONFT.balanceOf(auctionHouse.address)).to.equal(
            0,
          );
          expect(await medicalDAONFT.balanceOf(bidder1.address)).to.equal(1);
        });
      });
    });
  });

  describe("external functions", async () => {
    describe("settleCurrentAndCreateNewAuction", async () => {
      it("should revert if when paused", async () => {
        await expect(
          auctionHouse.settleCurrentAndCreateNewAuction(),
        ).to.be.revertedWith("Pausable: paused");
      });

      it("should revert if when not auction ends", async () => {
        await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
          .reverted;

        await new Promise((resolve) => setTimeout(resolve, 1));

        await expect(
          auctionHouse.settleCurrentAndCreateNewAuction(),
        ).to.be.revertedWith("Auction hasn't completed");
      });

      it("should settleCurrentAndCreateNewAuction", async () => {
        await expect(await auctionHouse.connect(deployer).unpause()).not.to.be
          .reverted;

        await new Promise((resolve) => setTimeout(resolve, 10000));

        const settleCurrentAndCreateNewAuction =
          await auctionHouse.settleCurrentAndCreateNewAuction();

        const startTime = (await ethers.provider.getBlock("latest")).timestamp;

        const duration = await auctionHouse.duration();

        await expect(settleCurrentAndCreateNewAuction)
          .to.emit(auctionHouse, "AuctionCreated")
          .withArgs(2, startTime, startTime + duration.toNumber());
      });
    });
  });
});
