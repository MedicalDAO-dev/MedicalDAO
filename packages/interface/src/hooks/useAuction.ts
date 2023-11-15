import { BASE_NFT_IMAGE_URL } from "@/const/const";
import { AuctionHouse } from "@/lib/contracts/AuctionHouse";
import { AuctionModel } from "@/models/AuctionModel";
import { NFTModel } from "@/models/NFTModel";
import { AuctionState, auctionState } from "@/stores/auctionState";
import { Bid } from "@/types/Bid";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TransactionReceipt } from "viem";

export interface AuctionController {
  setLatest: () => Promise<void>;
  bid: (bidAmount: bigint) => Promise<TransactionReceipt>;
  settleAndCreateNewAuction: () => Promise<TransactionReceipt>;
  settleAndCreateNewAuctionAndBid: (
    bidAmount: bigint,
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
  const setLatest = async (): Promise<void> => {
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
  const bid = async (bidAmount: bigint): Promise<TransactionReceipt> => {
    const data = await AuctionHouse.createBid(bidAmount);
    await setLatest();
    return data;
  };

  /**
   * 落札処理を実行して次のオークションを開始する
   * @return {Promise<TransactionReceipt>} トランザクションレシピ
   */
  const settleAndCreateNewAuction = async (): Promise<TransactionReceipt> => {
    const receipt = await AuctionHouse.settleCurrentAndCreateNewAuction();
    await setLatest();
    return receipt;
  };

  /**
   * 落札処理を実行して次のオークションを開始して入札する
   * @param bidAmount 入札額
   * @return {Promise<TransactionReceipt>} トランザクションレシピ
   */
  const settleAndCreateNewAuctionAndBid = async (
    bidAmount: bigint,
  ): Promise<TransactionReceipt> => {
    const data =
      await AuctionHouse.settleCurrentAndCreateNewAuctionAndCreateBid(
        bidAmount,
      );
    await setLatest();
    return data;
  };

  const controller: AuctionController = {
    setLatest,
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
