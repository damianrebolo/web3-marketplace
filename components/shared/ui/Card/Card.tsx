import { ReactNode } from "react";

import { CardBody } from "./Card.Body";
import { CardImage } from "./Card.Image";

interface Props {
  children: ReactNode;
}

const Card: React.FC<Props> = ({ children }) => (
  <div className="p-4 sm:w-1/2 lg:w-1/3 w-full">
    <div className="shadow-lg border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">{children}</div>
  </div>
);

export default Object.assign(Card, {
  Body: CardBody,
  Image: CardImage,
});
