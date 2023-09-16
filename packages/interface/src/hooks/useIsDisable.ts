import { IsConnectModalOpenState } from "@/stores/isConnectModalOpenState";
import { isDisableState } from "@/stores/isDisableState";
import { useRecoilValue, useSetRecoilState } from "recoil";

export interface IsDisableController {
  on: () => void;
  off: () => void;
}

export const useIsDisableValue = (): IsConnectModalOpenState => {
  return useRecoilValue(isDisableState);
};

export const useIsDisableController = (): IsDisableController => {
  const setIsDisable = useSetRecoilState(isDisableState);

  /**
   * 操作を無効にする
   */
  const on = (): void => {
    setIsDisable(true);
  };

  /**
   * 操作を有効にする
   */
  const off = (): void => {
    setIsDisable(false);
  };

  const controller: IsDisableController = {
    on,
    off,
  };
  return controller;
};

export const useIsDisableState = (): [
  IsConnectModalOpenState,
  IsDisableController,
] => [useIsDisableValue(), useIsDisableController()];
