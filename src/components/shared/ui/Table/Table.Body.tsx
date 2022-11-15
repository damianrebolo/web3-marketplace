interface TableBodyProps extends React.HTMLAttributes<HTMLElement> {}

export const TableBody: React.FC<TableBodyProps> = ({ ...props }) => <tbody {...props} />;
