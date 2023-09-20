import descriptor from "@/artifacts/Descriptor.json";
import { DESCRIPTOR } from "@/config/config";
import { readContract } from "@wagmi/core";

const contract = (functionName: string) => {
  return {
    address: DESCRIPTOR,
    abi: descriptor.abi,
    functionName,
  };
};

export class Descriptor {
  // ---------------------------------------------------------
  // read
  // ---------------------------------------------------------
  /**
   * 画像CIDを取得
   * @return {Promise<string>} 画像CID
   */
  public static getImage = async (tokenId: bigint): Promise<string> => {
    return (await readContract({
      ...contract("getImage"),
    })) as string;
  };

  /**
   * 画像CIDを取得
   * @return {Promise<string>} 画像CID
   */
  public static getCID = async (): Promise<string> => {
    return (await readContract({
      ...contract("getCID"),
    })) as string;
  };
}
