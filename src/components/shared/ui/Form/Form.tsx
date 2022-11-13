import { cva, type VariantProps } from "cva";

import { FormControl } from "./Form.Control";
import { FormFile } from "./Form.File";
import { FormGroup } from "./Form.Group";
import { FormList } from "./Form.List";

const formCva = cva(["mx-auto flex flex-col items-center my-4"], {
  variants: {
    size: {
      sx: "max-w-xs",
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement>, VariantProps<typeof formCva> {}

export const Form: React.FC<FormProps> = ({ size, onSubmit, ...props }) => (
  <form onSubmit={onSubmit} className={formCva({ size })} {...props} />
);

export default Object.assign(Form, {
  Group: FormGroup,
  Control: FormControl,
  File: FormFile,
  List: FormList,
});
