import { BASE_NFT_IMAGE_URL } from "@/const/const";
import { AuctionHouse } from "@/lib/contracts/AuctionHouse";
import { AuctionModel } from "@/models/AuctionModel";
import { NFTModel } from "@/models/NFTModel";
import { AuctionState, auctionState } from "@/stores/auctionState";
import { Bid } from "@/types/Bid";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TransactionReceipt } from "viem";
import { Address } from "wagmi";

export interface AuctionController {
  init: () => Promise<void>;
  bid: (bidAmount: bigint, bidder: Address) => Promise<TransactionReceipt>;
  settleAndCreateNewAuction: () => Promise<TransactionReceipt>;
  settleAndCreateNewAuctionAndBid: (
    bidAmount: bigint,
    bidder: Address,
  ) => Promise<TransactionReceipt>;
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
    const auction = await AuctionHouse.getLastAuction();
    const imageURL = `${BASE_NFT_IMAGE_URL}/${Number(auction.tokenId)}.png`;

    const newBids: Bid[] = [];
    for (let i = 0; i < auction.bidders.length; i++) {
      newBids.push({
        bidder: auction.bidders[i],
        amount: auction.amounts[i],
      });
    }

    setAuction(
      AuctionModel.create({
        startTime: auction.startTime,
        endTime: auction.endTime,
        bids: newBids,
        nft: NFTModel.create({ tokenId: auction.tokenId, imageURL }),
      }),
    );
  };

  /**
   * 入札
   * @param bidAmount 入札額
   * @return {Promise<TransactionReceipt>} トランザクションレシピ
   */
  const bid = async (
    bidAmount: bigint,
    bidder: Address,
  ): Promise<TransactionReceipt> => {
    const data = await AuctionHouse.createBid(bidAmount);
    setAuction((prev) =>
      prev.copyWith({ bids: [...prev.bids, { bidder, amount: bidAmount }] }),
    );
    return data;
  };

  /**
   * 落札処理を実行して次のオークションを開始する
   * @return {Promise<TransactionReceipt>} トランザクションレシピ
   */
  const settleAndCreateNewAuction = async (): Promise<TransactionReceipt> => {
    return await AuctionHouse.settleCurrentAndCreateNewAuction();
  };

  /**
   * 落札処理を実行して次のオークションを開始して入札する
   * @param bidAmount 入札額
   * @return {Promise<TransactionReceipt>} トランザクションレシピ
   */
  const settleAndCreateNewAuctionAndBid = async (
    bidAmount: bigint,
    bidder: Address,
  ): Promise<TransactionReceipt> => {
    const data =
      await AuctionHouse.settleCurrentAndCreateNewAuctionAndCreateBid(
        bidAmount,
      );
    setAuction((prev) =>
      prev.copyWith({ bids: [...prev.bids, { bidder, amount: bidAmount }] }),
    );
    return data;
  };

  const controller: AuctionController = {
    init,
    bid,
    settleAndCreateNewAuction,
    settleAndCreateNewAuctionAndBid,
  };

  return controller;
};

export const useAuctionState = (): [AuctionState, AuctionController] => [
  useAuctionValue(),
  useAuctionController(),
];
