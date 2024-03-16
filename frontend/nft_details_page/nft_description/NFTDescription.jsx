import React, { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  MdVerified,
  MdCloudUpload,
  MdTimer,
  MdReportProblem,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { BiTransferAlt, BiDollar } from "react-icons/bi";

//INTERNAL IMPORT
import Style from "./NFTDescription.module.css";
import images from "../../img";
import { Button } from "../../components/ComponentsIndex.js";

//IMPORT SMART CONTRACT
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext.js";

const NFTDescription = ({ nft }) => {
  const {buyNFT, currentAccount} = useContext(NFTMarketplaceContext);

  const router = useRouter();

  return (
    <div className={Style.NFTDescription}>
      <div className={Style.NFTDescription_box}>

        <div className={Style.NFTDescription_box_profile}>
          <h1>
            {nft.name} #{nft.tokenId}
          </h1>
          <div className={Style.NFTDescription_box_profile_box}>
            
            <div className={Style.NFTDescription_box_profile_box_left}>
              <Image
                src={images.user1}
                alt="profile"
                width={40}
                height={40}
                className={Style.NFTDescription_box_profile_box_left_img}
              />
              <div className={Style.NFTDescription_box_profile_box_left_info}>
                <small>Creator</small> <br />
                {/* <Link href={{ pathname: "/author", query: `${nft.seller}` }}> */}
                <Link href={{ pathname: "/author" }}>
                  <span>
                    Karli Costa <MdVerified />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* //////////////////////// */}
          <div className={Style.NFTDescription_box_profile_biding}>
            <p>
              <MdTimer /> <span>Auction ending in:</span>
            </p>

            <div className={Style.NFTDescription_box_profile_biding_box_timer}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>2</p>
                <span>Days</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>22</p>
                <span>hours</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>45</p>
                <span>mins</span>
              </div>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_timer_item
                }
              >
                <p>12</p>
                <span>secs</span>
              </div>
            </div>
              {/* //////////////////////// */}

            <div className={Style.NFTDescription_box_profile_biding_box_price}>
              <div
                className={
                  Style.NFTDescription_box_profile_biding_box_price_bid
                }
              >
                <small>Current Bid</small>
                <p>
                  {nft.formatedPrice} ETH
                </p>
              </div>
            </div>

            <div className={Style.NFTDescription_box_profile_biding_box_button}>
            {currentAccount == nft.seller.toLowerCase() ? (
                <p>You can't buy your own NFT</p>
              ) : currentAccount == nft.owner.toLowerCase() ? (
                <Button
                  btnName="List on Marketplace"
                  handleClick={() => {}}
                  classStyle={Style.button}
                />
              ) : (
                <Button
                  btnName="Buy NFT"
                  handleClick={async () => {await buyNFT(nft); router.push("/user_profile");}}
                  classStyle={Style.button}
                />
              )}
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDescription;
