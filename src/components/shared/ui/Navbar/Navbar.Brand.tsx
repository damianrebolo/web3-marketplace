import { ReactNode } from "react";
import Link from "next/link";

interface Props {
  children: ReactNode;
  href: string;
}

export const NavbarBrand: React.FC<Props> = ({ children, href }) => (
  <Link href={href}>
    <a className="flex flex-nowrap items-center gap-2 text-gray-500 dark:text-white font-bold text-xl truncate ml-3">
      {children}
    </a>
  </Link>
);

NavbarBrand.displayName = "Navbar.Brand";
