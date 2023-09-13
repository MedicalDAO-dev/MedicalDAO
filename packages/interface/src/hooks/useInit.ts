import { useEffect } from "react";
import { NULL_ADDRESS } from "@/config/chain";
import { useUserController } from "@/hooks/useUser";
import { useAccount } from "wagmi";

export const useInit = (): void => {
  useUserInit();
};

const useUserInit = (): void => {
  const { address } = useAccount();
  const { update } = useUserController();

  useEffect(() => {
    update(address ?? NULL_ADDRESS);
  }, [address]);
};
