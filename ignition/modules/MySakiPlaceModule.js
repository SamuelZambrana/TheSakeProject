const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require("dotenv").config({ path: ".env" });

const MySakiPlaceModule = buildModule("MySakiPlaceModule", (m) => {

  const contractAddress = process.env.NFT_CONTRACT_ADDRESS;  
  const MySakiPlace = m.contract("TheSakiPlace", [contractAddress]);

  return { MySakiPlace };
});

module.exports = MySakiPlaceModule;