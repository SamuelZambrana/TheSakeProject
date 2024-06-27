const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require("dotenv").config({ path: ".env" });

const MyNewSakiPlaceModule = buildModule("MyNewSakiPlaceModule", (m) => {

  const contractAddress = process.env.NFT_CONTRACT_ADDRESS;  
  const MySakiPlace = m.contract("TheNewSakiPlace", [contractAddress]); //constructor, so []

  return { MySakiPlace };
});

module.exports = MyNewSakiPlaceModule;