import type { AppProps } from "next/app";
import Router from "next/router";

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import NProgress from "nprogress";

import { MarketplaceNavbar } from "../components/shared/core/Navbar";
import { Layout, MismatchAlert } from "components/shared/core";
import ToastProvider from "components/shared/core/Toaster/ToasterProvider";

import "nprogress/nprogress.css";
import "../styles/globals.css";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThirdwebProvider
    desiredChainId={ChainId.Goerli}
    chainRpc={{
      [ChainId.Goerli]: `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    }}
  >
    <ToastProvider variant="top_middle">
      <Layout>
        <MismatchAlert />
        <MarketplaceNavbar />
        <Component {...pageProps} />
      </Layout>
    </ToastProvider>
  </ThirdwebProvider>
);
export default MyApp;
