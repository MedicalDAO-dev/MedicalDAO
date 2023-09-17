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
    const getAuction = async (): Promise<Auction> => {
      return await AuctionHouse.auction();
    };
    const auction: Auction = await AuctionHouse.auction();
    const imageURL: string = `https://ipfs.io/ipfs/${await Descriptor.getImage(
      auction.tokenId,
    )}`;

    const timeLimitDiff: bigint =
      auction.endTime - BigInt(Date.now()) / BigInt(1000);
    const timeLimitStamp = timeLimitDiff > 0 ? timeLimitDiff : BigInt(0);

    setAuction(
      AuctionModel.create({
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
        timeLimit: formatDuration(timeLimitStamp),
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

  const controller: AuctionController = {
    init,
    bid,
  };
  return controller;
};

function formatDuration(duration: bigint): string {
  const MINUTE = BigInt(60);
  const HOUR = MINUTE * BigInt(60);

  let hours;
  let minutes;
  let seconds;
  if (duration !== BigInt(0)) {
    hours = duration / HOUR;
    duration = duration % HOUR;
    minutes = duration / MINUTE;
    seconds = duration % MINUTE;
  } else {
    hours = BigInt(0);
    minutes = BigInt(0);
    seconds = BigInt(0);
    return "入札終了";
  }

  return `${hours}時間 ${minutes}分 ${seconds}秒`;
}

export const useAuctionState = (): [AuctionState, AuctionController] => [
  useAuctionValue(),
  useAuctionController(),
];
