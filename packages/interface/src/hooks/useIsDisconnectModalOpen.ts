import { IsConnectModalOpenState } from "@/stores/isConnectModalOpenState";
import { isDisconnectModalOpenState } from "@/stores/isDisconnectModalOpenState";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface IsDisconnectModalOpenController {
  open: () => void;
  close: () => void;
}

export const useIsDisconnectModalOpenValue = (): IsConnectModalOpenState => {
  return useRecoilValue(isDisconnectModalOpenState);
};

export const useIsDisconnectModalOpenController =
  (): IsDisconnectModalOpenController => {
    const setIsDisconnectModalOpen = useSetRecoilState(
      isDisconnectModalOpenState,
    );

    /**
     * モーダルを開く
     */
    const open = (): void => {
      setIsDisconnectModalOpen(true);
    };

    /**
     * モーダル閉じる
     */
    const close = (): void => {
      setIsDisconnectModalOpen(false);
    };

    const controller: IsDisconnectModalOpenController = {
      open,
      close,
    };
    return controller;
  };

export const useIsDisconnectModalOpenState = (): [
  IsConnectModalOpenState,
  IsDisconnectModalOpenController,
] => [useIsDisconnectModalOpenValue(), useIsDisconnectModalOpenController()];
