const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require("dotenv").config({ path: ".env" });

const MyListingModule = buildModule("MyListingModule", (m) => {

    const contractAddress = process.env.SP_CONTRACT_ADDRESS; 
    const MyListing = m.contractAt("TheNewSakiPlace", contractAddress);  //instance of the contract, no []

    m.call(MyListing, "listNFT", [0, 10000000000000]);

    return { MyListing };

})

module.exports = MyListingModule;

//calling the function "listNFT" to see the id and the price of the NFT