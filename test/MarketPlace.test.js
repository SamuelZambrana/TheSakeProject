const { expect } = require("chai");
const { ethers } = require("hardhat");

let deployedSakiNFTS, deployedTheNewSakiPlace //Direccion desplegada del contrato ERC721 y del contrato del marketplace

let signer, owner //Direcciones signers(firmantes)

let tokenId = 0; value = 0;// Creamos e inicializamos el tokenId y el precio a 0

let tokenUri = "ipfs://QmV3kY4B8vTt9X4G1i3gLMwBhtZt6Csj878jEamZRXgwoi";


describe("TheNewSakiPlace contract", function () {

  it("Deploy Contract TheNewSakiPlace, Get Signers and balance of owner", async function () {
    // Obtener las direcciones de los firmantes para el contrato
    [owner, signer] = await ethers.getSigners();
    console.log("Owner Address: ", owner.address)
    console.log("Signer Address: ", signer.address)
    
    //Creamos la instancia del contrato y lo desplegamos pasandole los parametros al constructor
    //Despliegue contrato TheSakiNfts
    deployedSakiNFTS = await ethers.deployContract("TheSakiNFTs", ["MyNFT","MNFT", owner.address]);
    await deployedSakiNFTS.deployed();
    console.log("Contract Address TheSakiNFTs: ", deployedSakiNFTS.address);
    
     //Despliegue contrato TheNewSakiPLace
     deployedTheNewSakiPlace = await ethers.deployContract("TheNewSakiPlace", [deployedSakiNFTS.address]);
     await deployedTheNewSakiPlace.deployed();
     console.log("Contract Address TheNewSakiPlace: ", deployedTheNewSakiPlace.address);
     
    //Obtenemos el balance total de la direccion del owner, que es el que despliega el contrato
    //Balance owner contrato TheSakiNfts
    const ownerBalance = await deployedSakiNFTS.balanceOf(owner.address);
    expect(0).to.equal(ownerBalance);
    console.log("Balance of owner contrato TheSakiNfts: ", ownerBalance)  
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

  it("should allow listing an NFT", async function () {
    const listar= await deployedTheNewSakiPlace.connect(owner).listNFT(0, 100).ethers.utils.parseEther("1.0");

    /*
    const listing = await deployedTheNewSakiPlace.listings(tokenId);
    expect(listing.seller).to.equal(owner.address);
    expect(listing.price).to.equal(precio); */
  }); 

   /* it("Should allow the owner to create a sale", async function(){
        //Comprobar el estado inicial -> llamando a la funcion createSale y creando la venta
        const createSales = await deployedMarketPlaceContract.createSale(tokenId, price)
        //Verifica que la venta se haya creado correctamente y la buscamos en el mapping
        const sale = await deployedMarketPlaceContract.sales(tokenId);
        //Obtiene la información de la Creacion de la venta
        expect(sale.tokenId).to.equal(1);
        expect(sale.price).to.equal(100);
        expect(sale.owner).to.equal(signer.address);
        expect(sale.status).to.equal(0);   
    })

    it("should execute the buySale function correctly", async function () {
        //Realiza la compra de la venta
        await deployedMarketPlaceContract.buySale(saleId);
        //Verifica que la venta se haya creado correctamente y la buscamos en el mapping
        const sale = await deployedMarketPlaceContract.sales(tokenId);
        //Verifica que el estado de la venta sea "Executed"
        //Obtiene la información de la Creacion de la venta
        expect(sale.tokenId).to.equal(1);
        expect(sale.price).to.equal(100);
        expect(sale.owner).to.equal(signer.address);
        expect(sale.status).to.equal(1);  
        expect(sale.saleId).to.equal(1);
    });

    it("should fail if the buyer does not have enough MyCoin", async function () {
        //Muestra que el balance de MyCoin del comprador no es suficiente para realizar la compra
        const buyerBalance = await deployedERC20Contract.getBalance(signer.address);
        console.log(buyerBalance);
    });

    it("should return correct sale information for a valid sale ID", async function () {
        //Llamamos a la función getSale con un tokenID existente
        tokenId = 2; // ID del token
        try {
            const saleInfo = await deployedMarketPlaceContract.getSale(tokenId);
            // Continúa con el código si no hay errores
            expect(saleInfo).to.equal(1)
            //Comprobamos que el ID de venta no existe
            const invalidSaleId = 0;
            await expect(deployedMarketPlaceContract.getSale(invalidSaleId)).to.be.revertedWith("TokenId does not exist");
        } catch (error) {
            console.error("La venta no existe: ", error.message);
            //Comprobamos si el ID del tokenID coincide con el valor esperado
        
        }
    }); */
}) 