import { cva, cx, type VariantProps } from "cva";
import { ErrorMessage, ErrorMessageProps } from "formik";

const fromErrorCva = cva(["text-gray-700 dark:text-red-400 p-2 text-xs"], undefined);

export interface FormErrorProps extends ErrorMessageProps, VariantProps<typeof fromErrorCva> {}

export const FormErrorMessage: React.FC<FormErrorProps> = ({ name, className, ...props }) => (
  <ErrorMessage name={name} component="div" className={cx(fromErrorCva(), className)} {...props} />
);
