import React, { useContext, useEffect } from "react";

import Style from "../styles/index.module.css";
import { HeroSection, Service, NFTCard } from "../components/ComponentsIndex";

import { NFTMarketplaceContext } from "../context/NFTMarketplaceContext";

const Home = () => {
  const { } = useContext(NFTMarketplaceContext);

  return <div className={Style.homePage}>
    <HeroSection />
    <Service />
    <NFTCard />
  </div>;
};

export default Home;
