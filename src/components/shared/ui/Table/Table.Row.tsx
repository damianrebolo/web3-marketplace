interface TableRowProps extends React.HTMLAttributes<HTMLElement> {
  header?: boolean;
  isClickable?: boolean;
}

export const TableRow: React.FC<TableRowProps> = ({ header = false, isClickable = false, ...props }) => (
  <tr
    className={`${isClickable ? "cursor-pointer" : ""} ${
      header ? "" : "bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:dark:bg-gray-600"
    }`}
    {...props}
  />
);
