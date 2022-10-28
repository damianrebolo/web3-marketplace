import { ReactNode } from "react";
import { NavLink } from "./Nav.Link";

interface Props {
  children: ReactNode;
  className?: string;
}

export const Nav: React.FC<Props> = ({ children, className }) => (
  <div className={`hidden sm:flex items-center mr-6 space-x-4 ${className}`}>{children}</div>
);

export default Object.assign(Nav, {
  Link: NavLink,
});
