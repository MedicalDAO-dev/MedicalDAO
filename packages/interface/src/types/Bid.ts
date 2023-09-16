import { Hash } from "@wagmi/core";
import { Address } from "wagmi";

export type Bid = {
  bidder: Address;
  amount: bigint;
  hash: Hash;
};
