require("dotenv").config();

const Pinata = require("@pinata/sdk");
const IPFS_PREFIX = "ipfs://";

const pinata = new Pinata({ pinataJWTKey: process.env.PINATA_API_KEY });

module.exports = {
  IPFS_PREFIX,
  pinata,
};


