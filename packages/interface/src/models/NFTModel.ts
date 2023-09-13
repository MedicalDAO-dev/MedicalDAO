import { BaseModel } from "@/models/BaseModel";

export class NFTModel extends BaseModel {
  constructor(
    public readonly bidAmount: number = 0,
    public readonly imageURL: string = "/images/icon.jpg",
    public readonly bidder: string = "",
  ) {
    super();
  }
}
