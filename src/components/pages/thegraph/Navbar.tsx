import Image from "next/image";

import Nav from "../../shared/ui/Nav";
import Navbar from "../../shared/ui/Navbar";

export const TheGraphNavbar: React.FC = () => (
  <Navbar>
    <Navbar.Brand href="/marketplace">
      <Image src="/assets/images/logo.png" alt="Web3 Portfolio" width={40} height={40} /> Web3 Portfolio
    </Navbar.Brand>
    <Nav className="sm:ml-auto">
      <Nav.Link href="/marketplace">Marketplace</Nav.Link>
      <Nav.Link href="/thegraph">The Graph</Nav.Link>
    </Nav>
    <Navbar.Darkmode />
  </Navbar>
);
