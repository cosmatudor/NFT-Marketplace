import React, { useState, useEffect, useContext } from 'react'
import Web3Modal from "web3modal";
import { ethers } from 'ethers';
import { useRouter } from "next/router";
import axios from 'axios';
import { create as ipfsHttpClient } from 'ipfs-http-client';

import { NFTMarketplaceAddress, NFTMarketplaceABI } from './constants';


// --FETCH & CONNECTING WITH SMART CONTRACT--
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(
        NFTMarketplaceAddress,
        NFTMarketplaceABI,
        signerOrProvider
    );

const connectWithContract = async () => {
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();

        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        console.log("SIGNER: " + signer.address)
        const contract = fetchContract(signer);
        return contract;
    } catch (error) {
        console.log("Error: " + error);
    }
}

export const NFTMarketplaceContext = React.createContext();

export const NFTMarketplaceProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const router = useRouter();

    const checkIfWalletIsConnected = async () => {
        try {
            if (!window.ethereum) {
                console.log("Make sure you have metamask!");
            }
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No authorized account found");
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                console.log("Make sure you have metamask!");
            }
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
            console.log(currentAccount)
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    const uploadToPinataIPFS = async (file) => {
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const response = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `ff73f66fb9e9b6edaec7`,
                        pinata_secret_api_key: `
                        19728ad194ed57651a79aba23a081d43d892f566b0e416ecedbea3bcfebb5f25`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;

                return ImgHash;
            } catch (error) {
                console.log("Unable to upload image to Pinata");
            }
        }
    }

    const createNFT = async (name, price, image, description, router) => {
        if (!name || !description || !price || !image) {
            console.log("Please fill all the fields");
            console.log("name: " + name);
            console.log("price: " + price);
            console.log("image: " + image);
            console.log("description: " + description);
        }
        else {
            console.log("PULA")

            const data = JSON.stringify({ name, description, image });

            try {
                const response = await axios({
                    method: "POST",
                    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
                    data: data,
                    headers: {
                        pinata_api_key: `ff73f66fb9e9b6edaec7`,
                        pinata_secret_api_key: `
                    19728ad194ed57651a79aba23a081d43d892f566b0e416ecedbea3bcfebb5f25`,
                        "Content-Type": "application/json",
                    },
                });

                const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
                console.log(url);

                await createSale(url, price);
            } catch (error) {
                console.log("Error: " + error);
            }
        }
    }

    const createSale = async (url, price, isResell, id) => {
        try {
            const formattePrice = ethers.parseUnits(price, "ether");
            const contract = await connectWithContract();

            const listingPrice = await contract.getListingPrice();

            const txn = !isResell ?
                await contract.createToken(url, formattePrice, { value: listingPrice })
                :
                await contract.listToken(id, formattePrice, { value: listingPrice });

            await txn.wait();
            console.log(txn);
            router.push("/collection");

        } catch (error) {
            console.log("Error: " + error);
        }
    }

    const fecthNFTs = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.BrowserProvider(connection);

            const contract = fetchContract(provider);

            const data = await contract.getUnsoldTokens();
            console.log("data: " + data)

            const items = await Promise.all(
                data.map(
                    async ({ tokenId, seller, owner, price }) => {
                        const tokenURI = await contract.tokenURI(tokenId);
                        console.log("tokenURI: " + tokenURI)

                        const response = await axios.get(tokenURI);
                        const responseData = response.data;
                        const name = responseData.name;
                        const description = responseData.description;
                        const image = responseData.image;

                        const formatedPrice = ethers.formatUnits(price.toString(), "ether");

                        return {
                            formatedPrice,
                            tokenId: tokenId.toString(),
                            seller,
                            owner,
                            image,
                            name,
                            description,
                            tokenURI
                        };
                    }
                )
            )
            return items;

        } catch (error) {
            console.log("Error: " + error);
        }
    }

    useEffect(() => {
        fecthNFTs();
    }, [])

    const fetchSoldOrUnsoldTokensByOwner = async (onSale) => {
        try {
            console.log(typeof onSale)
            console.log("OnSAle:" + onSale)
            const contract = await connectWithContract();

            const data = [];
            if (onSale) {
                data = await contract.getOwnerListedTokens();
            } else {
                data = await contract.getOwnerUnlistedTokens();
            }

            console.log("data: " + data)
            const items = await Promise.all(
                data.map(
                    async ({ tokenId, seller, owner, price }) => {
                        const tokenURI = await contract.tokenURI(tokenId);

                        const response = await axios.get(tokenURI);
                        const responseData = response.data;
                        const name = responseData.name;
                        const description = responseData.description;
                        const image = responseData.image;

                        const formatedPrice = ethers.formatUnits(price.toString(), "ether");

                        return {
                            formatedPrice,
                            tokenId: tokenId.toString(),
                            seller,
                            owner,
                            image,
                            name,
                            description,
                            tokenURI
                        };
                    }
                )
            )
            return items;

        } catch (error) {
            console.log("Error: " + error);
        }
    }

    const buyNFT = async (nft) => {
        try {
            console.log(nft)

            const contract = await connectWithContract();

            const price = ethers.parseUnits(nft.formatedPrice, "ether");

            const txn = await contract.executeSale(nft.tokenId, { value: price });
            await txn.wait();

        } catch (error) {
            console.log("Error: " + error);
        }
    }

    return (
        <NFTMarketplaceContext.Provider value={{
            connectWallet,
            uploadToPinataIPFS,
            createNFT,
            createSale,
            fecthNFTs,
            fetchSoldOrUnsoldTokensByOwner,
            buyNFT,
            currentAccount
        }}>
            {children}
        </NFTMarketplaceContext.Provider>
    )
}


// export default NFTMarketplaceContext;
