require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");
require("@nomicfoundation/hardhat-chai-matchers")
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const INFURA_HTTP_KEY = process.env.INFURA_API_KEY
const PRIVATE_KEY = process.env.PRIVATE_KEY

// const { ALCHEMY_HTTP_KEY, DEPLOYER_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  //should we do that on mumbay???
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${INFURA_HTTP_KEY}`, //sepolia
      accounts: [PRIVATE_KEY],
    },
    amoy: {
      url: `https://polygon-amoy.g.alchemy.com/v2/${INFURA_HTTP_KEY}`,  //mumbay(amoy)
      accounts: [PRIVATE_KEY],
    },
  }
};