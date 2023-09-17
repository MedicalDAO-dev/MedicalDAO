import { BaseModel } from "@/models/BaseModel";

export class NFTModel extends BaseModel {
  constructor(public readonly imageURL: string = "/assets/images/logo.webp") {
    super();
  }
}
