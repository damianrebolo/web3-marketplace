export interface TableContainerProps extends React.HTMLAttributes<HTMLElement> {}

export const TableContainer: React.FC<TableContainerProps> = ({ ...props }) => (
  <section className="overflow-x-auto relative my-10" {...props} />
);

TableContainer.displayName = "Table.Container";
