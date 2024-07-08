import { ethers } from "ethers";
require("dotenv").config({ path: ".env" }); 
/*
Conexion proovedor ethereum con metamask
Obetener balance de cuenta conectada
Obtener datos de la red que nos conectamos
*/

let address, provider, signer, contractRead, contractWrite

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

    console.log(address)
}

const getNativeBalance = async () => {
    console.log("")
    console.log("getNativeBalance")
    console.log("")

    const balance = await provider.getBalance(address)
    const formattedBalance = ethers.utils.formatEther(balance)

    console.log(balance)
    console.log(formattedBalance)
}

const getNetwork = async () => {
    console.log("")
    console.log("getNetwork")
    console.log("")

    const network = await provider.getNetwork();

    console.log(network)
    console.log(network.chainId)
    console.log(network.name)
}

//Para crear una instancia de un contrato y poder atacarlo son necesarias tres partes
// 1- Provider/Signer, porque necesitamos una conexion con la blockchain
// 2- Contract Address, porque una referencia de donde atacar en la blockchain
// 3- Contract ABI (Application Binary Interface), porque necesitamos lo que puede hacer el contrato

//Datos Contrato para formatear su ABI y que esten disponibles sus funcionalidades 
let contractAddress = "0x317944f299faFe35D6Bdd17295BD1F2beA3759fc" 

import ContractABI from "./artifacts/contracts/TheNewSakiPlace.sol/TheNewSakiPlace.json";
const ContractInterface = new ethers.utils.Interface(ContractABI.abi)
const ContractABIFormatted = ContractInterface.format(ethers.utils.FormatTypes.full)

//Iteratuamos con las funciones del contrato creando una instancia 
const getBalance = async () => {
    //Creamos una nueva instancia del contrato para poder iteractuar con sus funcionalidades
    contractRead = new ethers.Contract(contractAddress,ContractABIFormatted,provider)
    const balance = await contractRead.getBalance(address)
    console.log(balance)

    const decimals = await contractRead.decimals()
    const formattedBalance = ethers.utils.formatUnits(balance,decimals)

    console.log(formattedBalance)
}

//Relacionanos el ID del boton que creamos en el index.html con las funciones que hemos creado
const metamaskButton = document.getElementById("metamaskButton")
metamaskButton.addEventListener("click", async () =>{
    console.log("Hola, soy el boton Connect Metamask y esta es tu address:")
    await connectMetamask()
    await getNativeBalance()
    await getNetwork()
    await getBalance()
})


