import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Style from './HeroSection.module.css';
import { Button } from '../ComponentsIndex'
import images from "../../img"

const HeroSection = () => {
    return (
        <div className={Style.heroSection}>
            <div className={Style.heroSection_box}> 
                <div className={Style.heroSection_box_left}>
                    <h1>Discover, collect and sell NFTs 🖼️</h1>
                    <p>
                        Discover the most outstanding NTFs in all topics of life. Creative
                        your NTFs and sell them
                    </p>
                    <Link href="/collection">
                        <a><Button btnName='Start your search' handleClick={() =>{}}></Button></a>
                    </Link>
                </div>
                <div className={Style.heroSection_box_rigth}>
                    <Image src={images.hero} alt="hero" width={600} height={600} />
                </div>
            </div>
        </div>
    )
}

export default HeroSection;