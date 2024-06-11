const IPFS_PREFIX = "ipfs://";

function parseIpfsUri(uri, providerPrefix = "https://ipfs.io/ipfs/") {
  if (!uri.startsWith(IPFS_PREFIX)) {
    return null;
  }
  return providerPrefix + uri.slice(IPFS_PREFIX.length);
}

async function main() {

  const ipfsUriImage = "ipfs://QmXVoFLmJTkFJz9qVsTRdJJpZxoL6JNMwc74NVw3mXDF52";
  const urlImage = parseIpfsUri(ipfsUriImage);
  const ipfsUriImage2 = "ipfs://QmRYdk9q6SHncsvZZU9C5dQCm3AMnnaReeopbzbYyGzvNe";
  const urlImage2 = parseIpfsUri(ipfsUriImage2);

  const ipfsUriMeta = "ipfs://QmV3kY4B8vTt9X4G1i3gLMwBhtZt6Csj878jEamZRXgwoi";
  const urlMeta = parseIpfsUri(ipfsUriMeta);
  const ipfsUriMeta2 = "ipfs://QmdJ4MF8abq466wXCoq6Jek5LqoQLvPAhx1nbqvE3rCxfB";
  const urlMeta2 = parseIpfsUri(ipfsUriMeta2);

  console.log("IPFS URL Image:", urlImage);
  console.log("IPFS URL Metadata:", urlMeta);

  console.log("----------------------")

  console.log("IPFS URL Image", urlImage2)
  console.log("IPFS URL Metadata:", urlMeta2);
}

main();