// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.19;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

interface TheSakiNFTs is ERC721 {

    function safeMint(address to, string memory tokenUri) public onlyOwner returns (uint256);
    
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory);
 
}

