import { useEffect } from "react";
import { NULL_ADDRESS } from "@/const/const";
import { useAuctionController } from "@/hooks/useAuction";
import { useUserController } from "@/hooks/useUser";
import { useAccount } from "wagmi";

export const useInit = (): void => {
  useUserInit();
  useAuctionInit();
};

/**
 * ユーザー情報の初期化
 */
const useUserInit = (): void => {
  const { address } = useAccount();
  const { update } = useUserController();

  useEffect(() => {
    update({ address: address ?? NULL_ADDRESS });
  }, [address]);
};

/**
 * オークション情報の初期化
 */
const useAuctionInit = (): void => {
  //TODO: オークションの初期化処理
  const { setLatest } = useAuctionController();

  useEffect(() => {
    setLatest();
  }, []);
};
