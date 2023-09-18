import { AuctionHouse } from "@/lib/contracts/AuctionHouse";
import { Descriptor } from "@/lib/contracts/Descriptor";
import { AuctionModel } from "@/models/AuctionModel";
import { NFTModel } from "@/models/NFTModel";
import { AuctionState, auctionState } from "@/stores/auctionState";
import { Auction } from "@/types/Auction";
import { Hash } from "@wagmi/core";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface AuctionController {
  init: () => Promise<void>;
  bid: (bidAmount: bigint) => Promise<Hash>;
  updateCurrentDateTime: () => void;
}

export const useAuctionValue = (): AuctionState => {
  return useRecoilValue(auctionState);
};

export const useAuctionController = (): AuctionController => {
  const dateTime = useAuctionValue().currentDateTime;
  const setAuction = useSetRecoilState(auctionState);

  /**
   * 初期化
   */
  const init = async (): Promise<void> => {
    const auction: Auction = await AuctionHouse.auction();
    const imageURL: string = `https://ipfs.io/ipfs/${await Descriptor.getImage(
      auction.tokenId,
    )}`;

    setAuction(
      AuctionModel.create({
        currentDateTime: dateTime,
        tokenId: auction.tokenId,
        amount: auction.amount,
        startTime: auction.startTime,
        endTime: auction.endTime,
        bidder: auction.bidder,
        bids: [
          {
            bidder: auction.bidder,
            amount: auction.amount,
            hash: "0x934e6bb9b4a8d78d87a98c30b807567ea88a6a363a14e6824072c21ad82d2921",
          },
        ],
        nft: new NFTModel(imageURL),
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

  const updateCurrentDateTime = (): void => {
    setAuction((prevState) => {
      return prevState.copyWith({
        currentDateTime: Math.floor(Date.now() / 1000),
      });
    });
  };

  const controller: AuctionController = {
    init,
    bid,
    updateCurrentDateTime,
  };

  return controller;
};

export const useAuctionState = (): [AuctionState, AuctionController] => [
  useAuctionValue(),
  useAuctionController(),
];
