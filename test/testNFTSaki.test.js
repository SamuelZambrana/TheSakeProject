const { expect } = require("chai");

let deployedSakiNFTS //Direccion desplegada del contrato ERC721

let signer, owner //Direcciones signers(firmantes)

let tokenId // Creamos e inicializamos el tokenId a 0

let tokenUri = "ipfs://QmV3kY4B8vTt9X4G1i3gLMwBhtZt6Csj878jEamZRXgwoi";

describe("TheSakiNFTs contract", function () {

  it("Deploy Contract TheSakiNFTs, Get Signers and balance of owner", async function () {
    //Obtener las direcciones de los firmantes para el contrato
    [owner, signer] = await ethers.getSigners();
    console.log("Owner Address: ", owner.address)
    console.log("Signer Address: ", signer.address)

    //Creamos la instancia del contrato y lo desplegamos pasandole los parametros al constructor
    deployedSakiNFTS = await ethers.deployContract("TheSakiNFTs", ["MyNFT","MNFT", owner.address]);
    await deployedSakiNFTS.deployed();
    console.log("Contract Address: ", deployedSakiNFTS.address);
    
    //Obtenemos el balance total de la direccion del owner, que es el que despliega el contrato
    const ownerBalance = await deployedSakiNFTS.balanceOf(owner.address);
    expect(0).to.equal(ownerBalance);
    console.log("Balance of owner: ", ownerBalance) 
  });

  it("should increment the counter and return the new tokenId when calling safeMint", async function () {
    //Minteamos el TokenId
    tokenId = await deployedSakiNFTS.connect(owner).safeMint(signer.address, tokenUri);
    await tokenId.wait();
    console.log("Address del creador del TokenId: ", tokenId.to)

    // Obtenemos el tokenId generado por la función safeMint
    const tokenIdAfterMint = await deployedSakiNFTS.ownerOf(0);
    console.log("Nuevo dueño del tokenId:", tokenIdAfterMint.toString());
  });

  /*
  it("debería devolver la URI correcta para un token existente", async function () {
    //Llamamos a la funcion tokenUri pasandole el tokenId Y nos devuelve el tokenUri asosiado
    const actualURI = await deployedSakiNFTS.tokenURI(tokenId);
    expect(actualURI.toString()).to.equal(tokenUri.toString());
  });
  
  it("debería revertir si se consulta un token inexistente", async function () {
    const nonExistentTokenId = 999; // ID de un token que no existe
    await expect(tokenContract.tokenURI(nonExistentTokenId)).to.be.revertedWith("ERC721: token does not exist");
  }); */

});
