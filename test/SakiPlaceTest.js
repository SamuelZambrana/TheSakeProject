const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
require("dotenv").config({ path: ".env" });

describe("TheSakiProject test suit", function () {

  let deployedERC721Contract, deployedSakiPlaceContract;
  let account1;
  
  let initialOwner = process.env.PRIVATE_KEY;
  let NFTContractAddres = process.env.NFT_CONTRACT_ADDRESS

  it("Deploy SakiNFT", async function(){
    const ERC721Contract = await ethers.getContractFactory("TheSakiNFTs")
    deployedERC721Contract = await ERC721Contract.deploy("MyNFT","MNFT", initialOwner)
    await deployedERC721Contract.waitForDeployment()

    console.log(deployedERC721Contract.target)
  })

  it("Deploy SakiPlace Contract", async function(){
    
    const SakiPlaceContract = await ethers.getContractFactory("TheNewSakiPlace")
    deployedSakiPlaceContract = await SakiPlaceContract.deploy(NFTContractAddres)
    await deployedSakiPlaceContract.waitForDeployment()

    console.log(deployedSakiPlaceContract.target)
  })

  // Obtenemos las cuentas de usuario con las que se ejecutran las pruebas.
  it("Get Signers", async function(){
    [initialOwner,account1] = await ethers.getSigners()
  })

  // Verificación de que los contratos se han desplegado correctamente
  it("Contracts are deployed", async function() {
    expect(deployedERC721Contract.target).to.not.be.undefined
    expect(deployedSakiPlaceContract.target).to.not.be.undefined

})

})
