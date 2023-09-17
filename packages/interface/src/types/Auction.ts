import { Address } from "wagmi";

export type Auction = {
  tokenId: bigint;
  amount: bigint;
  startTime: bigint;
  endTime: bigint;
  bidder: Address;
  settled: boolean;
};
