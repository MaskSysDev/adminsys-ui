import type { Table } from "@tanstack/react-table"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type DataTablePaginationProps<TData> = {
  table: Table<TData>
  setPage: (page: number) => void
  setPerPage: (perPage: number) => void
}

const PAGE_SIZE_5 = 5
const PAGE_SIZE_10 = 10
const PAGE_SIZE_20 = 20
const PAGE_SIZE_30 = 30
const PAGE_SIZE_40 = 40
const PAGE_SIZE_50 = 50
const PAGE_SIZES = [
  PAGE_SIZE_5,
  PAGE_SIZE_10,
  PAGE_SIZE_20,
  PAGE_SIZE_30,
  PAGE_SIZE_40,
  PAGE_SIZE_50,
]

export function DataTablePagination<TData>({
  table,
  setPage,
  setPerPage,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      {/* Rows Selected */}
      <div className="flex min-w-fit flex-1 text-sm">
        <div className="flex items-center space-x-2">
          <Select
            onValueChange={(value) => {
              setPerPage(Number(value))
            }}
            value={`${table.getState().pagination.pageSize}`}
          >
            <SelectTrigger className="h-8 w-[70px] cursor-pointer" size="sm">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {PAGE_SIZES.map((pageSize) => (
                <SelectItem
                  className="cursor-pointer"
                  key={pageSize}
                  value={`${pageSize}`}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="hidden font-medium text-muted-foreground text-sm lg:flex">
            Rows per page
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-end gap-2">
        <div className="hidden w-[100px] items-center justify-center font-medium text-muted-foreground text-sm lg:flex">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="hidden h-8 w-8 cursor-pointer p-0 lg:flex"
            disabled={!table.getCanPreviousPage()}
            onClick={() => setPage(1)}
            variant="outline"
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            className="h-8 w-8 cursor-pointer p-0"
            disabled={!table.getCanPreviousPage()}
            onClick={() => setPage(table.getState().pagination.pageIndex)}
            variant="outline"
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            className="h-8 w-8 cursor-pointer p-0"
            disabled={!table.getCanNextPage()}
            onClick={() => setPage(table.getState().pagination.pageIndex + 2)}
            variant="outline"
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            className="hidden h-8 w-8 cursor-pointer p-0 lg:flex"
            disabled={!table.getCanNextPage()}
            onClick={() => setPage(table.getPageCount())}
            variant="outline"
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
