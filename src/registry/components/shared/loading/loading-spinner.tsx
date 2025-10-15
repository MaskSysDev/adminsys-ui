import { Spinner } from "@/components/ui/spinner"

import { cn } from "@/registry/lib/cn"

export type LoadingSpinnerProps = {
  className?: string
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <span
      className={cn(
        "absolute inline-block min-w-max text-muted-foreground",
        className
      )}
    >
      <Spinner className="size-6" />
      <span className="sr-only">Loading...</span>
    </span>
  )
}
