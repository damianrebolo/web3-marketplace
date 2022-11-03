import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const OffCanvasBody: React.FC<Props> = ({ children }) => (
  <div className="flex flex-col mb-3 mt-7 mx-7">{children}</div>
);

OffCanvasBody.displayName = "OffCanvas.Body";
