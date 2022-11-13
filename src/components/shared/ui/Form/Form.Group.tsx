import { cva, type VariantProps } from "cva";

const formGroupCva = cva(["w-full m-1 flex flex-nowrap"], {
  variants: {
    direction: {
      row: "flex-row gap-2 items-center",
      col: "flex-col",
    },
  },
  defaultVariants: {
    direction: "col",
  },
});
export interface FormGroupProps extends React.FormHTMLAttributes<HTMLDivElement>, VariantProps<typeof formGroupCva> {}

export const FormGroup: React.FC<FormGroupProps> = ({ direction, ...props }) => (
  <div className={formGroupCva({ direction })} {...props} />
);
