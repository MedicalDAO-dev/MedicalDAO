import { NULL_ADDRESS } from "@/const/chain";
import { ObjectCopier } from "@/models/ObjectCopier";
import { Address } from "wagmi";

export class AuctionModel extends ObjectCopier {
  constructor(
    public readonly bidAmount: number = 0,
    public readonly imageURL: string = "/images/icon.jpg",
    public readonly bidder: Address = NULL_ADDRESS,
  ) {
    super();
  }
}
