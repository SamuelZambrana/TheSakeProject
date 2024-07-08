const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require("dotenv").config({ path: ".env" });

const MyNewListingModule = buildModule("MyNewListingModule", (m) => {

    const contractAddress = process.env.SP_CONTRACT_ADDRESS; 
    const MyNewListing = m.contractAt("TheNewSakiPlace", contractAddress);  //instance of the contract, no []

    //we need to make the ignition understand each call is different, so we add the last {}
    m.call(MyNewListing, "listNFT", [0, 10000000000000], { id: "listNFT0" });
    m.call(MyNewListing, "listNFT", [1, 10000000000000], { id: "listNFT1" });
    m.call(MyNewListing, "listNFT", [2, 10000000000000], { id: "listNFT2" });

    return { MyNewListing };

})

module.exports = MyNewListingModule;