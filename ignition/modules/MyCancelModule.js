const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require("dotenv").config({ path: ".env" });

const MyCancelModule = buildModule("MyCancelModule", (m) => {

    const contractAddress = process.env.SP_CONTRACT_ADDRESS; 
    const MyCancelation = m.contractAt("TheNewSakiPlace", contractAddress);  //instance of the contract, no []

    //m.call(MyCancelation, "cancelListing",[0]);

    return { MyCancelation };

})

module.exports = MyCancelModule;