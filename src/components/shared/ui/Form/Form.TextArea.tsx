import { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

import { useField } from "formik";
import { cva, cx, type VariantProps } from "cva";

const fromTextAreaCva = cva(
  ["w-full bg-transparent border border-solid border-gray-500 rounded-lg text-white py-2 px-4 text-base"],
  undefined
);

interface FormTextAreaProps
  extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
    VariantProps<typeof fromTextAreaCva> {
  name: string;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({ name, className, ...props }) => {
  const [field] = useField(name);
  return <textarea className={cx(fromTextAreaCva(), className)} {...field} name={name} {...props} />;
};
