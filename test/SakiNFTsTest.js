const { expect } = require("chai");

// Define el conjunto de pruebas para el contrato MyNFTCollection
describe("TheSakiNFTs Test Suite", function () {

    // Variables globales para almacenar la instancia del contrato desplegado y las cuentas de usuario.
    let initialOwner = process.env.PRIVATE_KEY
    let deployedERC721Contract
    let otherAccount

    // Despliegue del contrato MyNFTCollection y espera a que se complete el despliegue.
    it("Deploy Contract", async function(){
        // Obtenemos el contrato
        const ERC721Contract = await ethers.getContractFactory("TheSakiNFTs")
        // Desplegamos el contrato pasandole los parametros del constructor
        deployedERC721Contract = await ERC721Contract.deploy("MyNFT","MNFT", initialOwner)
        // Esperamos a que se complete el despliegue.
        await deployedERC721Contract.waitForDeployment()
    })

    // Obtenemos las cuentas de usuario con las que se ejecutran las pruebas.
    it("Get Signers", async function(){
        [initialOwner,otherAccount] = await ethers.getSigners()
    })

    

})