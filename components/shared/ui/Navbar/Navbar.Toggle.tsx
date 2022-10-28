import { ReactNode, useContext } from "react";

import NavbarContext, { NavbarContextType } from "./NavbarContext";

interface Props {
  children: ReactNode;
}

export const NavbarToggle: React.FC<Props> = ({ children }) => {
  const { toggle, setToggle } = useContext(NavbarContext) as NavbarContextType;
  return <button onClick={() => setToggle(!toggle)}>{children}</button>;
};

NavbarToggle.displayName = "Navbar.Toggle";
