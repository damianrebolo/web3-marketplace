import type { AppProps } from "next/app";

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import { MarketplaceNavbar } from "../components/pages/Marketplace/Navbar";
import { Layout } from "components/shared/core";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThirdwebProvider
    desiredChainId={ChainId.Goerli}
    chainRpc={{
      [ChainId.Goerli]: `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    }}
  >
    <Layout>
      <MarketplaceNavbar />
      <Component {...pageProps} />
    </Layout>
  </ThirdwebProvider>
);
export default MyApp;
