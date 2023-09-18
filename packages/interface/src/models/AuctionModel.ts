import { MIN_BID_AMOUNT } from "@/const/const";
import { BaseModel } from "@/models/BaseModel";
import { NFTModel } from "@/models/NFTModel";
import { Bid } from "@/types/Bid";

export class AuctionModel extends BaseModel {
  constructor(
    public readonly currentDateTime: number = 0,
    public readonly tokenId: bigint = 0n,
    public readonly amount: bigint = 0n,
    public readonly startTime: bigint = 0n,
    public readonly endTime: bigint = 0n,
    public readonly bidder: `0x${string}` = "0x0000000000000000000000000000000000000000",
    public readonly bids: Bid[] = [],
    public readonly nft: NFTModel = new NFTModel(),
  ) {
    super();
  }

  /**
   * 最新の日時を取得する
   * @returns {number} 最新の日時
   */
  getCurrentDateTime(): number {
    return this.currentDateTime;
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
    return bidAmount <= currentBidAmount + MIN_BID_AMOUNT;
  }
}
