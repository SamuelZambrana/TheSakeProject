const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("ethers");
require("dotenv").config({ path: ".env" });

const TheTestPurchase = buildModule("TheTestPurchase", (m) => {
    //we want to make an instance m.contractAt of "TheNewSakiPlace" and m.call to "buyNFT(tokenId)" function
    const SakiPlaceContract = process.env.SP_CONTRACT_ADDRESS;
    //direccion de la wallet del comprador
    const privateKey = process.env.BUYER_TESTKEY;
    const buyerWallet = new ethers.Wallet(privateKey);

    const price = 10000000000000

    const myPurchase = m.contractAt("TheNewSakiPlace", SakiPlaceContract);
    
    m.call(myPurchase, "buyNFT", [3, price], { from: buyerWallet.address });

    return { myPurchase }

});

module.exports = TheTestPurchase;