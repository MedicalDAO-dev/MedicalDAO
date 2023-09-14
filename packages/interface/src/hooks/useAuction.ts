import { AuctionHouse } from "@/lib/contracts/AuctionHouse";
import { AuctionModel } from "@/models/AuctionModel";
import { AuctionState, auctionState } from "@/stores/auctionState";
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
    // TODO: コントラクトからオークション情報を取得する
    setAuction(
      AuctionModel.create({
        bids: [
          {
            bidder: "0x019281ce34F8b8739991713D5E09D0C290B53886",
            amount: 20000000000000000n,
            hash: "0xb4c9eda3ef858a25ef819540daadece3cf16f3a213051b6c74e53bbe5b47869d",
          },
          {
            bidder: "0x31F31693723c4397cb8A978A19A95B82c72f4212",
            amount: 1000000000000000000n,
            hash: "0x934e6bb9b4a8d78d87a98c30b807567ea88a6a363a14e6824072c21ad82d2921",
          },
          {
            bidder: "0x019281ce34F8b8739991713D5E09D0C290B53886",
            amount: 20500000000000000000n,
            hash: "0xeb4b9a2e2b2ff2f8dc4239912dee24200c248ef17ff03baaa2ebcb6d9c5dd4e4",
          },
          {
            bidder: "0x31F31693723c4397cb8A978A19A95B82c72f4212",
            amount: 32200000000000000000n,
            hash: "0xa27d00837e594e1186cd6d9bebae720b4a783dd63c3226ba353d910b1a3f1280",
          },
        ],
        timeLimit: "5時間20分10秒",
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
