import { useState } from "react";
import  {AiOutlineHeart, AiFillHeart} from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Image from "next/image";

import Style from "./NFTCard.module.css";
import images from "../../img";

const NFTCard = () => {
    const nftArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // const [liked, setLiked] = useState(true);

    // const likeNft = () => {
    //     if (!liked) {
    //         setLiked(true);
    //     } else {
    //         setLiked(false);
    //     }
    // };

    return (
        <div className={Style.NFTCard}>
            {nftArray.map((nft, index) => (
                <div className={Style.NFTCard_box} key={index+1}>
                    <div className={Style.NFTCard_box_img}> 
                        <Image 
                            src={images.nft_image_1} 
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
                                <h4>Clone #1243</h4>
    
                                <div className={Style.NFTCard_box_update_details_price_box_box}>
                                    <div className={Style.NFTCard_box_update_details_price_box_bid}>
                                        <small>Current Bid</small>
                                        <p>0.5 ETH</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={Style.NFTCard_box_update_details_category}>
                            <BsImages />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default NFTCard;