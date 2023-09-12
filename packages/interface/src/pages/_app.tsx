import type { AppProps } from "next/app";
import { useInit } from "@/hooks/useInit";
import { config } from "@/lib/chain/chain";
import "@/styles/globals.css";
import { RecoilRoot } from "recoil";
import { WagmiConfig } from "wagmi";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <WagmiConfig config={config}>
        <Init />
        <Component {...pageProps} />
      </WagmiConfig>
    </RecoilRoot>
  );
}

const Init = () => {
  useInit();
  return <></>;
};
