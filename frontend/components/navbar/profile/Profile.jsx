import React from "react";
import { FaUserAlt, FaRegImage } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

import Style from "./Profile.module.css";
import images from "../../../img";

const Profile = () => {
    return (
        <div className={Style.profile}>
            
            {/* Profile Info */}
            <div className={Style.profile_account}>
                <Image
                    src={images.user1}
                    alt="user profile"
                    width={50}
                    height={50}
                    className={Style.profile_account_img}
                />

                <div className={Style.profile_account_info}>
                    <p>Shoaib Bhai</p>
                    <small>cidscnds89323c...</small>
                </div>
            </div>

            {/* Profile Menu */}
            <div className={Style.profile_menu}>
                <div className={Style.profile_menu_one}>
                    <div className={Style.profile_menu_one_item}>
                        <FaUserAlt />
                        <p>
                        <Link href={{ pathname: "/my-profile" }}>My Profile</Link>
                        </p>
                    </div>
                    <div className={Style.profile_menu_one_item}>
                        <FaRegImage />
                        <p>
                        <Link href={{ pathname: "/my-items" }}>My Items</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;