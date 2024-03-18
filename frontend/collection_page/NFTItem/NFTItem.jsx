import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import Style from "./NFTItem.module.css"
import { MdTimer } from 'react-icons/md'

const NFTItem = ({ NFTData }) => {
  return (
    <div className={Style.NFTItem}>
      {
        NFTData.map((item, index) => (
            <Link href={{ pathname: "/nft_details", query: item }} key={index + 1}>
                <div key={index+1} className={Style.NFTItem_box}>
                    <div className={Style.NFTItem_box_img}>
                        <img
                            src={item.image}
                            alt="NFT"
                            className={Style.NFTItem_box_img_img} 
                            width={600} 
                            height={600} 
                            objectFit="cover" 
                        />
                    </div>

                    <div className={Style.NFTItem_box_info}>
                        <div className={Style.NFTItem_box_info_left}> 
                            <p>{item.name}</p>
                        </div>
                    </div>

                    <div className={Style.NFTItem_box_price}>
                        <div className={Style.NFTItem_box_price_box}>
                            <small>Current Bid</small>
                            <p>{item.formatedPrice} ETH</p>
                        </div>
                        <p className={Style.NFTItem_box_price_stock}>
                            <MdTimer/> <span>{index+1} hours left</span>
                        </p>
                    </div>
                </div>
            </Link>
        ))
      }
    </div>
  )
}

export default NFTItem
