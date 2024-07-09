import { ethers } from "ethers";
require("dotenv").config({ path: ".env" }); 
const TheNewSakiPlaceArtifact = require('./artifacts/contracts/TheNewSakiPlace.sol/TheNewSakiPlace.json');

const connectMetamask = async () => {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    provider = new ethers.providers.Web3Provider(window.ethereum)
    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    signer = provider.getSigner()
    address = await signer.getAddress()    
    // console.log(address)
}


document.addEventListener("DOMContentLoaded", function() {
    const buyButton = document.getElementById("Comprar");
    if (buyButton) {
        buyButton.addEventListener("click", async function() {
            const tokenId = this.getAttribute("data-token-id");

            if (!tokenId) {
                alert("Token ID no encontrado");
                return;
            }
            
            if (typeof window.ethereum !== "undefined") {
                try {
                    // Ask connection to MetaMask
                    await window.ethereum.request({ method: "eth_requestAccounts" });

                    // Provider & Signer
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();

                    // Dirección y ABI del contrato
                    const contractAddress = process.env.SP_CONTRACT_ADDRESS;
                    const abi = TheNewSakiPlaceArtifact.abi;

                    // Instance of the contract
                    const contract = new ethers.Contract(contractAddress, abi, signer);

                    const price = ethers.utils.parseEther("0.01"); // Price in ethers

                    // We call the function "buyNFT"
                    const tx = await contract.buyNFT(tokenId, { value: price });
                    await tx.wait();

                    // Confirmation
                    alert("NFT comprado con éxito!");
                } catch (error) {
                    console.error(error);
                    alert("Error al comprar el NFT");
                }
            } else {
                alert("Por favor, instale MetaMask");
            }
        });
    }
});

const metamaskButton = document.getElementById("metamaskButton")
metamaskButton.addEventListener("click", async () =>{
    console.log("Esta es tu address:")
    await connectMetamask()
})