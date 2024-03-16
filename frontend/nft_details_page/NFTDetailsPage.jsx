import React from 'react'

import NFTDescription from './nft_description/NFTDescription';
import NFTImage from './nft_img/NFTImage';
import Style from './NFTDetailsPage.module.css';

const NFTDetailsPage = ({ nft }) => {
  return (
    <div className={Style.NFTDetailsPage}>
      <div className={Style.NFTDetailsPage_box}>
        <NFTImage nft={nft} />
        <NFTDescription nft={nft} />
      </div>
    </div>
  )
}

export default NFTDetailsPage;

