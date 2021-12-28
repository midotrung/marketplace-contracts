require('babel-register')
require('babel-polyfill')
require('dotenv').config()

import '@nomiclabs/hardhat-truffle5'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-etherscan'
import 'decentraland-contract-plugins/dist/src/mana/tasks/load-mana'
import '@nomiclabs/hardhat-web3'

import { getDeployParams } from './scripts/utils'

const PRIVATE_KEY_DEPLOYER_ACCOUNT =
  process.env.PRIVATE_KEY_DEPLOYER_ACCOUNT

const accounts = [
  PRIVATE_KEY_DEPLOYER_ACCOUNT, 
];

module.exports = {
  defaultNetwork: 'hardhat',
  solidity: {
    compilers: [
      {
        version: '0.7.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1,
          },
        },
      },
    ],
  },
  // networks: {
  //   hardhat: {
  //     blockGasLimit: 10000000,
  //     gas: 10000000,
  //   },
  //   local: {
  //     url: 'http://127.0.0.1:8545',
  //     blockGasLimit: 10000000,
  //     gas: 10000000,
  //     network_id: '*', // eslint-disable-line camelcase
  //   },
  //   deploy: getDeployParams(),
  // },
  networks: {
    hardhat: {
      forking: {
        enabled: process.env.FORKING_ENABLED === "true" ? true : false,
        url: "https://rpc-mumbai.maticvigil.com",
      },
    },
    maticmainnet: {
      url: "https://matic-mainnet.chainstacklabs.com", // https://rpc-mainnet.maticvigil.com
      accounts,
      chainId: 137,
      live: true,
      saveDeployments: true,
      gasPrice: 111000000000,
    },
    matictestnet: {
      url: "https://matic-mumbai.chainstacklabs.com", // https://rpc-mumbai.maticvigil.com
      accounts,
      chainId: 80001,
      live: true,
      saveDeployments: true,
      tags: ["staging"],
      gasPrice: 3000000000, // 3 Gwei
      gasMultiplier: 1,
    },
  },
  gasReporter: {
    chainId: 1,
    enabled: !!process.env.REPORT_GAS === true,
    currency: 'USD',
    gasPrice: 21,
    showTimeSpent: true,
  },
}
