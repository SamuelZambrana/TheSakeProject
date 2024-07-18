const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require("dotenv").config({ path: ".env" });

const TheRealSakiPlace = buildModule("TheRealSakiPlace", (m) => {

  const contractAddress = process.env.NFT_CONTRACT_ADDRESS;  
  const MySakiPlace2 = m.contract("TheNewSakiPlace", [contractAddress]); //constructor, so []

  return { MySakiPlace2 };
});

module.exports = TheRealSakiPlace;