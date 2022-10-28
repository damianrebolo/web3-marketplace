import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href: string;
}

export const NavLink: React.FC<Props> = ({ children, href }) => (
  <Link href={href}>
    <a className="font-semibold text-gray-800 hover:text-gray-400 text-lg">{children}</a>
  </Link>
);

NavLink.displayName = "Nav.Link";
