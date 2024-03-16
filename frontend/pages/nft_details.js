import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router';

import NFTDetailsPage from '../nft_details_page/NFTDetailsPage'

const NFTDetails = () => {
    const [nft, setNft] = useState({
        image: "",
        tokenId: "",
        name: "",
        owner: "",
        price: "",
        seller: "",
    });

    const router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;
        setNft(router.query);
    }, [router.isReady]);

    return (
        <div>
            <NFTDetailsPage nft={nft} />
        </div>
    )
}

export default NFTDetails;
