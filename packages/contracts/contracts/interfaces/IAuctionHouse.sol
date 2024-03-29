// SPDX-License-Identifier: GPL-3.0

// LICENSE
// IAuctionHouse.sol is a modified version of NounsDAO's IAuctionHouse.sol
// IAuctionHouse.sol source code Copyright NounsDAO licensed under the GPL-3.0 license.
// With modifications by Medical DAO.

pragma solidity ^0.8.19;

interface IAuctionHouse {
  struct Auction {
    // ID for the token (ERC721 token ID)
    uint256 tokenId;
    // The current highest bid amount
    uint256[] amounts;
    // The time that the auction started
    uint256 startTime;
    // The time that the auction is scheduled to end
    uint256 endTime;
    // The address of the current highest bid
    address payable[] bidders;
    // Whether or not the auction has been settled
    bool settled;
  }

  event AuctionCreated(
    uint256 indexed tokenId,
    uint256 startTime,
    uint256 endTime
  );

  event AuctionBid(
    uint256 indexed tokenId,
    address sender,
    uint256 value,
    bool extended
  );

  event AuctionExtended(uint256 indexed tokenId, uint256 endTime);

  event AuctionSettled(uint256 indexed tokenId, address winner, uint256 amount);

  event AuctionTimeBufferUpdated(uint256 timeBuffer);

  event AuctionReservePriceUpdated(uint256 reservePrice);

  event AuctionMinBidIncrementPercentageUpdated(
    uint256 minBidIncrementPercentage
  );

  function getAuctions() external view returns (Auction[] memory);

  function getAuctionsByIds(uint256[] memory) external view returns (Auction[] memory);

  function settleAuction() external;

  function settleCurrentAndCreateNewAuction() external;

  function settleCurrentAndCreateNewAuctionAndCreateBid() external payable;

  function createBid(uint256 tokenId) external payable;

  function pause() external;

  function unpause() external;

  function setTimeBuffer(uint256 timeBuffer) external;

  function setReservePrice(uint256 reservePrice) external;

  function setMinBidIncrementPercentage(
    uint8 minBidIncrementPercentage
  ) external;
}
