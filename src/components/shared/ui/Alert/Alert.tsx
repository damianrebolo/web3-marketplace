import { cx, cva, type VariantProps } from "cva";

import { AlertBody } from "./Alert.Body";
import { AlertHeading } from "./Alert.Heading";
import { AlertActions } from "./Alert.Actions";

const alertCva = cva("fixed top-4 left-0 right-0 z-50 w-full max-w-lg mx-auto p-4 mb-4 border rounded-lg", {
  variants: {
    variant: {
      //   primary: "bg-blue-500 hover:bg-blue-600",
      //   secondary: "bg-gray-500 hover:bg-gray-600",
      //   success: "bg-green-500 hover:bg-green-600",
      //   danger: "bg-red-500 hover:bg-red-600",
      warning: "border-yellow-800 bg-yellow-300 text-black",
      //   info: "bg-sky-500 hover:bg-sky-600 text-black",
      //   dark: "bg-gray-800 hover:bg-gray-900",
      //   light: "bg-zinc-100 hover:bg-zinc-200 text-black",
      //   link: "text-blue-500 hover:text-blue-600 underline underline-offset-4",
    },
  },
  defaultVariants: {
    variant: "warning",
  },
});

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertCva> {
  show: boolean;
}

const Alert: React.FC<AlertProps> = ({ show, variant, children, ...props }) => (
  <div className={cx(alertCva({ variant }), `${show ? "" : "hidden"}`)} {...props}>
    {children}
  </div>
);

export default Object.assign(Alert, {
  Heading: AlertHeading,
  Body: AlertBody,
  Actions: AlertActions,
});
