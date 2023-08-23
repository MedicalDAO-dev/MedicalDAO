import { atom } from "recoil";

export type BidAmountState = number;

export const bidAmountState = atom<BidAmountState>({
  key: "bidAmountState",
  default: 0,
});
