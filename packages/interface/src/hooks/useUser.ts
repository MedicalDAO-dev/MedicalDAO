import { UserState, userState } from "@/stores/userState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Address } from "wagmi";

export interface UserController {
  update: ({
    address,
    bidAmount,
  }: {
    address?: Address;
    bidAmount?: bigint;
  }) => void;
}

export const useUserValue = (): UserState => {
  return useRecoilValue(userState);
};

export const useUserController = (): UserController => {
  const setUser = useSetRecoilState(userState);

  /**
   * 更新
   * @param address アドレス
   * @param bidAmount 入札額
   */
  const update = ({
    address,
    bidAmount,
  }: {
    address?: Address;
    bidAmount?: bigint;
  }): void => {
    setUser((prevState) => {
      return prevState.copyWith({
        address: address ?? prevState.address,
        bidAmount: bidAmount ?? prevState.bidAmount,
      });
    });
  };

  const controller: UserController = {
    update,
  };
  return controller;
};

export const useUserState = (): [UserState, UserController] => [
  useUserValue(),
  useUserController(),
];
