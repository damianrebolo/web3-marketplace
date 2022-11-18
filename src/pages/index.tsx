import type { NextPage } from "next";
import Head from "next/head";

import { Container, GridContainer } from "../components/shared/ui";
import { MarketplaceCard } from "components/shared/core";

import { DirectListing, ThirdwebSDK } from "@thirdweb-dev/sdk";

interface Props {
  listings: DirectListing[];
}

const Home: NextPage<Props> = ({ listings }) => (
  <>
    <Head>
      <title>Web3 Portfolio - Marketplace</title>
      <meta property="og:title" content="Web3 Portfolio - Marketplace" key="title" />
    </Head>
    <Container className="m-10">
      <h1 className="my-5 font-semibold text-xl text-gray-700 dark:text-white">Marketplace</h1>
      <GridContainer>
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
      </GridContainer>
    </Container>
  </>
);

export async function getServerSideProps() {
  const sdk = new ThirdwebSDK("goerli");

  const contract = await sdk.getContract(process.env.NEXT_PUBLIC_CONTRACT_MARKETPLACE as string, "marketplace");
  const listings = (await contract.getActiveListings()) as DirectListing[];

  return {
    props: { listings: JSON.parse(JSON.stringify(listings)) }, // will be passed to the page component as props
  };
}

export default Home;
