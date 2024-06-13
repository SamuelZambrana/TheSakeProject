const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const MyNFTModule = buildModule("MyNFTModule", (m) => {
  const myNFT = m.contract("MyNFT", {
    args: ["MyNFT", "MNFT"]
  });

  return { myNFT };
});

module.exports = MyNFTModule;

//understand this
