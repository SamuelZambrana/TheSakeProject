require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config({path:".env"});

const { vars } = require("hardhat/config");  

const ALCHEMY_HTTP_KEY = process.env.ALCHEMY_HTTP_KEY
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY

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
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_HTTP_KEY}`, //sepolia
      accounts: [DEPLOYER_PRIVATE_KEY],
    },
    amoy: {
      url: `https://polygon-amoy.g.alchemy.com/v2/${ALCHEMY_HTTP_KEY}`,  //mumbay(amoy)
      accounts: [DEPLOYER_PRIVATE_KEY],
    },
  }
};