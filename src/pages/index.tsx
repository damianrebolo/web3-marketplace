import type { NextPage } from "next";
import Head from "next/head";

import { Container } from "../components/shared/ui";

import { ActiveListings, MarketplaceCard } from "../components/pages/Marketplace";

const Home: NextPage = () => (
  <>
    <Head>
      <title>Web3 Portfolio - Marketplace</title>
      <meta property="og:title" content="Web3 Portfolio - Marketplace" key="title" />
    </Head>
    <Container className="m-10">
      <h1 className="my-5 font-semibold text-xl text-gray-700 dark:text-white">Marketplace</h1>
      <ActiveListings>
        {(listings) => (
          <>
            {listings?.map((listing) => (
              <MarketplaceCard
                key={listing?.id}
                image={listing?.asset?.image}
                name={listing?.asset?.name}
                currencyValue={listing?.buyoutCurrencyValuePerToken?.displayValue}
                sellerAddress={listing?.sellerAddress}
                id={listing?.id}
                contractAddress={listing.assetContractAddress}
              />
            ))}
          </>
        )}
      </ActiveListings>
    </Container>
  </>
);

export default Home;
