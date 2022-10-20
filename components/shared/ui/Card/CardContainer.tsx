import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const CardContainer: React.FC<Props> = ({ children }) => <div className="p-4 sm:w-1/2 lg:w-1/3 w-full">{children}</div>;
