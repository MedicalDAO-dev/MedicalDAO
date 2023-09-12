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
     * open
     */
    const open = (): void => {
      setIsConnectModalOpen(true);
    };

    /**
     * close
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
