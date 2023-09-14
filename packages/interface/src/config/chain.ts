import { Address } from "wagmi";

export const WALLET_CONNECT_API_KEY = process.env
  .NEXT_PUBLIC_WALLET_CONNECT_API_KEY as string;
export const STAGE = process.env.NEXT_PUBLIC_STAGE as string;
export const AUCTION_HOUSE = process.env.NEXT_PUBLIC_AUCTION_HOUSE as Address;
export const DESCRIPTOR = process.env.NEXT_PUBLIC_DESCRIPTOR as Address;
export const TOKEN = process.env.NEXT_PUBLIC_TOKEN as Address;
