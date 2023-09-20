import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "dotenv/config";
import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  etherscan: {
    apiKey: `${process.env.OPTIMISMSCAN_API_KEY}`,
  },
  networks: {
    // mainnet: {
    //   url: `${process.env.API_URL}`,
    //   accounts: [`${process.env.PRIVATE_KEY}`],
    // },
    sepolia: {
      url: `${process.env.ALCHEMY_SEPOLIA_API_URL}`,
      accounts: [`${process.env.DEPLOYER_PRIVATE_KEY}`],
    },
    "optimism-goerli": {
      url: "https://goerli.optimism.io",
      accounts: [`${process.env.DEPLOYER_PRIVATE_KEY}`],
      gasPrice: 10000000000,
    },
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
