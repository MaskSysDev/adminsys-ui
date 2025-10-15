import type { Column } from "@tanstack/react-table"
import {
  ArrowDownNarrowWideIcon,
  ArrowDownUpIcon,
  ArrowUpDown,
  ArrowUpNarrowWideIcon,
  EyeOffIcon,
} from "lucide-react"
import type React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { cn } from "@/registry/lib/cn"

interface DataTableColumnHeaderProps<TData>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  column: Column<TData>
  title: React.ReactNode
}

export function DataTableColumnHeader<TData>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData>) {
  if (!column.getCanSort()) {
    return <div className={cn("ml-0.5", className)}>{title}</div>
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {typeof title === "string" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="-ml-2 h-8 cursor-pointer data-[state=open]:bg-accent"
              size="sm"
              variant="ghost"
            >
              <span>{title}</span>
              {column.getIsSorted() === "desc" && (
                <ArrowDownNarrowWideIcon className="ml-2 h-4 w-4 text-muted-foreground" />
              )}
              {column.getIsSorted() === "asc" && (
                <ArrowUpNarrowWideIcon className="ml-2 h-4 w-4 text-muted-foreground" />
              )}
              {column.getIsSorted() === false && (
                <ArrowDownUpIcon className="ml-2 h-4 w-4 text-muted-foreground" />
              )}{" "}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => column.toggleSorting(false)}
            >
              <ArrowUpNarrowWideIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => column.toggleSorting(true)}
            >
              <ArrowDownNarrowWideIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Desc
            </DropdownMenuItem>
            {column.getIsSorted() && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => column.clearSorting()}
                >
                  <ArrowUpDown className="mr-2 size-3.5 text-muted-foreground/70" />
                  Reset
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => column.toggleVisibility(false)}
            >
              <EyeOffIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />{" "}
              Hide
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        // If title is not a string (e.g., a ReactNode like FacetedFilter), render it directly
        title
      )}
    </div>
  )
}
