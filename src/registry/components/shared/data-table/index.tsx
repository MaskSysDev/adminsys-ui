import {
  type Cell,
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type HeaderGroup,
  type OnChangeFn,
  type Row,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
import { useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "@/registry/components/shared/data-table/inc/data-table-pagination"
import { DataTableToolbar } from "@/registry/components/shared/data-table/inc/data-table-toolbar"
import { LoadingSpinner } from "@/registry/components/shared/loading/loading-spinner"

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  page: number
  perPage: number
  pageCount: number
  setPage: (page: number) => void
  setPerPage: (perPage: number) => void
  setSort: (sort: SortingState) => void
  setName: (name: string) => void
  name: string
  sort: SortingState
  isLoading: boolean
  columnVisibility: VisibilityState
  setColumnVisibility: OnChangeFn<VisibilityState>
  filterParams: string
  setFilterParams: (filterParams: string) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  page,
  perPage,
  pageCount,
  setPage,
  setPerPage,
  setSort,
  setName,
  name,
  sort,
  isLoading,
  columnVisibility,
  setColumnVisibility,
  filterParams,
  setFilterParams,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sort,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination: {
        pageIndex: page - 1,
        pageSize: perPage,
      },
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        setSort(updater(table.getState().sorting))
      } else {
        setSort(updater)
      }
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    pageCount,
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newPagination = updater(table.getState().pagination)
        setPage(newPagination.pageIndex + 1)
        setPerPage(newPagination.pageSize)
      } else {
        const newPagination = updater
        setPage(newPagination.pageIndex + 1)
        setPerPage(newPagination.pageSize)
      }
    },
  })

  return (
    <div className="flex h-[38rem] w-full flex-col gap-4">
      <DataTableToolbar
        filterParams={filterParams}
        name={name}
        setColumnVisibilityAction={setColumnVisibility}
        setFilterParamsAction={setFilterParams}
        setNameAction={setName}
        table={table}
      />
      <div className="flex flex-2/3 flex-col overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 z-10 outline-1 outline-border">
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<TData>) => (
              <TableRow
                className="bg-card px-4 hover:bg-card"
                key={headerGroup.id}
              >
                {headerGroup.headers.map(
                  (header: HeaderGroup<TData>["headers"][number]) => {
                    return (
                      <TableHead
                        className="px-4"
                        colSpan={header.colSpan}
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  }
                )}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-muted-foreground">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: Row<TData>) => (
                <TableRow
                  className="hover:text-foreground"
                  data-state={row.getIsSelected() && "selected"}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell: Cell<TData, unknown>) => (
                    <TableCell
                      className="min-w-fit max-w-48 truncate px-4 py-1.5"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center hover:bg-card"
                  colSpan={columns.length}
                >
                  {isLoading ? <LoadingSpinner /> : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        setPage={setPage}
        setPerPage={setPerPage}
        table={table}
      />
    </div>
  )
}
