import React, { useContext, useEffect, useState } from "react";

import Style from "../styles/index.module.css";
import { HeroSection, Service, NFTCard, Title } from "../components/ComponentsIndex";

import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

const Home = () => {
  const { fecthNFTs } = useContext(NFTMarketplaceContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);

  useEffect(() => {
    fecthNFTs().then((data) => {
      setNfts(data.reverse());
      setNftsCopy(data);
    });
  }, [])

  return <div className={Style.homePage}>
    <HeroSection />
    <Service />
    <br></br>
    <Title
      heading="Featured NFTs"
      paragraph="Discover today's hottest NFTs!"
    />
    <NFTCard NFTData={nfts} />
  </div>;
};

export default Home;
