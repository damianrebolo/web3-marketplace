import { cva, cx, VariantProps } from "cva";
import { Field, FieldAttributes } from "formik";

const fromListItemCva = cva(["cursor-pointer"], undefined);
export interface FormListItemProps extends FieldAttributes<any>, VariantProps<typeof fromListItemCva> {
  className: string;
}

export const FormListItem: React.FC<FormListItemProps> = ({ className, ...props }) => (
  <Field className={cx(fromListItemCva(), className)} {...props} />
);
