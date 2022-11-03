import { ReactNode, useMemo, useState } from "react";

import { NavbarBrand } from "./Navbar.Brand";
import { NavbarDarkMode } from "./Navbar.Darkmode";
import { NavbarOffCanvas } from "./Navbar.Offcanvas";
import { NavbarToggle } from "./Navbar.Toggle";
import NavbarContext from "./NavbarContext";

interface Props {
  children: ReactNode;
}

const Navbar: React.FC<Props> = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  const navbarContext = useMemo(
    () => ({
      toggle,
      setToggle,
    }),
    [toggle, setToggle]
  );

  return (
    <NavbarContext.Provider value={navbarContext}>
      <div className="flex flex-nowrap items-center p-4 dark:bg-gray-700">{children}</div>
    </NavbarContext.Provider>
  );
};

export default Object.assign(Navbar, {
  Brand: NavbarBrand,
  OffCanvas: NavbarOffCanvas,
  Toggle: NavbarToggle,
  Darkmode: NavbarDarkMode,
});
