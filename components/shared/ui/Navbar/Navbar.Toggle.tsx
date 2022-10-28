import { ReactNode, useContext } from "react";

import NavbarContext, { NavbarContextType } from "./NavbarContext";

import { WalletIcon } from "../../icons";

interface Props {
  children: ReactNode;
}

export const NavbarToggle: React.FC<Props> = ({ children }) => {
  const { toggle, setToggle } = useContext(NavbarContext) as NavbarContextType;
  console.log(toggle);
  return <button onClick={() => setToggle(!toggle)}>{children}</button>;
};

NavbarToggle.displayName = "Navbar.Toggle";
