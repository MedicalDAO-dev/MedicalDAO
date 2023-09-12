import { NULL_ADDRESS } from "@/const/chain";
import { AuctionState, auctionState } from "@/stores/auctionState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  Address,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

export interface AuctionController {
  init: () => Promise<void>;
  setBidAmount: (amount: any) => Promise<void>;
  bid: (bidder: Address, bidAmount: any) => Promise<void>;
}

export const useAuctionValue = (): AuctionState => {
  return useRecoilValue(auctionState);
};

export const useAuctionController = (): AuctionController => {
  const setAuction = useSetRecoilState(auctionState);
  const { address, connector, isConnected } = useAccount();
  const abi = require("../utils/AuctionHouse.json");
  const { config } = usePrepareContractWrite({
    address: "0x6AFf29eBd3bE51ced0773FEc596696AF0812C97a",
    abi: abi.abi,
    functionName: "createBid",
    args: [parseInt("3")],
    enabled: Boolean(3),
  });
  const { write } = useContractWrite(config);

  /**
   * init
   */
  const init = async (): Promise<void> => {};

  /**
   * setBidAmount
   */
  const setBidAmount = async (amount: any): Promise<void> => {
    // ログインしているユーザーのアドレスを取得する
    const loggedInUserAddress = address;
    console.log("Logged in user's address:", loggedInUserAddress);
    let bidderAddress = "0x0000000";
    if (loggedInUserAddress) {
      bidderAddress = loggedInUserAddress;
    }
    setAuction((prevState) => {
      return prevState.copyWith({
        bidder: loggedInUserAddress ?? NULL_ADDRESS,
        bidAmount: amount,
      });
    });
  };

  /**
   * bid
   */
  const bid = async (bidder: Address, bidAmount: any): Promise<void> => {
    console.log("bidder", bidder);
    console.log("bidAmount", bidAmount);
    alert("bidder:" + bidder + " bidAmount:" + bidAmount);
    // mint関数を呼び出す
    const result: any = write?.();
    console.log("result", result);
    // const random = Math.floor(Math.random() * 100) + 1;
    // console.log("bid", random);
    // setAuction((prevState) => {
    //   return prevState.copyWith({
    //     bidder: "GodYawn" + random,
    //     bidAmount: prevState.bidAmount + 10,
    //   });
    // });
  };

  const controller: AuctionController = {
    init,
    setBidAmount,
    bid,
  };
  return controller;
};

export const useAuctionState = (): [AuctionState, AuctionController] => [
  useAuctionValue(),
  useAuctionController(),
];
