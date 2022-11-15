import type { AppProps } from "next/app";
import dynamic from "next/dynamic";

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import { MarketplaceNavbar } from "../components/shared/core/Navbar";
import { Layout, MismatchAlert } from "components/shared/core";
import ToastProvider from "components/shared/core/Toaster/ToasterProvider";

import "../styles/globals.css";

const ProgressBar = dynamic(() => import("../components/shared/core/ProgressBar"), { ssr: false });

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThirdwebProvider
    desiredChainId={ChainId.Goerli}
    chainRpc={{
      [ChainId.Goerli]: `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    }}
  >
    <ToastProvider variant="top_middle">
      <ProgressBar />
      <Layout>
        <MismatchAlert />
        <MarketplaceNavbar />
        <Component {...pageProps} />
      </Layout>
    </ToastProvider>
  </ThirdwebProvider>
);
export default MyApp;
