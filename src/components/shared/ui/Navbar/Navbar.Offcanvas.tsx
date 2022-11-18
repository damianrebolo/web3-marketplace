import { ReactNode, useContext, useEffect } from "react";
import OffCanvas from "../OffCanvas";

import NavbarContext, { NavbarContextType } from "./NavbarContext";

interface Props {
  children: ReactNode;
}

export const NavbarOffCanvas: React.FC<Props> = ({ children }) => {
  const { toggle, setToggle } = useContext(NavbarContext) as NavbarContextType;

  useEffect(() => {
    toggle
      ? document?.querySelector("body")?.classList.add("disable-overflow")
      : document?.querySelector("body")?.classList.remove("disable-overflow");
  }, [toggle]);

  return (
    <OffCanvas toggle={toggle} setToggle={setToggle}>
      {children}
    </OffCanvas>
  );
};

NavbarOffCanvas.displayName = "Navbar.OffCanvas";
