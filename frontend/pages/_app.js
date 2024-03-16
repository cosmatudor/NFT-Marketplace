import "../styles/globals.css";

import { NavBar } from "../components/ComponentsIndex";
import { NFTMarketplaceProvider } from "../context/NFTMarketplaceContext";

const MyApp = ({ Component, pageProps }) => (
  <div>
    <NFTMarketplaceProvider>
      <NavBar />
      <Component {...pageProps} />
    </NFTMarketplaceProvider>
  </div>
);

export default MyApp;
