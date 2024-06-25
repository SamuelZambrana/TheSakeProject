const { ethers } = require("ethers");
require("dotenv").config();

async function main() {
    const contractAddress = process.env.CONTRACT_ADDRESS;
    const privateKey = process.env.PRIVATE_KEY;
    const provider = new ethers.providers.InfuraProvider("sepolia", process.env.INFURA_API_KEY);
    const wallet = new ethers.Wallet(privateKey, provider);

    //we need the abi of the compiled contract
    const SakiPlaceArtifact = require("./artifacts/contracts/SakiPlace.sol/SakiPlace.json"); 
    const SakiPlaceFactory = new ethers.ContractFactory(SakiPlaceArtifact.abi, SakiPlaceArtifact.bytecode, wallet);

    const sakiPlace = await SakiPlaceFactory.deploy(contractAddress);

    await sakiPlace.deployed();

    console.log("SakiPlace deployed to:", sakiPlace.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

    //we had some problems with ignition module, thats why we used this script
