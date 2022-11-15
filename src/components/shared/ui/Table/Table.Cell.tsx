interface TableCellProps extends React.HTMLAttributes<HTMLElement> {
  header?: boolean;
}

export const TableCell: React.FC<TableCellProps> = ({ header = false, ...props }) => (
  <th className={`${header ? "py-3 px-6" : "py-4 px-6"}`} {...props} />
);
