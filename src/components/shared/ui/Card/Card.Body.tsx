import { cx, cva, type VariantProps } from "cva";

const cardBodyCva = cva("p-6", undefined);

export interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardBodyCva> {}

export const CardBody: React.FC<CardBodyProps> = ({ className, ...props }) => (
  <div className={cx(cardBodyCva(), className)} {...props} />
);
// <div className="p-6 hover:bg-indigo-50 hover:text-black transition duration-300 ease-in">{children}</div>

CardBody.displayName = "Card.Body";
