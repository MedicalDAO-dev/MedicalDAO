import { Address } from "wagmi";

export type Auction = {
  tokenId: bigint;
  amounts: bigint[];
  startTime: bigint;
  endTime: bigint;
  bidders: Address[];
  settled: boolean;
};
