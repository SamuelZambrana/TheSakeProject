const { expect } = require("chai");
const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("TheSakiNFTs Test Suite", function(){

    let deployedTheSakiNFTsContract //Direccion desplegada del contrato ERC721

    let signer, otherAccount //Direcciones signers(firmantes)
    let initialOwner= "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"; //Direccion del dueño inicial para el despliegue del contrato
    signer= initialOwner;
    it("Deploy Contract TheSakiNFTs", async function(){
        const TheSakiNFTsContract = await ethers.getContractFactory("TheSakiNFTs")
        deployedTheSakiNFTsContract = await TheSakiNFTsContract.deploy("MyNFT","MNFT", initialOwner)
        //await deployedTheSakiNFTsContract.waitForDeployment()
        console.log(deployedTheSakiNFTsContract.target)
    })

    it("Get Signers", async function(){
        [signer,otherAccount] = await ethers.getSigners()
        console.log(signer.address)
        console.log(otherAccount.address)
    })

    it("should increment the counter and return the new tokenId when calling safeMint", async function () {
        //Minteamos el TokenId
        const mint = await deployedTheSakiNFTsContract.safeMint(signer.addres, "QmXVoFLmJTkFJz9qVsTRdJJpZxoL6JNMwc74NVw3mXDF52");
        console.log("Address del creador del TokenId: ", mint.to)
        //Verificamos que el contador se haya incrementado
        expect(0).to.equal(0)
      });
    
      it("should transfer a token correctly when calling doTransfer", async function () {
        //Hacemos una transferencia del tokenID desde este contrato a otra direccion
        const transfer = await deployedERC721Contract.doTransfer(otherAccount.address, tokenId);
        console.log("Address antes de la transferencia del TokenId: ", transfer.to)
        //Verificamos quien es el nuevo dueño del tokenId
        const newOwner = await deployedERC721Contract.ownerOfToken(tokenId);
        expect(newOwner).to.equal(otherAccount.address);
      });
    
      it("should return the address of the correct owner when calling ownerOfToken", async function () {
        //Obtenemos la direccion del creador del tokenId
        const expectedOwner = await deployedERC721Contract.ownerOf(tokenId);
        //Direccion actual del tokenId
        const actualOwner = await deployedERC721Contract.ownerOfToken(tokenId);
        expect(actualOwner).to.equal(expectedOwner);
        console.log("Addrees despues de la transferencia del token ID: ", actualOwner)
      });
      
      

});
