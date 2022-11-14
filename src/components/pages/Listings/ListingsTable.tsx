/* eslint-disable react/jsx-key */
import { memo, useMemo } from "react";
import Image from "next/image";
import { Column, usePagination, useSortBy, useTable } from "react-table";
import { DirectListing } from "@thirdweb-dev/sdk";

import { Table } from "components/shared/ui/Table";
import { cutAddress } from "utils";
import { useRender } from "hooks";

interface Props {
  listings: DirectListing[];
  columns: Array<Column<DirectListing>>;
}

export const ListingTable: React.FC<Props> = memo(({ listings, columns }) => {
  useRender("ListingTable");

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,

    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: listings,
      initialState: { pageIndex: 0 },

      autoResetPage: false,
    },
    usePagination
  );

  return (
    <>
      <Table {...getTableProps()}>
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
      </Table>
      <div className="flex flex-col items-center">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing <span className="font-semibold text-gray-900 dark:text-white">{pageIndex * pageSize + 1}</span> to{" "}
          <span className="font-semibold text-gray-900 dark:text-white">{(pageIndex + 1) * pageSize}</span> of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">{listings.length}</span>
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              previousPage();
            }}
            disabled={!canPreviousPage}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
          >
            <svg
              aria-hidden="true"
              className="mr-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            Prev
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
          >
            Next
            <svg
              aria-hidden="true"
              className="ml-2 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
});

ListingTable.displayName = "ListingsTable";
