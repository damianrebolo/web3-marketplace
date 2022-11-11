import { cx, cva, type VariantProps } from "cva";

import { AlertBody } from "./Alert.Body";
import { AlertHeading } from "./Alert.Heading";
import { AlertActions } from "./Alert.Actions";

const alertCva = cva("fixed top-4 left-0 right-0 z-50 w-full max-w-lg mx-auto p-4 mb-4 border rounded-lg", {
  variants: {
    variant: {
      primary: "border-blue-800 bg-blue-300 text-black",
      secondary: "border-gray-800 bg-gray-300 text-black",
      success: "border-green-800 bg-green-300 text-black",
      danger: "border-red-800 bg-red-300 text-black",
      warning: "border-yellow-800 bg-yellow-300 text-black",
      info: "border-sky-800 bg-sky-300 text-black",
      light: "border-zinc-400 bg-zinc-100 text-black",
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
