import { NULL_ADDRESS } from "@/config/chain";
import { BaseModel } from "@/models/BaseModel";
import { Address } from "wagmi";

export class UserModel extends BaseModel {
  constructor(public readonly address: Address = NULL_ADDRESS) {
    super();
  }

  isConnected(): boolean {
    return this.address !== NULL_ADDRESS;
  }
}
