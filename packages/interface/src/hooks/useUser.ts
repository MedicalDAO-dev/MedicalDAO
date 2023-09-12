import { UserState, userState } from "@/stores/userState";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Address } from "wagmi";

export interface UserController {
  update: (address?: Address) => void;
}

export const useUserValue = (): UserState => {
  return useRecoilValue(userState);
};

export const useUserController = (): UserController => {
  const setUser = useSetRecoilState(userState);

  /**
   * update
   */
  const update = (address?: Address): void => {
    setUser((prevState) => {
      return prevState.copyWith({ address: address ?? prevState.address });
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
