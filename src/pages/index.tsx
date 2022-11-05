import type { NextPage } from "next";

import { Container } from "../components/shared/ui";

import { ActiveListings, MarketplaceCard } from "../components/pages/Marketplace";

const Home: NextPage = () => (
  <Container className="py-5" fluid>
    <ActiveListings>
      {(listings, contract) => (
        <>
          {listings?.map((listing) => (
            <MarketplaceCard
              key={listing?.id}
              contract={contract}
              image={listing?.asset?.image}
              name={listing?.asset?.name}
              currencyValue={listing?.buyoutCurrencyValuePerToken?.displayValue}
              sellerAddress={listing?.sellerAddress}
              tokenId={listing?.tokenId}
            />
          ))}
        </>
      )}
    </ActiveListings>
  </Container>
);

export default Home;
