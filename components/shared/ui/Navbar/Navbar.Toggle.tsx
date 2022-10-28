import { ReactNode, useContext } from "react";

import NavbarContext, { NavbarContextType } from "./NavbarContext";

interface Props {
  children: ReactNode;
  className?: string;
}

export const NavbarToggle: React.FC<Props> = ({ children, className }) => {
  const { toggle, setToggle } = useContext(NavbarContext) as NavbarContextType;
  return (
    <button className={`${className}`} onClick={() => setToggle(!toggle)}>
      {children}
    </button>
  );
};

NavbarToggle.displayName = "Navbar.Toggle";
