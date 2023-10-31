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

type AuctionStruct = {
  tokenId: bigint;
  amounts: bigint[] | undefined[];
  startTime: bigint;
  endTime: bigint;
  bidders: Address[] | undefined[];
  settled: boolean;
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
    const tmps = (await readContract({
      ...contract("getAuctions"),
    })) as Auction[];

    const tmp: Auction = tmps[tmps.length - 1];

    let isDefinedAmounts = tmp.amounts[0] !== undefined;
    let isDefinedBidders = tmp.bidders[0] !== undefined;

    let amounts: bigint[];
    let bidders: Address[];

    if (isDefinedAmounts || isDefinedBidders) {
      if(!isDefinedAmounts || !isDefinedBidders){
        console.log("error : One of the two variables is undefined.");
        console.log("tmp.amounts[0] : "+tmp.amounts[0]);
        console.log("tmp.bidders[0] : "+tmp.bidders[0]);        
      }
      amounts = tmp.amounts;
      bidders = tmp.bidders;
    } else {
      amounts = [0n];
      bidders = ["0x0000000000000000000000000000000000000000"]
    }
    
    const data: Auction = {
      tokenId: tmp.tokenId,
      amounts: amounts,
      startTime: tmp.startTime,
      endTime: tmp.endTime,
      bidders: bidders,
      settled: tmp.settled,
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
