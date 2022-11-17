import { cx } from "cva";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const FormGroup: React.FC<Props> = ({ className, ...props }) => (
  <div className={cx("w-full grid grid-cols-12 mt-5", className)} {...props} />
);
