import type { HTMLAttributes } from "react"

import { cn } from "@/registry/lib/cn"

export function Wrapper(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "prose-no-margin rounded-lg border border-primary/10 bg-radial-[at_bottom] from-primary/20 bg-origin-border p-4 dark:bg-black/20",
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
