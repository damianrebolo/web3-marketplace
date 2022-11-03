import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import "../styles/globals.css";

import { CoreNavbar } from "../components/shared/core";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ThirdwebProvider
    desiredChainId={ChainId.Goerli}
    chainRpc={{
      [ChainId.Goerli]: `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    }}
  >
    <CoreNavbar />
    <Component {...pageProps} />
  </ThirdwebProvider>
);

export default MyApp;
