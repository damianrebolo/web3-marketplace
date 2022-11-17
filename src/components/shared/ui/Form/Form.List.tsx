import { cx } from "cva";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export const FormList: React.FC<Props> = ({ className, ...props }) => (
  <div className={cx("grid grid-cols-4 gap-4", className)} {...props} />
);
