import { cx, cva, type VariantProps } from "cva";

const cardHeaderCva = cva("font-semibold text-xl px-6 py-3", {
  variants: {
    border: {
      true: "border-b border-black",
    },
  },
  defaultVariants: {
    border: true,
  },
});

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardHeaderCva> {}

export const CardHeader: React.FC<CardProps> = ({ className, ...props }) => (
  <div className={cx(cardHeaderCva(), className)} {...props} />
);
