import { cva, cx, type VariantProps } from "cva";
import { Field, FieldAttributes, useField } from "formik";

const fromFieldCva = cva(
  ["w-full bg-transparent border border-solid border-gray-500 rounded-lg text-white h-12 py-0 px-4 text-base"],
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

export interface FormFieldProps extends FieldAttributes<any>, VariantProps<typeof fromFieldCva> {}

export const FormField: React.FC<FormFieldProps> = ({ controlSize, className, ...props }) => {
  return <Field className={cx(fromFieldCva({ controlSize }), className)} {...props} />;
};
