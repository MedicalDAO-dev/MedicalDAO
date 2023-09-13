import { NULL_ADDRESS } from "@/config/chain";
import { BaseModel } from "@/models/BaseModel";
import { NFTModel } from "@/models/NFTModel";
import { Address } from "wagmi";

export class AuctionModel extends BaseModel {
  constructor(
    public readonly bidAmount: number = 0,
    public readonly imageURL: string = "/assets/images/logo.webp",
    public readonly bidder: Address = NULL_ADDRESS,
    public readonly nft: NFTModel = new NFTModel(),
  ) {
    super();
  }
}
