import { useState } from "react";
import { BsImages } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

import Style from "./NFTCard.module.css";


const NFTCard = ({ NFTData }) => {

    return (
        <div className={Style.NFTCard}>
            {NFTData?.slice(-3).map((nft, index) => (
                <Link href={{ pathname: "/nft_details", query: nft }} >
                    <div className={Style.NFTCard_box} key={index+1}>
                        <div className={Style.NFTCard_box_img}> 
                            <Image 
                                src={nft.image} 
                                alt="nft" 
                                width={600}
                                height={600} 
                                className={Style.NFTCard_box_img_img} 
                            />
                        </div>
        
                        <div className={Style.NFTCard_box_update}>
                            <div className={Style.NFTCard_box_update_left}>
                                {/* <div className={Style.NFTCard_box_update_left_like} onClick={likeNft}>
                                    {liked ? <AiFillHeart /> : <AiOutlineHeart />}
                                    {""} 22
                                </div> */}
                            </div>
                            
                            <div className={Style.NFTCard_box_update_right}>
                                <div className={Style.NFTCard_box_update_right_info}>
                                    <small>Remaining time</small>
                                    <p>3h : 23m : 56s</p>
                                </div>
                            </div>
                        </div>
        
                        <div className={Style.NFTCard_box_update_details}>
                            <div className={Style.NFTCard_box_update_details_price}>
                                <div className={Style.NFTCard_box_update_details_price_box}>
                                    <h4>{nft.name}</h4>
        
                                    <div className={Style.NFTCard_box_update_details_price_box_box}>
                                        <div className={Style.NFTCard_box_update_details_price_box_bid}>
                                            <small>Current Bid</small>
                                            <p>{nft.formatedPrice} ETH</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={Style.NFTCard_box_update_details_category}>
                                <BsImages />
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
};

export default NFTCard;