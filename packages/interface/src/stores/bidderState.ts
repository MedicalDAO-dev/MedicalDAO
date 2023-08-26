import { atom } from "recoil";

export type BidderState = string;

export const bidderState = atom<BidderState>({
  key: "bidderState",
  default: "",
});
