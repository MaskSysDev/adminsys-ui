"use client"

import { usePathname } from "fumadocs-core/framework"
import Link from "fumadocs-core/link"
import { useSidebar } from "fumadocs-ui/contexts/sidebar"
import type { SidebarTab } from "fumadocs-ui/utils/get-sidebar-tabs"
import { Check, ChevronsUpDown } from "lucide-react"
import { type ComponentProps, type ReactNode, useMemo, useState } from "react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { isTabActive } from "@/lib/is-active"
import { cn } from "@/lib/utils"

export interface Option extends SidebarTab {
  props?: ComponentProps<"a">
}

export function RootToggle({
  options,
  placeholder,
  ...props
}: {
  placeholder?: ReactNode
  options: Option[]
} & ComponentProps<"button">) {
  const [open, setOpen] = useState(false)
  const { closeOnRedirect } = useSidebar()
  const pathname = usePathname()

  const selected = useMemo(() => {
    // biome-ignore lint/nursery/noShadow: This variable shadows another variable with the same name in the outer scope.
    return options.findLast((item) => isTabActive(item, pathname))
  }, [options, pathname])

  const onClick = () => {
    closeOnRedirect.current = false
    setOpen(false)
  }

  const item = selected ? (
    <>
      <div className="size-9 shrink-0 md:size-5">{selected.icon}</div>
      <div>
        <p className="line-clamp-1 font-medium text-foreground/80 text-sm">
          {selected.title}
        </p>
        <p className="line-clamp-1 text-[13px] text-muted-foreground empty:hidden md:hidden">
          {selected.description}
        </p>
      </div>
    </>
  ) : (
    placeholder
  )

  return (
    <Popover onOpenChange={setOpen} open={open}>
      {item && (
        <PopoverTrigger
          {...props}
          className={cn(
            "flex w-full cursor-pointer items-center gap-2 rounded-md border bg-secondary/50 p-2 text-start text-foreground/80 transition-colors hover:bg-accent data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
            props.className
          )}
        >
          {item}
          <ChevronsUpDown className="ms-auto size-4 shrink-0 text-muted-foreground" />
        </PopoverTrigger>
      )}
      <PopoverContent className="flex w-(--radix-popover-trigger-width) flex-col gap-1 overflow-hidden p-1">
        {/** biome-ignore lint/suspicious/useIterableCallbackReturn: This callback passed to map() iterable method should always return a value. */}
        {/** biome-ignore lint/nursery/noShadow: This variable shadows another variable with the same name in the outer scope. */}
        {options.map((item) => {
          const isActive = selected && item.url === selected.url
          if (!isActive && item.unlisted) {
            return
          }

          return (
            <Link
              href={item.url}
              key={item.url}
              onClick={onClick}
              {...item.props}
              className={cn(
                "flex items-center gap-2 rounded-lg p-1.5 hover:bg-accent hover:text-accent-foreground",
                item.props?.className
              )}
            >
              <div className="size-9 shrink-0 md:mt-1 md:mb-auto md:size-5">
                {item.icon}
              </div>
              <div>
                <p className="line-clamp-1 font-medium text-foreground/80 text-sm">
                  {item.title}
                </p>
                <p className="line-clamp-1 text-[13px] text-muted-foreground empty:hidden">
                  {item.description}
                </p>
              </div>

              <Check
                className={cn(
                  "ms-auto size-3.5 shrink-0 text-primary",
                  !isActive && "invisible"
                )}
              />
            </Link>
          )
        })}
      </PopoverContent>
    </Popover>
  )
}
