// SPDX-License-Identifier: GPL-3.0

// LICENSE
// AuctionHouse.sol is a modified version of NounsDAO's AuctionHouse.sol
// AuctionHouse.sol source code Copyright NounsDAO licensed under the GPL-3.0 license.
// With modifications by Medical DAO.

pragma solidity ^0.8.19;

import {PausableUpgradeable} from "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import {ReentrancyGuardUpgradeable} from "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {UUPSUpgradeable} from "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IAuctionHouse} from "./interfaces/IAuctionHouse.sol";
import {IToken} from "./interfaces/IToken.sol";
import {IWETH} from "./interfaces/IWETH.sol";

contract AuctionHouse is
  IAuctionHouse,
  PausableUpgradeable,
  ReentrancyGuardUpgradeable,
  OwnableUpgradeable,
  UUPSUpgradeable
{
  // The ERC721 token contract
  IToken public nft;

  // The address of the WETH contract
  address public weth;

  // The minimum amount of time left in an auction after a new bid is created
  uint256 public timeBuffer;

  // The minimum price accepted in an auction
  uint256 public reservePrice;

  // The minimum percentage difference between the last bid amount and the current bid
  uint8 public minBidIncrementPercentage;

  // The duration of a single auction
  uint256 public duration;

  // The active auction
  IAuctionHouse.Auction[] public auctions;

  /**
   * @notice Initialize the auction house and base contracts,
   * populate configuration values, and pause the contract.
   * @dev This function can only be called once.
   */
  function initialize(
    IToken _nft,
    address _weth,
    uint256 _timeBuffer,
    uint256 _reservePrice,
    uint8 _minBidIncrementPercentage,
    uint256 _duration
  ) external initializer {
    __Pausable_init();
    __ReentrancyGuard_init();
    __Ownable_init();
    __UUPSUpgradeable_init();

    _pause();

    nft = _nft;
    weth = _weth;
    timeBuffer = _timeBuffer;
    reservePrice = _reservePrice;
    minBidIncrementPercentage = _minBidIncrementPercentage;
    duration = _duration;
    auctions.push(
      Auction({
        tokenId: 0,
        amounts: new uint256[](0),
        startTime: 0,
        endTime: 0,
        bidders: new address payable[](0),
        settled: true
      })
    );
  }

  /**
   * @notice Settle the current auction, mint a new token, and put it up for auction.
   */
  function settleCurrentAndCreateNewAuction()
    external
    override
    nonReentrant
    whenNotPaused
  {
    _settleAuction();
    _createAuction();
  }

  /**
   * @notice Settle the current auction, mint a new token, and put it up for auction.
   */
  function settleCurrentAndCreateNewAuctionAndCreateBid(
    uint256 tokenId
  ) external payable override nonReentrant whenNotPaused {
    _settleAuction();
    _createAuction();
    _createBid(tokenId);
  }

  /**
   * @notice Settle the current auction.
   * @dev This function can only be called when the contract is paused.
   */
  function settleAuction() external override whenPaused nonReentrant {
    _settleAuction();
  }

  /**
   * @notice Create a bid for a token, with a given amount.
   * @dev This contract only accepts payment in ETH.
   */
  function createBid(uint256 tokenId) external payable override nonReentrant {
    _createBid(tokenId);
  }

  /**
   * @notice Pause the auction house.
   * @dev This function can only be called by the owner when the
   * contract is unpaused. While no new auctions can be started when paused,
   * anyone can settle an ongoing auction.
   */
  function pause() external override onlyOwner {
    _pause();
  }

  /**
   * @notice Unpause the auction house.
   * @dev This function can only be called by the owner when the
   * contract is paused. If required, this function will start a new auction.
   */
  function unpause() external override onlyOwner {
    _unpause();

    if (auctions[auctions.length - 1].settled) {
      _createAuction();
    }
  }

  /**
   * @notice Set the auction time buffer.
   * @dev Only callable by the owner.
   */
  function setTimeBuffer(uint256 _timeBuffer) external override onlyOwner {
    timeBuffer = _timeBuffer;

    emit AuctionTimeBufferUpdated(_timeBuffer);
  }

  /**
   * @notice Set the auction reserve price.
   * @dev Only callable by the owner.
   */
  function setReservePrice(uint256 _reservePrice) external override onlyOwner {
    reservePrice = _reservePrice;

    emit AuctionReservePriceUpdated(_reservePrice);
  }

  /**
   * @notice Set the auction minimum bid increment percentage.
   * @dev Only callable by the owner.
   */
  function setMinBidIncrementPercentage(
    uint8 _minBidIncrementPercentage
  ) external override onlyOwner {
    minBidIncrementPercentage = _minBidIncrementPercentage;

    emit AuctionMinBidIncrementPercentageUpdated(_minBidIncrementPercentage);
  }

  /**
   * @notice Create an auction.
   * @dev Store the auction details in the `auction` state variable and emit an AuctionCreated event.
   * If the mint reverts, the minter was updated without pausing this contract first. To remedy this,
   * catch the revert and pause this contract.
   */
  function _createAuction() internal {
    try nft.mint() returns (uint256 tokenId, bool isInsentive) {
      if (isInsentive) {
        auctions.push(
          Auction({
            tokenId: tokenId - 2,
            amounts: new uint256[](0),
            startTime: 0,
            endTime: 0,
            bidders: new address payable[](0),
            settled: true
          })
        );
        auctions.push(
          Auction({
            tokenId: tokenId - 1,
            amounts: new uint256[](0),
            startTime: 0,
            endTime: 0,
            bidders: new address payable[](0),
            settled: true
          })
        );
      }

      uint256 startTime = block.timestamp;
      uint256 endTime = startTime + duration;

      auctions.push(
        Auction({
          tokenId: tokenId,
          amounts: new uint256[](0),
          startTime: startTime,
          endTime: endTime,
          bidders: new address payable[](0),
          settled: false
        })
      );

      emit AuctionCreated(tokenId, startTime, endTime);
    } catch Error(string memory) {
      _pause();
    }
  }

  /**
   * @notice Settle an auction, finalizing the bid and paying out to the owner.
   * @dev If there are no bids, the token is burned.
   */
  function _settleAuction() internal {
    uint256 tokenId = nft.getCurrentTokenId();
    IAuctionHouse.Auction memory _auction = auctions[tokenId];

    require(_auction.startTime != 0, "Auction hasn't begun");
    require(!_auction.settled, "Auction has already been settled");
    require(block.timestamp >= _auction.endTime, "Auction hasn't completed");

    auctions[tokenId].settled = true;
    uint lastAmount = _auction.amounts[_auction.amounts.length - 1];
    address payable lastBidder = _auction.bidders[_auction.bidders.length - 1];

    if (_auction.bidders[0] == address(0)) {
      nft.burn(_auction.tokenId);
    } else {
      nft.transferFrom(address(this), lastBidder, _auction.tokenId);
    }

    if (lastAmount > 0) {
      _safeTransferETHWithFallback(owner(), lastAmount);
    }

    emit AuctionSettled(_auction.tokenId, lastBidder, lastAmount);
  }

  /**
   * @notice Create a bid for a token, with a given amount.
   * @dev This contract only accepts payment in ETH.
   */
  function _createBid(uint256 tokenId) internal {
    IAuctionHouse.Auction memory _auction = auctions[tokenId];
    uint lastAmount = _auction.amounts[_auction.amounts.length - 1];

    require(_auction.tokenId == tokenId, "Token not up for auction");
    require(block.timestamp < _auction.endTime, "Auction expired");
    require(msg.value >= reservePrice, "Must send at least reservePrice");
    require(
      msg.value >=
        lastAmount + ((lastAmount * minBidIncrementPercentage) / 100),
      "Must send more than last bid by minBidIncrementPercentage amount"
    );

    address payable lastBidder = _auction.bidders[_auction.bidders.length - 1];

    // Refund the last bidder, if applicable
    if (lastBidder != address(0)) {
      _safeTransferETHWithFallback(lastBidder, lastAmount);
    }

    auctions[tokenId].amounts.push(msg.value);
    auctions[tokenId].bidders.push(payable(msg.sender));

    // Extend the auction if the bid was received within `timeBuffer` of the auction end time
    bool extended = _auction.endTime - block.timestamp < timeBuffer;
    if (extended) {
      auctions[tokenId].endTime = _auction.endTime =
        block.timestamp +
        timeBuffer;
    }

    emit AuctionBid(_auction.tokenId, msg.sender, msg.value, extended);

    if (extended) {
      emit AuctionExtended(_auction.tokenId, _auction.endTime);
    }
  }

  /**
   * @notice Transfer ETH. If the ETH transfer fails, wrap the ETH and try send it as WETH.
   */
  function _safeTransferETHWithFallback(address to, uint256 amount) internal {
    if (!_safeTransferETH(to, amount)) {
      IWETH(weth).deposit{value: amount}();
      IERC20(weth).transfer(to, amount);
    }
  }

  /**
   * @notice Transfer ETH and return the success status.
   * @dev This function only forwards 30,000 gas to the callee.
   */
  function _safeTransferETH(address to, uint256 value) internal returns (bool) {
    (bool success, ) = to.call{value: value, gas: 30_000}(new bytes(0));
    return success;
  }

  function _authorizeUpgrade(
    address newImplementation
  ) internal override onlyOwner {}
}
