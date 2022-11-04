import type { NextPage } from "next";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import { Container, GridContainer } from "../components/shared/ui";
import { CoreNavbar } from "../components/shared/core";

import { ActiveListings, MarketplaceCard } from "../components/pages/Marketplace";

const MarketplacePage: NextPage = () => (
  <ThirdwebProvider
    desiredChainId={ChainId.Goerli}
    chainRpc={{
      [ChainId.Goerli]: `https://goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_ID}`,
    }}
  >
    <CoreNavbar />
    <Container className="py-5" fluid>
      <ActiveListings>
        {(listings, contract) => (
          <GridContainer>
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
          </GridContainer>
        )}
      </ActiveListings>
    </Container>
  </ThirdwebProvider>
);

export default MarketplacePage;
