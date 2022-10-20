import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const GridContainer: React.FC<Props> = ({ children }) => (
  <div className="flex flex-wrap -m-4">{children}</div>
);
