import { atom } from "recoil";

export const isDisableState = atom<boolean>({
  key: "isDisableState",
  default: false,
});
