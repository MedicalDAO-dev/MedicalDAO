import { ObjectCopier } from "@/models/ObjectCopier";

export class NFTModel extends ObjectCopier {
  constructor(
    public readonly bidAmount: number = 0,
    public readonly imageURL: string = "/images/icon.jpg",
    public readonly bidder: string = "",
  ) {
    super();
  }
}