import { atom } from "recoil";

export type IsConnectModalOpenState = boolean;

export const isConnectModalOpenState = atom<IsConnectModalOpenState>({
  key: "isConnectModalOpenState",
  default: false,
});
