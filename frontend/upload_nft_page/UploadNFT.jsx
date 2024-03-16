import React, {useState} from 'react'
import { MdOutlineHttp, MdOutlineAttachFile } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { useRouter } from "next/router";

import Style from "./UploadNFT.module.css";
import formStyle from "../styles/form.module.css";
import { Button } from "../components/ComponentsIndex.js";
import { DropZone } from "../upload_nft_page/uploadNFTIndex.js";

const UploadNFT = ({uploadToPinataIPFS, createNFT}) => {
    const [price, setPrice] = useState("");
    const [active, setActive] = useState(0);
    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
  
    const router = useRouter();
  
    return (
      <div className={Style.upload}>
        <DropZone
          title="JPG, PNG, MAX 100MB"
          heading="Drag & drop file"
          subHeading="or Browse media on your device"
          name={name}
          website={website}
          description={description}
          setImage={setImage}
          uploadToPinataIPFS={uploadToPinataIPFS}
        />
  
        <div className={Style.upload_box}>

          <div className={formStyle.Form_box_input}>
            <label htmlFor="nft">Item Name</label>
            <input
              type="text"
              placeholder="Your NFT's Name"
              className={formStyle.Form_box_input_userName}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
  
          <div className={formStyle.Form_box_input}>
            <label htmlFor="website">Website</label>
            <div className={formStyle.Form_box_input_box}>
              <div className={formStyle.Form_box_input_box_icon}>
                <MdOutlineHttp />
              </div>
  
              <input
                type="text"
                placeholder="Website"
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
  
            <p className={Style.upload_box_input_para}>
              Ciscrypt will include a link to this URL on this item's detail page,
              so that users can click to learn more about it. You are welcome to
              link to your own webpage with more details.
            </p>
          </div>
  
          <div className={formStyle.Form_box_input}>
            <label htmlFor="description">Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="6"
              placeholder="Describe your NFT here..."
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p>
              The description will be included on the item's detail page
              underneath its image. Markdown syntax is supported.
            </p>
          </div>
  
          <div className={formStyle.Form_box_input_social}>

            <div className={formStyle.Form_box_input}>
              <label htmlFor="Price">Price</label>
              <div className={formStyle.Form_box_input_box}>
                <div className={formStyle.Form_box_input_box_icon}>
                  <FaDollarSign />
                </div>
                <input
                  type="text"
                  placeholder="ETH"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
  
          <div className={Style.upload_box_btn}>
            <Button
              btnName="Upload"
              handleClick={async () => createNFT(name, price, image, description, router)}
              classStyle={Style.upload_box_btn_style}
            />
          </div>
        </div>
      </div>
    );
  };

export default UploadNFT
