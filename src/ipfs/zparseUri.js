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

  const ipfsUriImage3 = "ipfs://QmS26ZzeGbsVmcRgjZLQvBKv89WibJkzWjmqpNahheF49d";
  const urlImage3 = parseIpfsUri(ipfsUriImage3);


  const ipfsUriMeta = "ipfs://QmV3kY4B8vTt9X4G1i3gLMwBhtZt6Csj878jEamZRXgwoi";
  const urlMeta = parseIpfsUri(ipfsUriMeta);

  const ipfsUriMeta2 = "ipfs://QmdJ4MF8abq466wXCoq6Jek5LqoQLvPAhx1nbqvE3rCxfB";
  const urlMeta2 = parseIpfsUri(ipfsUriMeta2);

  const ipfsUriMeta3 = "ipfs://QmY2JNUZprVtkXvRVdHaRZkCEfAhMfowQcb4vuBNsMaLWx";
  const urlMeta3 = parseIpfsUri(ipfsUriMeta3);

  console.log("IPFS URL Sleppy Cat:", urlImage);
  console.log("IPFS URL Metadata:", urlMeta);

  console.log("----------------------")

  console.log("IPFS URL BCN Cat", urlImage2)
  console.log("IPFS URL Metadata:", urlMeta2);

  console.log("----------------------")

  console.log("IPFS URL Angle Cat", urlImage3)
  console.log("IPFS URL Metadata:", urlMeta3);
}

main();