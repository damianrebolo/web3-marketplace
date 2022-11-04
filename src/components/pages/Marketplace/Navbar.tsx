import { ReactNode } from "react";
import Image from "next/image";

import { WalletIcon } from "../../shared/icons";
import Nav from "../../shared/ui/Nav";
import Navbar from "../../shared/ui/Navbar";
import OffCanvas from "../../shared/ui/OffCanvas";
import { WalletStatus } from "../../shared/core/WalletStatus";

export const MarketplaceNavbar: React.FC = () => (
  <Navbar>
    <Navbar.Brand href="/marketplace">
      <Image src="/assets/images/logo.png" alt="Web3 Portfolio" width={40} height={40} /> Web3 Portfolio
    </Navbar.Brand>
    <Nav className="sm:ml-auto">
      <Nav.Link href="/marketplace">Marketplace</Nav.Link>
      <Nav.Link href="/thegraph">The Graph</Nav.Link>
    </Nav>
    <Navbar.Darkmode />
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
);
