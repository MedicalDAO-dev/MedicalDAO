import { AuctionState, auctionState } from "@/stores/auctionState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Address, useAccount, usePrepareContractWrite, useContractWrite } from "wagmi";

export interface AuctionController {
  init: () => Promise<void>;
  setBidAmount: (amount:any) => Promise<void>;
  bid: (bidder:Address,bidAmount:any) => Promise<void>;
}

export const useAuctionValue = (): AuctionState => {
  return useRecoilValue(auctionState);
};

export const useAuctionController = (): AuctionController => {
  const setAuction = useSetRecoilState(auctionState);
  const { address, connector, isConnected } = useAccount()
  const { config } = usePrepareContractWrite({
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [],
        outputs: [],
      },
    ],
    functionName: 'mint',
    args: [parseInt("3")],
    enabled: Boolean(3),
  })
  const { write } = useContractWrite(config)

  /**
   * init
   */
  const init = async (): Promise<void> => {};

  /**
   * setBidAmount
   */
  const setBidAmount = async (amount:any): Promise<void> => {
    // ログインしているユーザーのアドレスを取得する
    const loggedInUserAddress = address;
    console.log("Logged in user's address:", loggedInUserAddress);
    let bidderAddress = "0x0000000" 
    if (loggedInUserAddress) {
      bidderAddress = loggedInUserAddress;
    }
    setAuction((prevState) => {
      return prevState.copyWith({
        bidder: bidderAddress,
        bidAmount: amount,
      });
    });
  };

  /**
   * bid
   */
  const bid = async (bidder:Address,bidAmount:any): Promise<void> => {
    console.log("bidder", bidder);
    console.log("bidAmount", bidAmount);
    alert("bidder:" + bidder + " bidAmount:" + bidAmount);
    // mint関数を呼び出す
    const result:any = write?.()
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
