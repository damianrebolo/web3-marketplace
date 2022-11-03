import type { NextPage } from "next";

import { Container, GridContainer } from "../components/shared/ui";

import { ActiveListings, MarketplaceCard } from "../components/pages/Marketplace";

import { QueryListings } from "components/pages/Marketplace/QueryListings";

const MarketplacePage: NextPage = () => (
  <Container>
    <ActiveListings>
      {(listings, contract) => (
        <QueryListings listings={listings}>
          {(items) => (
            <GridContainer>
              {items?.map((listing) => (
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
            </GridContainer>
          )}
        </QueryListings>
      )}
    </ActiveListings>
  </Container>
);

export default MarketplacePage;
