export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Table: React.FC<TableProps> = ({ ...props }) => (
  <div className="overflow-x-auto relative my-10">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" {...props} />
  </div>
);
