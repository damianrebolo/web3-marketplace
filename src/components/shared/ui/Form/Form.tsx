import { cva, cx, type VariantProps } from "cva";
import { FormCol } from "./Form.Col";
import { FormContainer } from "./Form.Container";

import { FormControl } from "./Form.Control";
import { FormErrorMessage } from "./Form.ErrorMessage";
import { FormField } from "./Form.Field";
import { FormFile } from "./Form.File";
import { FormGroup } from "./Form.Group";
import { FormImagePreview } from "./Form.ImagePreview";
import { FormList } from "./Form.List";
import { FormListItem } from "./Form.ListItem";
import { FormTextArea } from "./Form.TextArea";
import { FormUpload } from "./Form.Upload";

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

export const Form: React.FC<FormProps> = ({ size, className, onSubmit, ...props }) => (
  <form onSubmit={onSubmit} className={cx(formCva({ size }), className)} {...props} />
);
export default Object.assign(Form, {
  Container: FormContainer,
  Group: FormGroup,
  Col: FormCol,
  Upload: FormUpload,
  ImagePreview: FormImagePreview,
  Field: FormField,
  TextArea: FormTextArea,
  ErrorMessage: FormErrorMessage,
  ListItem: FormListItem,

  File: FormFile,
  List: FormList,
  Control: FormControl,
});
