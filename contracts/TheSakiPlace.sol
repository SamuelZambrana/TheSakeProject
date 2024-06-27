// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.19;

import "../contracts/ITheSakiNFTs.sol";

contract TheSakiPlace {

    struct Listing {
        address seller;
        uint256 price;
    }

    ITheSakiNFTs public theSakiNFTs;

    // Mapping from token ID to Listing
    mapping(uint256 => Listing) public listings;

    //indexed for the events, to fix them and be easier to find
    event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event NFTPurchased(uint256 indexed tokenId, address indexed buyer, uint256 price);
    event ListingCanceled(uint256 indexed tokenId);

    constructor(address nftAddress) {
        theSakiNFTs = ITheSakiNFTs(nftAddress);
    }

    function listNFT(uint256 tokenId, uint256 _price) public {
        require(theSakiNFTs.ownerOf(tokenId) == msg.sender, "Only the owner can list the NFT");
        require(theSakiNFTs.isApprovedForAll(msg.sender, address(this)) || theSakiNFTs.getApproved(tokenId) == address(this), "Marketplace not approved");

        listings[tokenId] = Listing({
            seller: msg.sender,
            price: _price
        });

        emit NFTListed(tokenId, msg.sender, _price);
    }

    function buyNFT(uint256 tokenId) public payable {

        Listing memory listing = listings[tokenId];
        uint256 price = listing.price;
        require(price > 0, "NFT not listed for sale");
        require(msg.value == price, "Incorrect price, please introduce the exact amount");

        delete listings[tokenId];

        //swamp of nft for ethers
        theSakiNFTs.safeTransferFrom(listing.seller, msg.sender, tokenId);
        (bool success, ) = listing.seller.call{value: msg.value}("");
        require(success, "Transfer failed");

        emit NFTPurchased(tokenId, msg.sender, listing.price);
    }

    function cancelListing(uint256 tokenId) public {
        Listing memory listing = listings[tokenId];
        require(listing.seller == msg.sender, "Only the seller can cancel the listing");

        delete listings[tokenId];

        emit ListingCanceled(tokenId);
    }
}
