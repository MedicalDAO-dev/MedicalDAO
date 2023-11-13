import { BaseModel } from "@/models/BaseModel";

export class NFTModel extends BaseModel {
  constructor(
    public readonly tokenId: bigint = 0n,
    public readonly imageURL: string = "",
  ) {
    super();
  }
}
