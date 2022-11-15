import { Table } from "@tanstack/react-table";
import { LeftArrowIcon, RightArrowIcon } from "components/shared/icons";

interface Props<T> {
  table: Table<T>;
  tableRows: number;
}

export const TablePagination = <T extends {}>({ table, tableRows }: Props<T>) => (
  <div className="flex flex-col items-center">
    <span className="text-sm text-gray-700 dark:text-gray-400">
      Showing{" "}
      <span className="font-semibold text-gray-900 dark:text-white">
        {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
      </span>{" "}
      to{" "}
      <span className="font-semibold text-gray-900 dark:text-white">
        {(table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize}
      </span>{" "}
      of <span className="font-semibold text-gray-900 dark:text-white">{tableRows}</span>
    </span>
    <div className="inline-flex mt-2 xs:mt-0">
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
      >
        <LeftArrowIcon />
        Prev
      </button>
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
      >
        Next
        <RightArrowIcon />
      </button>
    </div>
  </div>
);
