const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TheSakiNFTs Test Suite", function () {

    let initialOwner;
    let deployedERC721Contract;
    let otherAccount;

    // Obtenemos las cuentas de usuario con las que se ejecutan las pruebas.
    before(async function(){
        [initialOwner, otherAccount] = await ethers.getSigners();
    });

    // Despliegue del contrato TheSakiNFTs y espera a que se complete el despliegue.
    it("Deploy Contract", async function(){
        // Obtenemos el contrato
        const ERC721Contract = await ethers.getContractFactory("TheSakiNFTs", initialOwner);
        // Desplegamos el contrato pasándole los parámetros del constructor
        deployedERC721Contract = await ERC721Contract.deploy("MyNFT", "MNFT", initialOwner.address);
        // Esperamos a que se complete el despliegue.
        await deployedERC721Contract.deployed();

        // Verificamos que el contrato está desplegado y que initialOwner es el propietario
        expect(await deployedERC721Contract.owner()).to.equal(initialOwner.address);
    });

    // Test para verificar la minting de un NFT
    it("Mint NFT", async function() {
        const tokenUri = "ipfs://example-uri";
        const tx = await deployedERC721Contract.safeMint(initialOwner.address, tokenUri);
        const receipt = await tx.wait();
        const event = receipt.events.find(e => e.event === "Transfer");
        const tokenId = event.args.tokenId.toNumber();

        // Verificamos que el NFT se mintió y se asignó correctamente
        expect(await deployedERC721Contract.ownerOf(tokenId)).to.equal(initialOwner.address);
        expect(await deployedERC721Contract.tokenURI(tokenId)).to.equal(tokenUri);
    });

    // Test para verificar la transferencia de un NFT
    it("Transfer NFT", async function() {
        const tokenUri = "ipfs://example-uri";
        const tx = await deployedERC721Contract.safeMint(initialOwner.address, tokenUri);
        const receipt = await tx.wait();
        const event = receipt.events.find(e => e.event === "Transfer");
        const tokenId = event.args.tokenId.toNumber();

        await deployedERC721Contract['safeTransferFrom(address,address,uint256)'](initialOwner.address, otherAccount.address, tokenId);

        // Verificamos que el NFT se transfirió correctamente
        expect(await deployedERC721Contract.ownerOf(tokenId)).to.equal(otherAccount.address);
    });
});


