import {
  IsConnectModalOpenState,
  isConnectModalOpenState,
} from "@/stores/isConnectModalOpenState";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface IsConnectModalOpenController {
  open: () => void;
  close: () => void;
}

export const useIsConnectModalOpenValue = (): IsConnectModalOpenState => {
  return useRecoilValue(isConnectModalOpenState);
};

export const useIsConnectModalOpenController =
  (): IsConnectModalOpenController => {
    const setIsConnectModalOpen = useSetRecoilState(isConnectModalOpenState);

    /**
     * モーダルを開く
     */
    const open = (): void => {
      setIsConnectModalOpen(true);
    };

    /**
     * モーダルを閉じる
     */
    const close = (): void => {
      setIsConnectModalOpen(false);
    };

    const controller: IsConnectModalOpenController = {
      open,
      close,
    };
    return controller;
  };

export const useIsConnectModalOpenState = (): [
  IsConnectModalOpenState,
  IsConnectModalOpenController,
] => [useIsConnectModalOpenValue(), useIsConnectModalOpenController()];
