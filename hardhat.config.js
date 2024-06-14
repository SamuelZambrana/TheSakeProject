require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { vars } = require("hardhat/config");  

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY; 

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
    /*sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`, //sepolia
      accounts: [PRIVATE_KEY],
    },*/
    amoy: {
      url: `https://polygon-amoy.infura.io/v3/${INFURA_API_KEY}`,  //mumbay(amoy)
      accounts: [PRIVATE_KEY],
    },
  }
};



