import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const CardBody: React.FC<Props> = ({ children }) => (
  <div className="p-6 hover:bg-indigo-50 hover:text-black transition duration-300 ease-in">{children}</div>
);
