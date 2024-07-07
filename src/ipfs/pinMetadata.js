const { IPFS_PREFIX, pinata } = require("./config");
//const { pinFileToIpfs } = require("../ipfs/pinFile");

//function to pin metadata that we describe in main()
/*async function pinJsonToIpfs(metadata) {
  const options = { pinataMetadata: { name: "metadata.json" } }; 
  const result = await pinata.pinJSONToIPFS(metadata, options);
  return IPFS_PREFIX + result.IpfsHash
}*/

//Funcio del gepeto per asociar image to metadata
async function pinMetadataWithImageUri(imageUri, metadata) {
  const updatedMetadata = { ...metadata, image: imageUri };
  const options = { pinataMetadata: { name: 'metadata.json' } };

  try {
    const result = await pinata.pinJSONToIPFS(updatedMetadata, options);
    return IPFS_PREFIX + result.IpfsHash;
  } catch (error) {
    console.error('Error pinning metadata to IPFS:', error);
    throw error;
  }
}

module.exports = { pinMetadataWithImageUri };

async function main() {
  /*const mediaPath = "ipfs://QmXVoFLmJTkFJz9qVsTRdJJpZxoL6JNMwc74NVw3mXDF52";   //uri of the picture
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
  const uri = await pinMetadataWithImageUri(mediaPath, metadata);
  console.log("NFT metadata pinned at:", uri);

  const mediaPath2 = "ipfs://QmRYdk9q6SHncsvZZU9C5dQCm3AMnnaReeopbzbYyGzvNe";  //uri of the picture
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
  const uri2 = await pinMetadataWithImageUri(mediaPath2, metadata2);
  console.log("NFT metadata pinned at:", uri2);

  const mediaPath3 = "ipfs://QmS26ZzeGbsVmcRgjZLQvBKv89WibJkzWjmqpNahheF49d";  //uri of the picture
  const metadata3 = {
    name: "Angel Cat",
    description: "NFT minted for The Saki Project",
    attributes: [
      {
        trait_type: "Rarity",
        value: "Rarest",
      },
    ],
  };
  const uri3 = await pinMetadataWithImageUri(mediaPath3, metadata3);
  console.log("NFT metadata pinned at:", uri3);*/

  const mediaPath4 = "ipfs://QmNwiDpSdL5jtRHgZC4zMSGrKHZ8BHhz1P1EBZYmCLgKff";  //uri of the picture
  const metadata4 = {
    name: "Test Draw",
    description: "NFT minted for The Saki Project as a Test to sell",
    attributes: [
      {
        trait_type: "Rarity",
        value: "Rarest",
      },
    ],
  };
  const uri4 = await pinMetadataWithImageUri(mediaPath4, metadata4);
  console.log("NFT metadata pinned at:", uri4);
  
}

main();