import React, { useContext, useEffect, useState } from 'react'

import Style from "../styles/upload_nft.module.css";
import UploadNFT from '../upload_nft_page/UploadNFT';

// IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from '../context/NFTMarketplaceContext';

const uploadNFT = () => {
    const { uploadToPinataIPFS, createNFT } = useContext(NFTMarketplaceContext);

    return (
        <div className={Style.uploadNFT}>
            <div className={Style.uploadNFT_box}>
                <div className={Style.uploadNFT_box_heading}>
                    <h1>Create New NFT</h1>
                    <p>
                        You can set preferred display name, create your profile URL and
                        manage other personal settings.
                    </p>
                </div>

                <div className={Style.uploadNFT_box_title}>
                    <h2>Transform your favorite image into an NFT</h2>
                    <p>
                        File types supported: JPG, PNG. Max size: 100 MB
                    </p>
                </div>

                <div className={Style.uploadNFT_box_form}>
                    <UploadNFT uploadToPinataIPFS={uploadToPinataIPFS} createNFT={createNFT} />
                </div>
            </div>
        </div>
    )
}

export default uploadNFT;
