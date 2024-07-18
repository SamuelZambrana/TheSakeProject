require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config({ path: ".env" });

const { INFURA_API_KEY, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.24",
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    }
  }
};




