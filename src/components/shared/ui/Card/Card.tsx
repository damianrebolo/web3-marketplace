import { cx, cva, type VariantProps } from "cva";
import { ReactNode } from "react";

import { CardBody } from "./Card.Body";
import { CardHeader } from "./Card.Header";
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
      dark: "bg-gray-700",
      light: "bg-zinc-100",
    },
    border: {
      primary: "border border-blue-500",
      secondary: "border border-gray-500",
      success: "border border-green-500",
      danger: "border border-red-500",
      warning: "border border-yellow-500",
      info: "border border-sky-500",
      dark: "border border-black",
      light: "border border-zinc-100",
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
    bg: "light",
    border: null,
    text: "dark",
    rounded: "lg",
    shadow: "lg",
  },
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardCva> {}

const Card: React.FC<CardProps> = ({ bg, border, text, rounded, shadow, children, className, ...props }) => (
  <div className={cx(cardCva({ bg, border, text, rounded, shadow }), className)} {...props}>
    {children}
  </div>
);

export default Object.assign(Card, {
  Header: CardHeader,
  Body: CardBody,
  Image: CardImage,
});
