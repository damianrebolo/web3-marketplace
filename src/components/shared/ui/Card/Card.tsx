import { cva, type VariantProps } from "cva";
import { ReactNode } from "react";

import { CardBody } from "./Card.Body";
import { CardImage } from "./Card.Image";

interface Props {
  children: ReactNode;
}
const Box: React.FC<Props> = ({ children }) => <div className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">{children}</div>;

const cardCva = cva("overflow-hidden", {
  variants: {
    bg: {
      primary: "bg-blue-500",
      secondary: "bg-gray-500",
      success: "bg-green-500",
      danger: "bg-red-500",
      warning: "bg-yellow-500",
      info: "bg-sky-500",
      dark: "bg-black",
      light: "bg-zinc-100",
    },
    border: {
      primary: "border-2 border-blue-500",
      secondary: "border-2 border-gray-500",
      success: "border-2 border-green-500",
      danger: "border-2 border-red-500",
      warning: "border-2 border-yellow-500",
      info: "border-2 border-sky-500",
      dark: "border-2 border-black",
      light: "border-2 border-zinc-100",
    },
    text: {
      primary: "text-blue-500",
      secondary: "text-gray-500",
      success: "text-green-500",
      danger: "text-red-500",
      warning: "text-yellow-500",
      info: "text-sky-500",
      dark: "text-gray-800",
      light: " text-zinc-100",
      white: "text-white",
      muted: "text-gray-200",
    },
    rounded: {
      sm: "rounded-sm",
      lg: "rounded-lg",
    },
    shadow: {
      sm: "shadow-sm",
      lg: "shadow-lg",
    },
  },
  defaultVariants: {
    bg: null,
    border: null,
    text: "secondary",
    rounded: "lg",
    shadow: "lg",
  },
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardCva> {}

const Card: React.FC<CardProps> = ({ bg, border, text, rounded, shadow, children, ...props }) => (
  <Box>
    <div className={cardCva({ bg, border, text, rounded, shadow })} {...props}>
      {children}
    </div>
  </Box>
);

export default Object.assign(Card, {
  Body: CardBody,
  Image: CardImage,
});
