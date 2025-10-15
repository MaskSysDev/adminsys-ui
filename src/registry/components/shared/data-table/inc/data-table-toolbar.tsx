"use client"

import type { Table, VisibilityState } from "@tanstack/react-table"

import { DataTableSearchInput } from "@/registry/components/shared/data-table/inc/part/data-table-search-input"
import { DataTableViewOptions } from "@/registry/components/shared/data-table/inc/part/data-table-view-options"

type DataTableToolbarProps<TData> = {
  table: Table<TData>
  name: string
  setNameAction: (name: string) => void
  setColumnVisibilityAction: (visibility: VisibilityState) => void
  filterParams: string
  setFilterParamsAction: (filterParams: string) => void
}

export function DataTableToolbar<TData>({
  table,
  name,
  setNameAction,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <DataTableSearchInput
          name={name}
          placeholder="Filtrar por nome..."
          setNameAction={setNameAction}
        />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
