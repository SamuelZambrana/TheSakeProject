require("@nomicfoundation/hardhat-toolbox");

const { vars } = require("hardhat/config");  

const INFURA_API_KEY = vars.get("INFURA_API_KEY");   //or process.env.KEY??

const PRIVATE_KEY = vars.get("PRIVATE_KEY");    

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
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`, //mumbay??
      accounts: [PRIVATE_KEY],
    },
  }
};



