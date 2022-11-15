import { ReactNode } from "react";
import Image from "next/image";

import { WalletIcon } from "../icons";
import Nav from "../ui/Nav";
import Navbar from "../ui/Navbar";
import OffCanvas from "../ui/OffCanvas";
import { WalletStatus } from "./WalletStatus";

export const MarketplaceNavbar: React.FC = () => (
  <Navbar>
    <Navbar.Brand href="/">
      <Image src="/assets/images/logo.png" alt="Web3 Portfolio" width={40} height={40} /> Web3 Portfolio
    </Navbar.Brand>
    <Nav className="ml-8 hidden sm:block">
      <Nav.Link href="/nfts">NFT Collection</Nav.Link>
      <Nav.Link href="/listings">Listings</Nav.Link>
    </Nav>
    <Navbar.Darkmode className="ml-auto" />
    <Navbar.Toggle className="ml-3">
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
);
