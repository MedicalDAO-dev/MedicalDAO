import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  // etherscan: {
  //   apiKey: `${process.env.ETHERSCAN_API}`,
  // },
  networks: {
    // mainnet: {
    //   url: `${process.env.API_URL}`,
    //   accounts: [`${process.env.PRIVATE_KEY}`],
    // },
    // local: {
    //   url: 'http://localhost:8545',
    //   // accounts: [`${process.env.LOCAL_PRIVATE_KEY}`],
    // },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
    // currency: "JPY",
    // gasPriceApi:
    //   "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
    // coinmarketcap: COINMARKETCAP_API_KEY,
  },
};

export default config;
