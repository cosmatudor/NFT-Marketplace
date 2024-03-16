import React, { useState } from 'react'
import Image from "next/image";

import Style from "../styles/connectWallet.module.css";
import images from "../img";

const connectWallet = () => {
    const provider = {
        image: images.provider1,
        name: "Metamask",
    }

    return (
        <div className={Style.connectWallet}>
            <div className={Style.connectWallet_box}>
                <h1>Connect your wallet</h1>

                <div className={Style.connectWallet_box_provider}>
                    <div
                        className={Style.connectWallet_box_provider_item}
                        onClick={() => connectWallet()}
                    >
                        <Image
                            src={provider.image}
                            alt={provider.name}
                            width={50}
                            height={50}
                            className={Style.connectWallet_box_provider_item_img}
                        />
                        <p>{provider.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default connectWallet
