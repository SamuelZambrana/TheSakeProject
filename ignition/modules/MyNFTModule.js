const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const MyNFTModule = buildModule("MyNFTModule", (m) => {
  const MyNFT = m.contract("TheSakiNFTs", ["MyNFT", "MNFT", "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"]
    );

  return { MyNFT };
});

module.exports = MyNFTModule ;


