import { AuctionHouse } from "@/lib/contracts/AuctionHouse";
import { AuctionModel } from "@/models/AuctionModel";
import { NFTModel } from "@/models/NFTModel";
import { AuctionState, auctionState } from "@/stores/auctionState";
import { Auction } from "@/types/Auction";
import { Hash } from "@wagmi/core";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface AuctionController {
  init: () => Promise<void>;
  bid: (bidAmount: bigint) => Promise<Hash>;
}

export const useAuctionValue = (): AuctionState => {
  return useRecoilValue(auctionState);
};

export const useAuctionController = (): AuctionController => {
  const setAuction = useSetRecoilState(auctionState);

  /**
   * 初期化
   */
  const init = async (): Promise<void> => {
    const auctionContractState: Auction = await AuctionHouse.auction();
    const imageURL: string = `https://ipfs.io/ipfs/QmWdcHRNaEEFbpexkJCJSL26KL6abKYzAVWQiwWE73DM2n/${Number(
      auctionContractState.tokenId,
    )}.png`;

    setAuction(
      AuctionModel.create({
        startTime: auctionContractState.startTime,
        endTime: auctionContractState.endTime,
        bids: [
          {
            bidder: auctionContractState.bidder,
            amount: auctionContractState.amount,
            hash: "0x934e6bb9b4a8d78d87a98c30b807567ea88a6a363a14e6824072c21ad82d2921",
          },
        ],
        nft: new NFTModel(auctionContractState.tokenId, imageURL),
      }),
    );
  };

  /**
   * 入札
   * @param bidAmount 入札額
   * @returns {Promise<Hash>} トランザクションハッシュ
   */
  const bid = async (bidAmount: bigint): Promise<Hash> => {
    return await AuctionHouse.createBid(bidAmount);
  };

  const controller: AuctionController = {
    init,
    bid,
  };

  return controller;
};

export const useAuctionState = (): [AuctionState, AuctionController] => [
  useAuctionValue(),
  useAuctionController(),
];
