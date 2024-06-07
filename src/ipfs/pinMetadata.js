const { IPFS_PREFIX, pinata } = require("../configuration/config");
const { pinFileToIpfs } = require("../configuration/ipfs");

//function to pin metadata that we describe in main()
async function pinJsonToIpfs(metadata) {
  const options = { pinataMetadata: { name: "metadata.json" } }; 
  const result = await pinata.pinJSONToIPFS(metadata, options);
  return IPFS_PREFIX + result.IpfsHash
}

async function pinNftMetadataToIpfs(mediaPath, metadata) {
  const mediaUri = await pinFileToIpfs(mediaPath);
  const updatedMetadata = { ...metadata, image: mediaUri };
  const metadataUri = await pinJsonToIpfs(updatedMetadata)
  return  metadataUri
}

async function main() {
  const mediaPath = "images/kittyCat.jpg";
  const metadata = {
    name: "Tales From The Alchemist NFT",
    description: "NFT minted on testnet",
    attributes: [
      {
        trait_type: "Rarity",
        value: "Rarest",
      },
    ],
  };
  const uri = await pinNftMetadataToIpfs(mediaPath, metadata);
  console.log("NFT metadata pinned at:", uri);
}

main();