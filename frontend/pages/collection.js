import React, { useEffect, useContext, useState } from 'react';

import Style from "../styles/collection.module.css";
import images from "../img";
import { NFTItem, Banner, SearchBar } from "../collection_page/collectionIndex";

import { NFTMarketplaceContext } from '../context/NFTMarketplaceContext';

const collection = () => {
    const { fecthNFTs } = useContext(NFTMarketplaceContext);
    const [nfts, setNfts] = useState([]);
    const [nftsCopy, setNftsCopy] = useState([]);

    useEffect(() => {
        fecthNFTs().then((data) => {
            setNfts(data.reverse());
            setNftsCopy(data);
        });
    }, [])

    const onHandleSearch = (value) => {
        const filteredNFTS = nfts.filter(({ name }) =>
            name.toLowerCase().includes(value.toLowerCase())
        );

        if (filteredNFTS.length === 0) {
            setNfts(nftsCopy);
        } else {
            setNfts(filteredNFTS);
        }
    };

    const onClearSearch = () => {
        if (nfts.length && nftsCopy.length) {
            setNfts(nftsCopy);
        }
    };

    return (
        <div className={Style.collection}>
            <Banner bannerImage={images.creatorbackground2} />
            <SearchBar
                onHandleSearch={onHandleSearch}
                onClearSearch={onClearSearch}
            />
            <NFTItem NFTData={nfts} />
        </div>
    );
}

export default collection;