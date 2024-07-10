const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("ethers");
require("dotenv").config({ path: ".env" });

const MyPurchaseModule = buildModule("MyPurchaseModule", (m) => {
    //we want to make an instance m.contractAt of "TheNewSakiPlace" and m.call to "buyNFT(tokenId)" function
    const SakiPlaceContract = process.env.SP_CONTRACT_ADDRESS;
    //direccion de la wallet del comprador
    const privateKey = process.env.BUYER_TESTKEY;
    const wallet = new ethers.Wallet(privateKey);
    const buyerWallet = wallet.address; 


    const myPurchase = m.contractAt("TheNewSakiPlace", SakiPlaceContract);
    const price = 10000000000000;
    
    m.call(myPurchase, "buyNFT", [3], { value: price, from: buyerWallet });

    return { myPurchase }

});

module.exports = MyPurchaseModule;
