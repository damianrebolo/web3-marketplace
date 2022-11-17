import { cx } from "cva";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  col: number;
}

export const FormCol: React.FC<Props> = ({ className, col, ...props }) => (
  <div className={cx(`${`col-span-${col}`}`, className)} {...props} />
);
