import { memo, MouseEventHandler } from "react";
import { DirectListing } from "@thirdweb-dev/sdk";
import { Column, RowPropGetter, usePagination, useTable } from "react-table";

// TODO: Move to Table
import { Pagination } from "./Pagination";
import { Loading } from "components/shared/core";

interface Props {
  data: DirectListing[];
  columns: Array<Column<DirectListing>>;
  pagination?: boolean;
  isLoading: boolean;
  onRowClicked: (obj: DirectListing) => void;
}

export const Table: React.FC<Props> = memo(({ data, columns, pagination, isLoading, onRowClicked }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    rows,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },

      autoResetPage: false,
    },
    usePagination
  );
  return (
    <>
      {pagination && (
        <Pagination
          pageIndex={pageIndex}
          pageSize={pageSize}
          rowsLength={rows.length}
          canPreviousPage={canPreviousPage}
          previousPage={previousPage}
          canNextPage={canNextPage}
          nextPage={nextPage}
        />
      )}
      <div className="overflow-x-auto relative my-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400" {...getTableProps()}>
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} className="py-3 px-6">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => onRowClicked(row.original)}
                  className="cursor-pointer bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:dark:bg-gray-600"
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="py-4 px-6">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {isLoading && <Loading />}
      </div>
    </>
  );
});
