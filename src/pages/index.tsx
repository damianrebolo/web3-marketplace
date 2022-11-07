import type { NextPage } from "next";

import { Container } from "../components/shared/ui";

import { ActiveListings, MarketplaceCard } from "../components/pages/Marketplace";

const Home: NextPage = () => (
  <Container fluid>
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
            />
          ))}
        </>
      )}
    </ActiveListings>
  </Container>
);

export default Home;
