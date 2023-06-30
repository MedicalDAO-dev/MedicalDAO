import { ObjectCopier } from "@/models/ObjectCopier";

export class AuctionModel extends ObjectCopier {
  constructor(
    public readonly bidAmount: number = 0,
    public readonly imageURL: string = "/images/icon.jpg",
    public readonly dummy2: string = "",
    public readonly dummy3: string = "",
    public readonly dummy4: string = "",
    public readonly dummy5: string = "",
    public readonly bidder: string = ""
  ) {
    super();
  }
}
