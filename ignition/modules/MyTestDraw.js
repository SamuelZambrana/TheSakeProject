const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
require("dotenv").config({ path: ".env" });

const MyTestModule = buildModule("MyTestModule", (m) => {

    const contractAddress = process.env.SP_CONTRACT_ADDRESS; 
    const MyTest = m.contractAt("TheNewSakiPlace", contractAddress);  //instance of the contract, no []

    m.call(MyTest, "listNFT", [3, 10000000000000]);

    return { MyTest };

})

module.exports = MyTestModule;