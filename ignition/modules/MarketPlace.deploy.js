const hre = require("hardhat");

//const ERC20DeployScript = require("./ERC20.deploy")
const ERC721DeployScript = require("./MyNFTModule")

let deployedMarketPlaceContract
let contractAddress

async function deploy(){
    console.log("MarketPlace deployment has just started...")
    const marketPlaceContract = await ethers.getContractFactory("MarketPlace")
    //Obtenemos las direcciones de ambos contratos para el despliegue el marketPlace
    //let ERC20ContractAddress = await ERC20DeployScript.getContractAddress()
    let ERC721ContractAddress = await ERC721DeployScript.getContractAddress()
    // Pasa las direcciones de los contratos como parámetros al contrato de MarketPlace
    deployedMarketPlaceContract = await marketPlaceContract.deploy(ERC721ContractAddress)
    await deployedMarketPlaceContract.waitForDeployment()
    contractAddress = deployedMarketPlaceContract.target
    console.log("...MarketPlace constract has been deployed to: " + contractAddress)
}

async function verify(){}

async function getContractAddress(){
    return contractAddress
}

module.exports = {deploy,verify,getContractAddress}