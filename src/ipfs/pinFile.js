const { IPFS_PREFIX, pinata } = require("./config");
const fs = require("fs");

// Function to pin image, filePath is the image itself
async function pinFileToIpfs(filePath) {
  const readableStreamForFile = fs.createReadStream(filePath);
  const fileName = filePath.split("/").pop() || filePath;
  const options = { pinataMetadata: { name: fileName } };
  
  try {
    // Llama a `pinFileToIPFS` con las opciones correctas
    const result = await pinata.pinFileToIPFS(readableStreamForFile, options);
    return IPFS_PREFIX + result.IpfsHash;
  } catch (error) {
    console.error("Error pinning file to IPFS:", error);
    throw error; // Asegúrate de lanzar el error para que se pueda manejar en `main`
  }
}

// In main we pass the path to the function "pinFileToIpfs()"
async function main() {

  const kittyCat = "images/kittyCat.jpg";
  const bcnCat = "images/bcnCat.jpg";
  const angelCat = "images/angelCat.jpg";
  const testDraw = "images/testDraw.jpg";

  try {

   /* const uri1 = await pinFileToIpfs(kittyCat);
    console.log("IPFS URI:", uri1);

    const uri2 = await pinFileToIpfs(bcnCat);
    console.log("IPFS URI:", uri2);

    const uri3 = await pinFileToIpfs(angelCat);
    console.log("IPFS URI:", uri3);*/

    const uri4 = await pinFileToIpfs(testDraw);
    console.log("IPFS URI:", uri4);

  } catch (error) {
    console.error("Error in main function:", error);
  }
}

main();




