import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";

import { Loading } from "components/shared/core";
import Table from "./Table";

type TableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  pagination: boolean;
  isClickable?: boolean;
  onRowClicked?: (obj: T) => Promise<boolean>;
};

export const ReactTable = <T extends object>({
  data,
  columns,
  pagination,
  isClickable = false,
  onRowClicked,
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {pagination && <Table.Pagination table={table} tableRows={data.length} />}

      <Table.Container>
        <Table>
          <Table.Head>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id} header>
                {headerGroup.headers.map((header) => (
                  <Table.Cell header key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Head>
          <Table.Body>
            {table.getRowModel().rows.map((row) => (
              <Table.Row
                key={row.id}
                isClickable={isClickable}
                onClick={() => isClickable && onRowClicked && onRowClicked(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Table.Container>
    </>
  );
};
