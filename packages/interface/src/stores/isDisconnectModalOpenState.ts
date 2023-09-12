import { atom } from "recoil";

export type IsDisconnectModalOpenState = boolean;

export const isDisconnectModalOpenState = atom<IsDisconnectModalOpenState>({
  key: "isDisconnectModalOpenState",
  default: false,
});
