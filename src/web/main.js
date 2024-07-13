//import ContractABI from "/artifacts/contracts/TheNewSakiPlace.sol/TheNewSakiPlace.json";

/*
Conexion proovedor ethereum con metamask
Obetener balance de cuenta conectada
Obtener datos de la red que nos conectamos
*/

let address, provider, signer, contractRead, contractWrite

const connectMetamask = async () => {
    try {
        // A Web3Provider wraps a standard Web3 provider, which is what MetaMask injects as window.ethereum into each page
        provider = new ethers.providers.Web3Provider(window.ethereum);
        // MetaMask requires requesting permission to connect users accounts
        await provider.send("eth_requestAccounts", []);
        // The MetaMask plugin also allows signing transactions to send ether and pay to change state within the blockchain.
        // For this, you need the account signer...
        signer = provider.getSigner();
        address = await signer.getAddress();    
        console.log("Conectado con la dirección:", address);
    } catch (error) {
        console.error("Error al conectar con Metamask:", error);
    }
}

const getNativeBalance = async () => {
    console.log("\ngetNativeBalance\n");

    try {
        const balance = await provider.getBalance(address);
        const formattedBalance = ethers.utils.formatEther(balance);

        console.log(balance);
        console.log(formattedBalance);
    } catch (error) {
        console.error("Error al obtener el balance nativo:", error);
    }
}

const getNetwork = async () => {
    console.log("\ngetNetwork\n");

    try {
        const network = await provider.getNetwork();

        console.log(network);
        console.log(network.chainId);
        console.log(network.name);
    } catch (error) {
        console.error("Error al obtener la red:", error);
    }
}

//Para crear una instancia de un contrato y poder atacarlo son necesarias tres partes
// 1- Provider/Signer, porque necesitamos una conexion con la blockchain
// 2- Contract Address, porque una referencia de donde atacar en la blockchain
// 3- Contract ABI (Application Binary Interface), porque necesitamos lo que puede hacer el contrato


//Datos Contrato para formatear su ABI y que esten disponibles sus funcionalidades 

/*
const contractAddress = process.env.SP_CONTRACT_ADDRESS;
const ContractInterface = new ethers.utils.Interface(ContractABI.abi)
const ContractABIFormatted = ContractInterface.format(ethers.utils.FormatTypes.full)
/*

//Iteratuamos con las funciones del contrato creando una instancia 
/*
const buyNFT = async () => {
    //Creamos una nueva instancia del contrato para poder iteractuar con sus funcionalidades
    contractRead = new ethers.Contract(contractAddress,ContractABIFormatted,provider)
    const buy = await contractRead.buyNFT(0, 1)
    console.log(buy)

    const decimals = await contractRead.decimals()
    const formattedBalance = ethers.utils.formatUnits(buy,decimals)

    console.log(formattedBalance)
}
*/

const metamaskButton = document.getElementById("metamaskButton");
metamaskButton.addEventListener("click", async () => {
    console.log("Conectando a Metamask...");
    await connectMetamask();
    await getNativeBalance();
    await getNetwork();
});

/*const comprarButton = document.getElementById("Comprar");
comprarButton.addEventListener("click", async () => {
    console.log("Conectando a Metamask...");
    await buyNFT();
}); 
*/