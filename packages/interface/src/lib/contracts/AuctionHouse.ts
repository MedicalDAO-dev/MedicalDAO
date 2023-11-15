import auctionHouse from "@/artifacts/AuctionHouse.json";
import { AUCTION_HOUSE } from "@/config/config";
import { Auction } from "@/types/Auction";
import { readContract, waitForTransaction, writeContract } from "@wagmi/core";
import { TransactionReceipt } from "viem";

const contract = (functionName: string) => {
  return {
    address: AUCTION_HOUSE,
    abi: auctionHouse.abi,
    functionName,
  };
};

export class AuctionHouse {
  // ---------------------------------------------------------
  // read
  // ---------------------------------------------------------

  /**
   * オークション情報を取得
   * @return {Promise<Auction>} オークション情報
   */
  public static getLastAuction = async (): Promise<Auction> => {
    const auctions = (await readContract({
      ...contract("getAuctions"),
    })) as Auction[];
    return auctions[auctions.length - 1];
  };

  // ---------------------------------------------------------
  // write
  // ---------------------------------------------------------

  /**
   * 入札する
   * @param bidAmount 入札額
   * @return {Promise<TransactionReceipt>} トランザクションレシピ
   */
  public static createBid = async (
    bidAmount: bigint,
  ): Promise<TransactionReceipt> => {
    const { tokenId } = await this.getLastAuction();
    const { hash } = await writeContract({
      ...contract("createBid"),
      args: [tokenId],
      value: bidAmount,
    });
    return await waitForTransaction({ hash });
  };

  /**
   * 落札処理を実行して次のオークションを開始する
   * @return {Promise<TransactionReceipt>} トランザクションレシピ
   */
  public static settleCurrentAndCreateNewAuction =
    async (): Promise<TransactionReceipt> => {
      const { hash } = await writeContract({
        ...contract("settleCurrentAndCreateNewAuction"),
      });
      return await waitForTransaction({ hash });
    };

  /**
   * 落札処理を実行して次のオークションを開始して入札する
   * @param bidAmount 入札額
   * @return {Promise<TransactionReceipt>} トランザクションレシピ
   */
  public static settleCurrentAndCreateNewAuctionAndCreateBid = async (
    bidAmount: bigint,
  ): Promise<TransactionReceipt> => {
    const { hash } = await writeContract({
      ...contract("settleCurrentAndCreateNewAuctionAndCreateBid"),
      value: bidAmount,
    });
    return await waitForTransaction({ hash });
  };
}
