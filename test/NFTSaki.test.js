const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require('ethers');
const TheSakiNFTs = require("../artifacts/contracts/TheSakiNFTs.sol/TheSakiNFTs.json");


describe("TheSakiNFTs Test Suite", function(){

    let deployedTheSakiNFTsContract //Direccion desplegada del contrato ERC721

    let signer, otherAccount //Direcciones signers(firmantes)
    
    let initialOwner= "0x627306090abaB3A6e1400e9345bC60c78a8BEf57"; //Direccion del dueño inicial para el despliegue del contrato
    let tokenUri = "ipfs://QmV3kY4B8vTt9X4G1i3gLMwBhtZt6Csj878jEamZRXgwoi";
    let tokenId = 0;

    const value = BigNumber.from("1000000000000000000"); // 1 ether en wei
  
    it("Deploy Contract TheSakiNFTs", async function(){
        const TheSakiNFTsContract = await ethers.getContractFactory("TheSakiNFTs")
        deployedTheSakiNFTsContract = await TheSakiNFTsContract.deploy("MyNFT","MNFT", initialOwner)
        await deployedTheSakiNFTsContract.deployed();
        console.log("Contract Address: ", deployedTheSakiNFTsContract.address);
    })

    it("Get Signers", async function(){
        [signer,otherAccount] = await ethers.getSigners()
        console.log("Signer Address: ", signer.address)
        console.log("OtherAccount Address: ", otherAccount.address)
    })

    it("should increment the counter and return the new tokenId when calling safeMint", async function () {
        //Minteamos el TokenId
        const tokenId = await deployedTheSakiNFTsContract.connect(signer).safeMint(otherAccount.address, tokenUri);
        await tokenId.wait();
        console.log("Address del creador del TokenId: ", tokenId.to)
        //Verificamos que el dueño del tokenUri es la nueva direccion donde se ha transferido
        //expect(await deployedTheSakiNFTsContract.ownerOfToken(tokenId)).to.equal(otherAccount.address);
        //Convertimos y parseamos los ethers para evitar desbordaciones
        const value = ethers.utils.parseUnits("1.0", "ether"); // Convirtiendo 1 ether a wei
        //Comprovamos que la direcion del tokenUri conincide con el ID del token
        //expect(await deployedTheSakiNFTsContract.tokenURI(tokenId)).to.equal(tokenUri);
      });
    
      it("should transfer a token correctly when calling doTransfer", async function () {
        //Minteamos el TokenId
        const tokenId = await deployedTheSakiNFTsContract.connect(signer).safeMint(otherAccount.address, tokenUri);
        await tokenId.wait();
        //Hacemos una transferencia del tokenID desde este contrato a otra direccion
        const transfer = await deployedTheSakiNFTsContract.doTransfer(signer.address, tokenId);
        console.log("Address antes de la transferencia del TokenId: ", transfer.to)
        //Verificamos quien es el nuevo dueño del tokenId
        //const newOwner = await deployedTheSakiNFTsContract.ownerOfToken(tokenId);
        //expect(newOwner).to.equal(signer.address);
      });
    
      it("should return the address of the correct owner when calling ownerOfToken", async function () {
        //Hacemos una transferencia del tokenID desde este contrato a la direccion original del despliegue
        const transfer = await deployedTheSakiNFTsContract.doTransfer(initialOwner, tokenId);
        console.log("Address antes de la transferencia del TokenId: ", transfer.to)
        //Direccion actual del tokenId
        const actualOwner = await deployedTheSakiNFTsContract.ownerOfToken(tokenId);
        expect(actualOwner).to.equal(expectedOwner);
        console.log("Addrees despues de la transferencia del token ID: ", actualOwner)
      });
      
      

});
