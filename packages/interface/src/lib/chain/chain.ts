import { STAGE, WALLET_CONNECT_API_KEY } from "@/config/chain";
import { STAGE as CONST_STAGE } from "@/const/const";
import { configureChains, createConfig } from "wagmi";
import { optimism, optimismGoerli } from "wagmi/chains";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [STAGE === CONST_STAGE.PRODUCTION ? optimism : optimismGoerli],
  [publicProvider()],
);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: WALLET_CONNECT_API_KEY,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});
