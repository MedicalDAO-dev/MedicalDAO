import { Address } from "wagmi";

export type Auction = {
  tokenId: BigInt;
  amount: BigInt;
  startTime: BigInt;
  endTime: BigInt;
  bidder: Address;
  settled: boolean;
};
