let provider;
let signer;
let address;

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

const metamaskButton = document.getElementById("metamaskButton");
metamaskButton.addEventListener("click", async () => {
    console.log("Conectando a Metamask...");
    await connectMetamask();
});
