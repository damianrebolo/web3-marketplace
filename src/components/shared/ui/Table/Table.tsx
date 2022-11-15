import { TableContainer } from "./Table.Container";
import { TableBody } from "./Table.Body";
import { TableCell } from "./Table.Cell";
import { TableHead } from "./Table.Head";
import { TableRow } from "./Table.Row";
import { TablePagination } from "./Table.Pagination";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

const Table: React.FC<TableProps> = ({ ...props }) => (
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" {...props} />
);

export default Object.assign(Table, {
  Container: TableContainer,
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  Pagination: TablePagination,
});
