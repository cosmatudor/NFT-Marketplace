import React, {useState} from 'react'
import Image from "next/image";
import {TiArrowSortedDown, TiArrowSortedUp} from "react-icons/ti";

import Style from './NFTImage.module.css';
import { NFTMarketplaceAddress } from "../../context/constants.js"

const NFTImage = ({ nft }) => {
  const [description, setDescription] = useState(true);
  const [details, setDetails] = useState(true);

  const openDescription = () => {
    if (!description) {
      setDescription(true);
    } else {
      setDescription(false);
    }
  };

  const openDetails = () => {
    if (!details) {
      setDetails(true);
    } else {
      setDetails(false);
    }
  };


  return (
    <div className={Style.NFTDetailsImg}>
      <div className={Style.NFTDetailsImg_box}>
        <div className={Style.NFTDetailsImg_box_NFT}>

          <div className={Style.NFTDetailsImg_box_NFT_img}>
            <Image
              src={nft.image}
              className={Style.NFTDetailsImg_box_NFT_img_img}
              alt="NFT image"
              objectFit="cover"
              width={500}
              height={500}
            />
          </div>
        </div>

        <div className={Style.NFTDetailsImg_box_description} onClick={() => openDescription()}>
          <p>Description</p>
          {description ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {description && (
          <div className={Style.NFTDetailsImg_box_description_box}>
            <p>{nft.description}</p>
          </div>
        )}

        <div
          className={Style.NFTDetailsImg_box_details}
          onClick={() => openDetails()}
        >
          <p>Details</p>
          {details ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </div>

        {details && (
          <div className={Style.NFTDetailsImg_box_details_box}>
            <p>
              <small>Contract Address</small>
              <br></br>
              {NFTMarketplaceAddress}
            </p>
            <p>
              <small>Token ID:</small>
              &nbsp; {nft.tokenId}
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default NFTImage;

