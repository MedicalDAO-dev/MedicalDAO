import { MIN_BID_AMOUNT } from "@/const/const";
import { BaseModel } from "@/models/BaseModel";
import { NFTModel } from "@/models/NFTModel";
import { Bid } from "@/types/Bid";
import { Address } from "wagmi";

export class AuctionModel extends BaseModel {
  constructor(
    public readonly startTime: bigint = 0n,
    public readonly endTime: bigint = 0n,
    public readonly bids: Bid[] = [],
    public readonly nft: NFTModel = new NFTModel(),
  ) {
    super();
  }

  /**
   * 最新の入札情報を取得する
   * @returns {Bid | undefined} 最新の入札情報
   */
  getCurrentBid(): Bid | undefined {
    if (this.bids.length === 0) return undefined;
    return this.bids[this.bids.length - 1];
  }

  /**
   * 最低入札額を下回っているかどうか
   * @param bidAmount 入札額
   * @returns {boolean} 最低入札額を下回っているかどうか
   */
  isBelowMinimumBidAmount(bidAmount: bigint): boolean {
    const currentBid = this.getCurrentBid();
    const currentBidAmount = currentBid ? currentBid.amount : 0n;
    return bidAmount < currentBidAmount + MIN_BID_AMOUNT;
  }

  /**
   * オークションが終了しているかどうか
   * @returns {boolean} オークションが終了しているかどうか
   */
  isEndAuction(): boolean {
    const now = BigInt(Math.floor(Date.now() / 1000));
    return this.endTime <= now;
  }

  /**
   * 落札者かどうか
   * @param address アドレス
   * @returns {boolean} 落札者かどうか
   */
  isSuccessfulBidder(address: Address): boolean {
    if (!this.isEndAuction()) return false;
    const currentBid = this.getCurrentBid();
    if (!currentBid) return false;
    return currentBid.bidder === address;
  }
}
