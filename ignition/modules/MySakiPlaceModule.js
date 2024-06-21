const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require("dotenv").config({ path: ".env" });
const { ethers } = require("ethers");

const MySakiPlaceModule = buildModule("MySakiPlaceModule", (m) => {
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const privateKey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey);
    const ourWallet = wallet.address; // Dirección de la wallet asociada a la clave privada

    const MySakiPlace = m.contract("SakiPlace", contractAddress);

    return { MySakiPlace };

});

module.exports = MySakiPlaceModule;