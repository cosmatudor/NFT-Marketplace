// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTMarketplace is ERC721URIStorage {
    /* Events */
    event MarketItemCreated(
        uint indexed tokenId,
        address indexed seller,
        address indexed owner,
        uint price, 
        bool sold
    );

    event TokenSelled(
        uint indexed tokenId,
        address indexed seller,
        address indexed buyer,
        uint price
    );

    /* State Variables */
    uint private _nextTokenId;

    uint private _soldItems;

    uint private listingPrice = 0.0005 ether;

    address public owner;

    mapping(uint => MarketItem) private idToMarketItem;

    struct MarketItem {
        uint tokenId;
        address payable seller;
        address payable owner;
        uint price;
        bool sold;
    }


    constructor() ERC721("CosmicItems", "CIT") {
        owner = payable(msg.sender);
    }

    // --- NFT CREATION ---
    function createToken(string memory _tokenURI, uint price) public payable returns (uint) {
        uint tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        addMarketItem(tokenId, price);
        
        return tokenId;
    }

    function addMarketItem(uint _tokenId, uint _price) private checkSentEthForListing {
        require(_price > 0, "NFTMarketplace: Price must be greater than 0");

        idToMarketItem[_tokenId] = MarketItem(
            _tokenId,
            payable(msg.sender),
            payable(address(this)),
            _price,
            false
        );

        _transfer(msg.sender, address(this), _tokenId);

        emit MarketItemCreated(_tokenId, msg.sender, address(this), _price, false);
    }


    // SELLING & BUYING
    function executeSale(uint _tokenId) public payable {
        require(idToMarketItem[_tokenId].sold == false, "NFTMarketplace: Item not for sale");
        uint _price = idToMarketItem[_tokenId].price;
        require(msg.value == _price, "NFTMarketplace: Please submit the asking price");

        address _previousSeller = idToMarketItem[_tokenId].seller;

        idToMarketItem[_tokenId].sold = true;
        idToMarketItem[_tokenId].seller = payable(address(0));
        idToMarketItem[_tokenId].owner = payable(msg.sender);

        _soldItems++;

        _transfer(address(this), msg.sender, _tokenId);

        (bool success, ) = owner.call{value: listingPrice}("");
        require(success, "NFTMarketplace: Transaction did not go through");

        (bool success2, ) = _previousSeller.call{value: msg.value}("");
        require(success2, "NFTMarketplace: Transaction did not go through");

        emit TokenSelled(_tokenId, _previousSeller, msg.sender, msg.value);
    }
    
    function listToken(uint _tokenId, uint _price) public payable checkSentEthForListing{
        require(idToMarketItem[_tokenId].owner == msg.sender, "NFTMarketplace: Only item owner can perform this operation");
        
        idToMarketItem[_tokenId].price = _price;
        idToMarketItem[_tokenId].owner = payable(address(this));
        idToMarketItem[_tokenId].seller = payable(msg.sender);
        idToMarketItem[_tokenId].sold = false;
        
        unchecked {
            _soldItems--;
        }

        _transfer(msg.sender, address(this), _tokenId);
    }


    // FETCHING DATA
    function getUnsoldTokens() public view returns(MarketItem[] memory) {
        uint itemCount = _nextTokenId;
        uint unsoldItemCount = itemCount - _soldItems;
        MarketItem[] memory items = new MarketItem[](unsoldItemCount);

        uint index = 0;
        for (uint i = 0; i < itemCount; i++) {
            if (idToMarketItem[i].owner == address(this)) {
                items[index] = idToMarketItem[i];
                index++;
            }
        }
        return items;
    }

    function getOwnerUnlistedTokens() public view returns (MarketItem[] memory) {
        uint itemCount = _nextTokenId;
        MarketItem[] memory ownerItems = new MarketItem[](itemCount);
        
        uint itemCnt = 0; // Counter for items owned by msg.sender
        
        for (uint i = 0; i < itemCount; i++) {
            if (idToMarketItem[i].owner == msg.sender) {
                ownerItems[itemCnt] = idToMarketItem[i];
                itemCnt++;
            }
        }
        
        // Resize the ownerItems array to the actual number of owner items
        assembly {
            mstore(ownerItems, itemCnt)
        }
        
        return ownerItems;
    }


    function getOwnerListedTokens() public view returns (MarketItem[] memory) {
        uint itemCount = _nextTokenId;
        MarketItem[] memory ownerItems = new MarketItem[](itemCount);
        
        uint listedItemCnt = 0; // Counter for items listed by msg.sender
        
        for (uint i = 0; i < itemCount; i++) {
            if (idToMarketItem[i].seller == msg.sender) {
                ownerItems[listedItemCnt] = idToMarketItem[i];
                listedItemCnt++;
            }
        }
        
        // Resize the ownerItems array to the actual number of owner items
        assembly {
            mstore(ownerItems, listedItemCnt)
        }
        
        return ownerItems;
    }


    /* Setter */
    function updateListingPrice(uint _listingPrice) public onlyOwner {
        listingPrice = _listingPrice;
    }


    /* Getters */
    function getListingPrice() public view returns(uint) {
        return listingPrice;
    }

    function getTotalMarketItems() public view returns(uint) {
        return _nextTokenId;
    }


    /* Modifiers */
    modifier onlyOwner {
        require(msg.sender == owner, "NFTMarketplace: Only owner is permitted");
        _;
    }

    modifier checkSentEthForListing {
        require(msg.value >= listingPrice, "NFTMarketplace: Market listing fee is higher");
        _;
    }
}
