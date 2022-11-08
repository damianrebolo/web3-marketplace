import { cva, cx, type VariantProps } from "cva";

const containerCva = cva("", {
  variants: {
    fluid: {
      true: "w-full",
      false: "container mx-auto px-5 sm:px-0",
    },
  },
  defaultVariants: {
    fluid: false,
  },
});

export interface ContainerProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof containerCva> {}

export const Container: React.FC<ContainerProps> = ({ fluid, className, ...props }) => (
  <section className={cx(containerCva({ fluid }), className)} {...props} />
);
