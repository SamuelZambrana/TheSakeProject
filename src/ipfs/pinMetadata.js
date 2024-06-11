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
    name: "Sleepy Cat",
    description: "NFT minted for The Saki Project",
    attributes: [
      {
        trait_type: "Rarity",
        value: "Rarest",
      },
    ],
  };
  const uri = await pinNftMetadataToIpfs(mediaPath, metadata);
  console.log("NFT metadata pinned at:", uri);

  const mediaPath2 = "images/bcnCat.jpg";
  const metadata2 = {
    name: "BCN Cat",
    description: "NFT minted for The Saki Project",
    attributes: [
      {
        trait_type: "Rarity",
        value: "Rarest",
      },
    ],
  };
  const uri2 = await pinNftMetadataToIpfs(mediaPath2, metadata2);
  console.log("NFT metadata pinned at:", uri2);
}

main();