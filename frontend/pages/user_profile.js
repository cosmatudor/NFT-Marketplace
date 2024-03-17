import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORT
import Style from "../styles/user_profile.module.css";
// import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
import { Title } from "../components/ComponentsIndex";
import { NFTItem } from "../collection_page/collectionIndex";

//IMPORT SMART CONTRACT 
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

const userProfile = () => {
    const { fetchSoldOrUnsoldTokensByOwner } = useContext(NFTMarketplaceContext);

    const router = useRouter();
    const { account } = router.query;

    const [myNFTs, setMyNFTs] = useState([]);

    useEffect(() => {
        // get my nfts
        // onSale: false -> get my nfts
        // onSale: true -> get my listed nfts
        fetchSoldOrUnsoldTokensByOwner(false).then((items) => {
            setMyNFTs(items);
        });
        console.log("myNFTs: " + myNFTs)
    }, []);

    return (
        <div className={Style.author}>
            <Title heading="Owned NFTs by:" paragraph={account} />
            <NFTItem NFTData={myNFTs} />
        </div>
    );
};

export default userProfile;
