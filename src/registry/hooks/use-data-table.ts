import type {
  OnChangeFn,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"

const DEBOUNCE_DELAY_MS = 500

/**
 * Hook customizado para gerenciar o estado e a lógica de tabelas de dados (data tables).
 * Sincroniza o estado da tabela (paginação, ordenação, filtros, visibilidade de colunas) com os parâmetros da URL.
 */
export function useDataTable() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const perPage = Number(searchParams.get("per_page")) || 10
  const sortParam = searchParams.get("sort")
  const nameParam = searchParams.get("name") || ""
  const columnVisibilityParam = searchParams.get("column_visibility")
  const filterParamsParam = searchParams.get("filters") || ""

  const [name, setNameState] = useState(nameParam)
  const [filterParams, setFilterParamsState] = useState(filterParamsParam)
  const [debouncedName] = useDebounce(name, DEBOUNCE_DELAY_MS)
  const [debouncedFilterParams] = useDebounce(filterParams, DEBOUNCE_DELAY_MS)

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    if (debouncedName !== nameParam) {
      router.replace(
        `${pathname}?${createQueryString({ name: debouncedName, page: 1 })}`
      )
    }
  }, [debouncedName, nameParam, pathname, router, createQueryString])

  useEffect(() => {
    if (debouncedFilterParams !== filterParamsParam) {
      router.replace(
        `${pathname}?${createQueryString({ filters: debouncedFilterParams, page: 1 })}`
      )
    }
  }, [
    debouncedFilterParams,
    filterParamsParam,
    pathname,
    router,
    createQueryString,
  ])

  const setPage = (newPage: number) => {
    router.replace(`${pathname}?${createQueryString({ page: newPage })}`)
  }

  const setPerPage = (newPerPage: number) => {
    router.replace(`${pathname}?${createQueryString({ per_page: newPerPage })}`)
  }

  const setSort = (newSort: SortingState) => {
    const sortFormatted = newSort
      .map((s) => `${s.id}.${s.desc ? "desc" : "asc"}`)
      .join(",")
    router.replace(`${pathname}?${createQueryString({ sort: sortFormatted })}`)
  }

  const setName = (newName: string) => {
    setNameState(newName)
  }

  const setFilterParams = (newFilterParams: string) => {
    setFilterParamsState(newFilterParams)
  }

  const setColumnVisibility: OnChangeFn<VisibilityState> = (updater) => {
    const newVisibility =
      typeof updater === "function" ? updater(columnVisibility) : updater
    router.replace(
      `${pathname}?${createQueryString({
        column_visibility: JSON.stringify(newVisibility),
      })}`
    )
  }

  const sort: SortingState = sortParam
    ? sortParam.split(",").map((s) => {
        const [id, dir] = s.split(".")
        return { id, desc: dir === "desc" }
      })
    : []

  const columnVisibility: VisibilityState =
    columnVisibilityParam && columnVisibilityParam !== "undefined"
      ? (() => {
          try {
            return JSON.parse(columnVisibilityParam)
          } catch (_e) {
            return {}
          }
        })()
      : {}

  return {
    page,
    perPage,
    sort,
    name,
    filterParams,
    columnVisibility,
    setPage,
    setPerPage,
    setSort,
    setName,
    setFilterParams,
    setColumnVisibility,
  }
}
