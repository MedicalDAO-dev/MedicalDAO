import { NULL_ADDRESS } from "@/const/const";
import { BaseModel } from "@/models/BaseModel";
import { Address } from "wagmi";

export class UserModel extends BaseModel {
  constructor(
    public readonly address: Address = NULL_ADDRESS,
    public readonly bidAmount: bigint = 0n,
  ) {
    super();
  }

  /**
   * 接続済みかどうか
   * @returns {boolean} 接続済みかどうか
   */
  isConnected(): boolean {
    return this.address !== NULL_ADDRESS;
  }
}
