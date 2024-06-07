const { IPFS_PREFIX, pinata } = require("../configuration/config");
const fs = require("fs");

// Function to pin image, filePath is the image itself
async function pinFileToIpfs(filePath) {
  const readableStreamForFile = fs.createReadStream(filePath);
  const fileName = filePath.split("/").pop() || filePath;
  const options = { pinataMetadata: { name: fileName } };
  // We put the pinned file in the variable result, and we return ipfs://+hash
  const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
  return IPFS_PREFIX + result.IpfsHash;
}

// In main we pass the path to the function "pinFileToIpfs()"
async function main() {
  const filePath = "images/kittyCat.jpg";
  /*const filePath2 = "qwedwdw.jpg";
  const filePath3 = "qwedwdw.jpg";*/

  const uri = await pinFileToIpfs(filePath);
  console.log("IPFS URI:", uri);
}

main();
