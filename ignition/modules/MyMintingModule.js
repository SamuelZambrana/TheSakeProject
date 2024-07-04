const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require("dotenv").config({ path: ".env" });
const { ethers } = require("ethers");

const MyMintingModule = buildModule("MyMintingModule", (m) => {
    const contractAddress = process.env.NFT_CONTRACT_ADDRESS;
    const privateKey = process.env.PRIVATE_KEY;
    const wallet = new ethers.Wallet(privateKey);
    const ourWallet = wallet.address; // Dirección de la wallet asociada a la clave privada

    const MyNFT = m.contractAt("TheSakiNFTs", contractAddress);

    const tokenUri = "QmY2JNUZprVtkXvRVdHaRZkCEfAhMfowQcb4vuBNsMaLWx";

    m.call(MyNFT, "safeMint", [ourWallet, tokenUri]);
    
    return { MyNFT };
});

module.exports = MyMintingModule;

//calling "safeMint" to generate a NFT in our wallet with another URI