// test/AuctionHouse.test.js

const { expect } = require("chai");

describe("AuctionHouse contract", function () {
  let owner;
  let bidder1;
  let bidder2;
  let nft;
  let auctionHouse;

  beforeEach(async function () {
    // Get the signers
    [owner, bidder1, bidder2] = await ethers.getSigners();

    // Deploy the NFT contract
    const NFT = await ethers.getContractFactory("Web3");
    nft = await NFT.deploy();
    await nft.deployed();

    // Deploy the AuctionHouse contract
    const AuctionHouse = await ethers.getContractFactory("AuctionHouse");
    auctionHouse = await AuctionHouse.deploy(nft.address, owner.address);
    await auctionHouse.deployed();

    // Initialize the AuctionHouse contract
    await auctionHouse.initialize(
      nft.address,
      owner.address,
      60, // timeBuffer
      1000, // reservePrice
      10, // minBidIncrementPercentage
      3600 // duration
    );
  });

  it("should create a new auction", async function () {
    // Check the initial state of the auction
    const auction = await auctionHouse.auction();
    expect(auction.nounId).to.equal(0);
    expect(auction.amount).to.equal(0);
    expect(auction.startTime).to.be.above(0);
    expect(auction.endTime).to.equal(auction.startTime + 3600);
    expect(auction.bidder).to.equal(ethers.constants.AddressZero);
    expect(auction.settled).to.be.false;

    // Check the owner of the NFT
    expect(await nft.ownerOf(0)).to.equal(auctionHouse.address);
  });

  it("should create a bid for an auction", async function () {
    // Bidder1 sends a bid of 1500 wei
    await expect(
      auctionHouse.connect(bidder1).createBid(0, { value: 1500 })
    )
      .to.emit(auctionHouse, "AuctionBid")
      .withArgs(0, bidder1.address, 1500, false);

    // Check the updated state of the auction
    let auction = await auctionHouse.auction();
    expect(auction.nounId).to.equal(0);
    expect(auction.amount).to.equal(1500);
    expect(auction.bidder).to.equal(bidder1.address);

    // Bidder2 sends a bid of 2000 wei
    await expect(
      auctionHouse.connect(bidder2).createBid(0, { value: 2000 })
    )
      .to.emit(auctionHouse, "AuctionBid")
      .withArgs(0, bidder2.address, 2000, false);

    // Check the updated state of the auction
    auction = await auctionHouse.auction();
    expect(auction.nounId).to.equal(0);
    expect(auction.amount).to.equal(2000);
    expect(auction.bidder).to.equal(bidder2.address);

    // Check that bidder1 was refunded
    expect(await ethers.provider.getBalance(bidder1.address)).to.be.above(
      ethers.utils.parseEther("10000")
    );
  });

  it("should extend an auction if a bid is received within timeBuffer", async function () {
    // Fast forward to the last minute of the auction
    await ethers.provider.send("evm_increaseTime", [3540]);
        // Bidder1 sends a bid of 1500 wei
    await expect(
      auctionHouse.connect(bidder1).createBid(0, { value: 1500 })
    )
      .to.emit(auctionHouse, "AuctionBid")
      .withArgs(0, bidder1.address, 1500, true);

    // Check that the auction was extended by timeBuffer
    const auction = await auctionHouse.auction();
    expect(auction.endTime).to.equal(auction.startTime + 3600 + 60);
  });

  it("should settle an auction and transfer the NFT to the winner", async function () {
    // Bidder1 sends a bid of 1500 wei
    await auctionHouse.connect(bidder1).createBid(0, { value: 1500 });

    // Fast forward to the end of the auction
    await ethers.provider.send("evm_increaseTime", [3660]);

    // Settle the auction
    await expect(auctionHouse.settleCurrentAndCreateNewAuction())
      .to.emit(auctionHouse, "AuctionSettled")
      .withArgs(0, bidder1.address, 1500);

    // Check that the NFT was transferred to bidder1
    expect(await nft.ownerOf(0)).to.equal(bidder1.address);

    // Check that a new auction was created
    const auction = await auctionHouse.auction();
    expect(auction.nounId).to.equal(1);
    expect(auction.amount).to.equal(0);
    expect(auction.startTime).to.be.above(0);
    expect(auction.endTime).to.equal(auction.startTime + 3600);
    expect(auction.bidder).to.equal(ethers.constants.AddressZero);
    expect(auction.settled).to.be.false;
  });
});
