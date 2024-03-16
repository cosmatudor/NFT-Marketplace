import { useState, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import {BsSearch} from "react-icons/bs";
import { FaUserCircle } from 'react-icons/fa';

import Style from "./NavBar.module.css";
import { Profile } from "./index";
import { Button } from "../ComponentsIndex";
import images from "../../img/index";

// IMPORT FROM SMART CONTRACT
import { NFTMarketplaceContext } from "../../context/NFTMarketplaceContext";

const NavBar = () => {
    const [ profile, setProfile ] = useState(false);

    // const router = useRouter();
    const { currentAccount, connectWallet } = useContext(NFTMarketplaceContext);

    const openProfile = () => {
        if (!profile) {
            setProfile(true);
        } else {
            setProfile(false);
        }
    }

    return (
        <div className={Style.navbar}>
            <div className={Style.navbar_container}>

                {/* LEFT SECTION */}
                <div className={Style.navbar_container_left}>

                    {/* // Logo */}
                    <div className={Style.logo}>
                        <Image src={images.logo} alt="NFT MARKETPLACE" width={100} height={100} />
                    </div>

                    {/* // Search Bar */}
                    <div className={Style.navbar_container_left_box_input}>
                        <div className={Style.navbar_container_left_box_input_box}>
                            <input type="text" placeholder="Search NFT"/> 
                            <BsSearch onClick={() => {}} className={Style.search_icon}/>
                        </div>
                    </div>

                </div>

                {/* RIGHT SECTION */}
                <div className={Style.navbar_container_right}>
                    
                    {/* Profile */}
                    <div className={Style.navbar_container_right_profile_box}>
                        <div className={Style.navbar_container_right_profile}>
                            {currentAccount && 
                             <Link href={{ pathname: "/user_profile"}}>
                                <Image
                                    src={images.profile_icon}
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    onClick={() => openProfile()}
                                    className={Style.navbar_container_right_profile}
                                />
                             </Link>
                            }       
                        </div>
                    </div>

                    {/* Connect Button */}
                    <div className={Style.navbar_container_right_button}>
                        {currentAccount == "" ?
                            <Button btnName="Connect" handleClick={() => connectWallet()}/>
                            :
                            <Link href="/upload_nft">
                                <a>
                                    <Button btnName="Create" handleClick={() => {}}/>
                                </a>
                            </Link>
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}

export default NavBar;