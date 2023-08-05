import { AuctionState, auctionState } from "@/stores/auctionState";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface AuctionController {
  init: () => Promise<void>;
  bid: () => Promise<void>;
}

export const useAuctionValue = (): AuctionState => {
  return useRecoilValue(auctionState);
};

export const useAuctionController = (): AuctionController => {
  const setAuction = useSetRecoilState(auctionState);

  /**
   * init
   */
  const init = async (): Promise<void> => {};

  /**
   * bid
   */
  const bid = async (): Promise<void> => {
    const random = Math.floor(Math.random() * 100) + 1;
    setAuction((prevState) => {
      return prevState.copyWith({
        bidder: "GodYawn" + random,
        bidAmount: prevState.bidAmount + 10,
      });
    });
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