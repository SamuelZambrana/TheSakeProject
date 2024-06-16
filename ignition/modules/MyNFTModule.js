const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require("dotenv").config({ path: ".env" });
const { ethers } = require("ethers");

const MyNFTModule = buildModule("MyNFTModule", (m) => {
    const privateKey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey);
    const ourWallet = wallet.address; // Dirección de la wallet asociada a la clave privada

    const MyNFT = m.contract("TheSakiNFTs", ["MyNFT", "MNFT", ourWallet]);

    const tokenUri = "QmV3kY4B8vTt9X4G1i3gLMwBhtZt6Csj878jEamZRXgwoi";

    m.call(MyNFT, "safeMint", [ourWallet, tokenUri]);

    return { MyNFT };
});

module.exports = MyNFTModule;