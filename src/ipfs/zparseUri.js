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

  const ipfsUriMeta = "ipfs://QmeFbLGuikzfyo3ptjG3E2aHY6XDeLxrXNK1Fe83h3i7G2";
  const urlMeta = parseIpfsUri(ipfsUriMeta);

  console.log("IPFS URL Image:", urlImage);
  console.log("IPFS URL Metadata:", urlMeta);
}

main();