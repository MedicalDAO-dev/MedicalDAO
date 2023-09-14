import auctionHouse from "@/artifacts/AuctionHouse.json";
import { AUCTION_HOUSE } from "@/config/config";
import { Auction } from "@/types/Auction";
import { Hash, readContract, writeContract } from "@wagmi/core";
import { parseEther } from "viem";
import { Address } from "wagmi";

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
  public static auction = async (): Promise<Auction> => {
    const tmp = (await readContract({
      ...contract("auction"),
    })) as [bigint, bigint, bigint, bigint, Address, boolean];
    const data: Auction = {
      tokenId: tmp[0],
      amount: tmp[1],
      startTime: tmp[2],
      endTime: tmp[3],
      bidder: tmp[4],
      settled: tmp[5],
    };
    return data;
  };

  // ---------------------------------------------------------
  // write
  // ---------------------------------------------------------

  /**
   * 入札する
   * @param bidAmount 入札額
   * @return {Promise<Hash>} トランザクションハッシュ
   */
  public static createBid = async (bidAmount: bigint): Promise<Hash> => {
    const { tokenId } = await this.auction();
    const { hash } = await writeContract({
      ...contract("createBid"),
      args: [tokenId],
      value: parseEther(bidAmount.toString()),
    });
    return hash;
  };
}
