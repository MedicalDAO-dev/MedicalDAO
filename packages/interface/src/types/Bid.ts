import { Address } from "wagmi";

export type Bid = {
  bidder: Address;
  amount: bigint;
};
