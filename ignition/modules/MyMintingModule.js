const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require("dotenv").config({ path: ".env" });
const { ethers } = require("ethers");

const MyMintingModule = buildModule("MyMintingModule", (m) => {
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const privateKey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey);
    const ourWallet = wallet.address; // Dirección de la wallet asociada a la clave privada

    const MyNFT = m.contractAt("TheSakiNFTs", contractAddress);

    const tokenUri = "QmdJ4MF8abq466wXCoq6Jek5LqoQLvPAhx1nbqvE3rCxfB";

    m.call(MyNFT, "safeMint", [ourWallet, tokenUri]);

    return { MyNFT };
});

module.exports = MyMintingModule;