const Pinata = require("@pinata/sdk");
const { http, createPublicClient, createWalletClient } = require("viem");
const { polygonMumbai } = require("viem/chains");
const { privateKeyToAccount } = require("viem/accounts");
const { NFTStorage } = require("nft.storage");

const IPFS_PREFIX = "ipfs://";

const pinata = new Pinata({ pinataJWTKey: process.env.PINATA_JWT_KEY });
const nftStorage = new NFTStorage({ token: process.env.NFT_STORAGE_TOKEN || "", });

const clientParams = {
  chain: polygonMumbai,
  transport: http(),
};

const publicClient = createPublicClient(clientParams);
const walletClient = createWalletClient(clientParams);

const account = privateKeyToAccount(
  (process.env.PRIVATE_KEY || "0x" + "0".repeat(64))
);

module.exports = {
  IPFS_PREFIX,
  pinata,
  nftStorage,
  publicClient,
  walletClient,
  account,
};

