import { ReactNode, useContext } from "react";
import OffCanvas from "../OffCanvas";

import NavbarContext, { NavbarContextType } from "./NavbarContext";

interface Props {
  children: ReactNode;
}

export const NavbarOffCanvas: React.FC<Props> = ({ children }) => {
  const { toggle, setToggle } = useContext(NavbarContext) as NavbarContextType;

  return (
    <OffCanvas toggle={toggle} setToggle={setToggle}>
      {children}
    </OffCanvas>
  );
};

NavbarOffCanvas.displayName = "Navbar.OffCanvas";
