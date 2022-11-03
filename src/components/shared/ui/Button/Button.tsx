import { cva, type VariantProps } from "cva";

const button = cva(["flex justify-center items-center font-semibold rounded-md text-white"], {
  variants: {
    variant: {
      primary: "bg-blue-500 hover:bg-blue-600",
      secondary: "bg-gray-500 hover:bg-gray-600",
      success: "bg-green-500 hover:bg-green-600",
      danger: "bg-red-500 hover:bg-red-600",
      warning: "bg-yellow-500 hover:bg-yellow-600 text-black",
      info: "bg-sky-500 hover:bg-sky-600 text-black",
      dark: "bg-black hover:bg-gray-900",
      light: "bg-zinc-100 hover:bg-zinc-200 text-black",
      link: "text-blue-500 hover:text-blue-600 underline underline-offset-4",
    },
    size: {
      sm: "text-sm py-1 px-2",
      lg: "text-lg py-2 px-4",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "lg",
  },
});

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({ variant, size, ...props }) => (
  <button className={button({ variant, size })} {...props} />
);
