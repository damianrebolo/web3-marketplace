import type { NextPage } from "next";

import { useAddress, ConnectWallet } from "@thirdweb-dev/react";

import { CardContainer, Container, GridContainer } from "../components/shared/ui";

import { ActiveListings, MarketplaceCard } from "../components/pages/Marketplace";

const MarketplacePage: NextPage = () => {
  const address = useAddress();

  if (!address) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ConnectWallet />
      </div>
    );
  }

  return (
    <Container>
      <ActiveListings>
        {({ listings, contract }) => (
          <GridContainer>
            {listings.map((listing) => (
              <CardContainer key={listing?.id}>
                <MarketplaceCard
                  image={listing?.asset?.image}
                  contract={contract}
                  name={listing?.asset?.name}
                  currencyValue={listing?.buyoutCurrencyValuePerToken?.displayValue}
                  sellerAddress={listing?.sellerAddress}
                  tokenId={listing?.tokenId}
                />
              </CardContainer>
            ))}
          </GridContainer>
        )}
      </ActiveListings>
    </Container>
  );
};

export default MarketplacePage;
