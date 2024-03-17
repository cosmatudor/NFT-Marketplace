import { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import {BsSearch} from "react-icons/bs";
import { useRouter } from "next/router";

import Style from "./NavBar.module.css";
import { Profile } from "./index";
import { Button } from "../ComponentsIndex";
import images from "../../img/index";

// IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";

const NavBar = () => {
    const [ profile, setProfile ] = useState(false);

    const router = useRouter();
    const { currentAccount, connectWallet } = useContext(NFTMarketplaceContext);

    return (
        <div className={Style.navbar}>
            <div className={Style.navbar_container}>

                {/* LEFT SECTION */}
                <div className={Style.navbar_container_left}>

                    {/* // Logo */}
                    <div className={Style.logo}>
                        <Link href={{ pathname: "/"}}>
                            <Image src={images.logo} alt="NFT MARKETPLACE" width={120} height={120} />
                        </Link>
                    </div>

                </div>

                {/* RIGHT SECTION */}
                <div className={Style.navbar_container_right}>
                    
                    {/* Profile */}
                    <div className={Style.navbar_container_right_profile_box}>
                        <div className={Style.navbar_container_right_profile}>
                            {currentAccount && 
                                <Image
                                    src={images.profile_icon}
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    onClick={() => router.push(`/user_profile?account=${currentAccount}`)}
                                    className={Style.navbar_container_right_profile}
                                />
                            }       
                        </div>
                    </div>

                    {/* Connect Button */}
                    <div className={Style.navbar_container_right_button}>
                        {currentAccount == "" ?
                            <Button btnName="Connect" handleClick={() => connectWallet()}/>
                            :

                            <Button btnName="Create" handleClick={() => router.push("/upload_nft")}/>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}

export default NavBar;