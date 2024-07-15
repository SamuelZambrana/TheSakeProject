let provider;
let signer;
let address;

const connectMetamask = async () => {
    try {
        console.log("Iniciando conexión a MetaMask...");
        provider = new ethers.providers.Web3Provider(window.ethereum);

        if (!window.ethereum) {
            alert("MetaMask no está instalado. Por favor, instálalo para usar esta aplicación.");
            return;
        }

        const accounts = await provider.send("eth_requestAccounts", []);
        console.log("Cuentas conectadas:", accounts);

        await provider.send("wallet_requestPermissions", [{
            eth_accounts: {}
        }]);

        signer = provider.getSigner();
        address = await signer.getAddress();
        console.log("Conectado con la dirección:", address);
    } catch (error) {
        console.error("Error al conectar con MetaMask:", error);
    }
}

const buyNFT = async (tokenId, price) => {
    try {
        const CONTRACT_ABI = [
            {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "nftAddress",
                    "type": "address"
                  }
                ],
                "stateMutability": "nonpayable",
                "type": "constructor"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "ListingCanceled",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                  }
                ],
                "name": "NFTListed",
                "type": "event"
              },
              {
                "anonymous": false,
                "inputs": [
                  {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "indexed": true,
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                  },
                  {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                  }
                ],
                "name": "NFTPurchased",
                "type": "event"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                  }
                ],
                "name": "buyNFT",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  }
                ],
                "name": "cancelListing",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                  },
                  {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                  }
                ],
                "name": "listNFT",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
              {
                "inputs": [
                  {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                  }
                ],
                "name": "listings",
                "outputs": [
                  {
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              },
              {
                "inputs": [],
                "name": "theSakiNFTs",
                "outputs": [
                  {
                    "internalType": "contract ITheSakiNFTs",
                    "name": "",
                    "type": "address"
                  }
                ],
                "stateMutability": "view",
                "type": "function"
              }
        ];
        const SP_CONTRACT_ADDRESS = "0xdb980d6ce6a25322d6DE84b3e26BA3a8b672e73D";
        const priceInEther = ethers.utils.parseUnits(price.toString(), "wei");
        const contract = new ethers.Contract(SP_CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const tx = await contract.buyNFT(tokenId, { value: priceInEther });
        await tx.wait();
        console.log("Transacción completada:", tx);
    } catch (error) {
        console.error("Error al comprar el NFT:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const metamaskButton = document.getElementById("metamaskButton");
    metamaskButton.addEventListener("click", async () => {
        console.log("Conectando a MetaMask...");
        await connectMetamask();
    });

    const comprarButton = document.getElementById("Comprar");
    comprarButton.addEventListener("click", async () => {
        const tokenId = comprarButton.getAttribute("data-token-id");
        const price = ethers.utils.parseEther(comprarButton.getAttribute("data-token-price"));
        console.log("Comprando NFT con ID:", tokenId, "y precio:", price.toString());
        await buyNFT(tokenId, price);
    });
});

