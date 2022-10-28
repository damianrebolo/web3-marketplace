import type { NextPage } from "next";
import Image from "next/image";

import { CardContainer, Container, GridContainer } from "../components/shared/ui";
import OffCanvas from "../components/shared/ui/OffCanvas";
import Navbar from "../components/shared/ui/Navbar";
import Nav from "../components/shared/ui/Nav";

import { WalletIcon } from "../components/shared/icons/Wallet";

import { ActiveListings, MarketplaceCard, WalletStatus } from "../components/pages/Marketplace";

const MarketplacePage: NextPage = () => (
  <>
    <Navbar>
      <Navbar.Brand href="/marketplace">
        <Image src="/assets/images/logo.png" alt="Web3 Portfolio" width={40} height={40} /> Web3 Portfolio
      </Navbar.Brand>
      <Nav className="sm:ml-auto">
        <Nav.Link href="/marketplace">Marketplace</Nav.Link>
        <Nav.Link href="/usdc">Usdc</Nav.Link>
      </Nav>
      <Navbar.Toggle className="ml-auto sm:ml-3">
        <WalletIcon className="w-10 h-10 cursor-pointer" />
      </Navbar.Toggle>
      <Navbar.OffCanvas>
        <OffCanvas.Header closeButton>
          <OffCanvas.Title>My Wallet</OffCanvas.Title>
        </OffCanvas.Header>
        <OffCanvas.Body>
          <WalletStatus />
        </OffCanvas.Body>
      </Navbar.OffCanvas>
    </Navbar>

    <Container>
      <ActiveListings>
        {(listings, contract) => (
          <GridContainer>
            {listings?.map((listing) => (
              <CardContainer key={listing?.id}>
                <MarketplaceCard
                  contract={contract}
                  image={listing?.asset?.image}
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
  </>
);

export default MarketplacePage;
