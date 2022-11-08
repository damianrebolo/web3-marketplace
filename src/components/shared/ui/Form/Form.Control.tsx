import { cva, type VariantProps } from "cva";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

const fromControlCva = cva(
  ["w-80 mt-4 bg-transparent border border-solid border-gray-500 rounded-lg text-white h-12 py-0 px-4 text-base"],
  {
    variants: {
      controlSize: {
        sm: "text-sm py-1 px-2",
        lg: "text-lg py-2 px-4",
      },
    },
    defaultVariants: {
      controlSize: "lg",
    },
  }
);

export interface FormControlProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    VariantProps<typeof fromControlCva> {}

export const FormControl: React.FC<FormControlProps> = ({ controlSize, ...props }) => (
  <input className={fromControlCva({ controlSize })} {...props} />
);
