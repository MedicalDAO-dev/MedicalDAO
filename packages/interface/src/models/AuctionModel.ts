import { MIN_BID_AMOUNT } from "@/const/const";
import { BaseModel } from "@/models/BaseModel";
import { Bid } from "@/types/Bid";

export class AuctionModel extends BaseModel {
  constructor(
    public readonly bids: Bid[] = [],
    public readonly timeLimit: string = "0時間0分0秒",
    public readonly imageURL: string = "/assets/images/logo.webp", // TODO: NFT情報としてまとめる
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
    return bidAmount <= currentBidAmount + MIN_BID_AMOUNT;
  }
}
