import React, { useEffect, useState, useContext } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/router'

import Style from "../styles/sellingPage.module.css";
import formStyle from "../styles/form.module.css";
import { Button } from '../components/ComponentsIndex';

import { NFTMarketplaceContext } from '../context/NFTMarketplaceContext';

const sellingPage = () => {
    const { createSale } = useContext(NFTMarketplaceContext);
    const [image, setImage] = useState("");
    const [price, setPrice] = useState('"');

    const router = useRouter();
    const { id, tokenURI } = router.query;

    const fetchNFTImage = async () => {
        try {
            const response = await axios.get(tokenURI);
            setImage(response.data.image);
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    useEffect(() => {
        fetchNFTImage();
    }, [id])

    const sellNFT = async () => {
        try {
            await createSale(image, price, true, id);
            router.push("/collection");
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    return (
        <div className={Style.reSellToken}>
            <div className={Style.reSellToken_box}>
                <h1>Sell Your Piece of Art</h1>
                <div className={formStyle.Form_box_input}>
                    <label htmlFor="name">Price</label>
                    <input
                        type="number"
                        min={0}
                        placeholder="Price in ETH"
                        className={formStyle.Form_box_input_userName}
                        onChange={(e) => setPrice(e.target.value)}
                        step={0.01}
                    />
                </div>

                <div className={Style.reSellToken_box_image}>
                    {image && (
                        <Image src={image} alt="Nft" width={400} height={400} />
                    )}
                </div>

                <div className={Style.reSellToken_box_btn}>
                    <Button btnName="Sell NFT" handleClick={() => sellNFT()} />
                </div>
            </div>
        </div>
    );
}

export default sellingPage
