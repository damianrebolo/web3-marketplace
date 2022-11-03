import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const OffCanvasTitle: React.FC<Props> = ({ children }) => (
  <span className="text-2xl font-semibold">{children}</span>
);

OffCanvasTitle.displayName = "OffCanvas.Title";
