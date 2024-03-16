import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/user_profile.module.css";
// import { Banner, NFTCardTwo } from "../collectionPage/collectionIndex";
// import { Title } from "../components/componentsindex";
import { NFTItem } from "../collection_page/collectionIndex";

//IMPORT SMART CONTRACT 
import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

const userProfile = () => {
    const { fetchSoldOrUnsoldTokensByOwner } = useContext(NFTMarketplaceContext);

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
            {/* <Banner bannerImage={images.creatorbackground2} /> */}
            <NFTItem NFTData={myNFTs} />
        </div>
    );
};

export default userProfile;
