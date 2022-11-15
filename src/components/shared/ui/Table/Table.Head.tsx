interface TableHeadProps extends React.HTMLAttributes<HTMLElement> {}

export const TableHead: React.FC<TableHeadProps> = ({ ...props }) => (
  <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400" {...props} />
);
