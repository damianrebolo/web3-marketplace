import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const CardImage: React.FC<Props> = ({ children }) => <div className="h-80 lg:h-80 md:h-80 w-full relative">{children}</div>;
