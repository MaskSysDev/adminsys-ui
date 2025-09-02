"use client"

import type { VariantProps } from "class-variance-authority"
import { useI18n } from "fumadocs-ui/contexts/i18n"
import { useSearchContext } from "fumadocs-ui/contexts/search"
import { Search } from "lucide-react"
import type { ComponentProps } from "react"

import { buttonVariants } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export type ButtonProps = VariantProps<typeof buttonVariants>

interface SearchToggleProps
  extends Omit<ComponentProps<"button">, "color">,
    ButtonProps {
  hideIfDisabled?: boolean
}

export function SearchToggle({
  hideIfDisabled,
  size = "icon",
  variant = "ghost",
  ...props
}: SearchToggleProps) {
  const { setOpenSearch, enabled } = useSearchContext()
  if (hideIfDisabled && !enabled) {
    return null
  }

  return (
    <button
      aria-label="Open Search"
      className={cn(
        buttonVariants({
          size,
          variant,
        }),
        props.className
      )}
      data-search=""
      onClick={() => {
        setOpenSearch(true)
      }}
      type="button"
    >
      <Search />
    </button>
  )
}

export function LargeSearchToggle({
  hideIfDisabled,
  ...props
}: ComponentProps<"button"> & {
  hideIfDisabled?: boolean
}) {
  const { enabled, hotKey, setOpenSearch } = useSearchContext()
  const { text } = useI18n()
  if (hideIfDisabled && !enabled) {
    return null
  }

  return (
    <button
      data-search-full=""
      type="button"
      {...props}
      className={cn(
        "inline-flex w-full cursor-pointer items-center gap-2 rounded-md border bg-secondary/50 p-1.5 ps-2 text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
        props.className
      )}
      onClick={() => {
        setOpenSearch(true)
      }}
    >
      <Search className="size-4" />
      {text.search}
      <div className="ms-auto inline-flex gap-0.5">
        {hotKey.map((k, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Avoid using the index of an array as key property in an element.
          <kbd className="rounded-md border bg-background px-1.5" key={i}>
            {k.display}
          </kbd>
        ))}
      </div>
    </button>
  )
}
