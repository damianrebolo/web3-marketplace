import { cva, VariantProps } from "cva";

const formContainerCva = cva(["mx-auto flex flex-col items-center my-4"], {
  variants: {
    size: {
      sx: "max-w-xs",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
    },
  },
  defaultVariants: {
    size: "2xl",
  },
});

export interface FormContainerProps
  extends React.FormHTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formContainerCva> {}

export const FormContainer: React.FC<FormContainerProps> = ({ size, onSubmit, ...props }) => (
  <div className={formContainerCva({ size })} {...props} />
);
