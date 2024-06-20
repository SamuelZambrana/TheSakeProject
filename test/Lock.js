const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
require("dotenv").config({ path: ".env" });

describe("TheSakiProject test suit", function () {

  let initialOwner = process.env.PRIVATE_KEY;

  it("Deploy Saki Contract", async function(){
    const ERC721Contract = await ethers.getContractFactory("TheSakiNFTs")
    deployedERC721Contract = await ERC721Contract.deploy("MyNFT","MNFT", initialOwner)
    await deployedERC721Contract.waitForDeployment()

    console.log(deployedERC721Contract.target)
})
})
