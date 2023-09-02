import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { RecoilRoot } from "recoil";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { mainnet, optimism, polygon } from "wagmi/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

// Configure chains & providers with the Alchemy provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, optimism],
  [
    alchemyProvider({ apiKey: "Y3Pj2J-xkxiRQMEe88uKo7TjkTVbIK5C" }),
    publicProvider(),
  ],
);

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: "wagmi",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "...",
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

// Pass config to React Context Provider
// function App() {
//   return (
//     <WagmiConfig config={config}>
//       <Profile />
//     </WagmiConfig>
//   )
// }

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <WagmiConfig config={config}>
        <Component {...pageProps} />
      </WagmiConfig>
    </RecoilRoot>
  );
}
