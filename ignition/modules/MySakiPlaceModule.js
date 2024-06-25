/*const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require("dotenv").config({ path: ".env" });
const { ethers } = require("ethers");

const MySakiPlaceModule = buildModule("MySakiPlaceModule", (m) => {
    const contractAddress = process.env.CONTRACT_ADDRESS;

    const MySakiPlace = m.deploy("SakiPlace", contractAddress);

    return { MySakiPlace };

});

module.exports = MySakiPlaceModule;
*/