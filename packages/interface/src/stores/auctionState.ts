import { AuctionModel } from "@/models/AuctionModel";
import { atom } from "recoil";

export type AuctionState = AuctionModel;

export const auctionState = atom<AuctionState>({
  key: "auctionState",
  default: AuctionModel.create({}),
});
