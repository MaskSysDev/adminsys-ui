import { ChevronsDownUpIcon, ChevronsUpDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Separator } from "@/components/ui/separator"

import { SimpleTooltip } from "@/registry/components/shared/tooltip/simple-tooltip"
import { cn } from "@/registry/lib/cn"

export function CodeCollapsibleWrapper({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Collapsible>) {
  return (
    <Collapsible
      className={cn("group/collapsible not-prose relative my-6", className)}
      {...props}
    >
      <CollapsibleTrigger asChild>
        <div className="absolute top-6 right-10 z-10 flex items-center gap-2">
          <SimpleTooltip content="Expand Code">
            <Button
              className="size-6 cursor-pointer rounded-md text-muted-foreground hover:text-foreground"
              size="icon"
              variant="secondary"
            >
              <ChevronsDownUpIcon className="hidden group-data-[state=open]/collapsible:block" />
              <ChevronsUpDownIcon className="hidden group-data-[state=closed]/collapsible:block" />
            </Button>
          </SimpleTooltip>

          <Separator
            className="data-[orientation=vertical]:h-4"
            orientation="vertical"
          />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent
        className="overflow-hidden data-[state=closed]:max-h-80 data-[state=closed]:rounded-b-lg [&>figure]:my-0"
        forceMount
      >
        {children}
      </CollapsibleContent>

      <SimpleTooltip content="Expand Code">
        <CollapsibleTrigger className="absolute inset-x-0 bottom-0 flex h-24 cursor-pointer items-end justify-center rounded-b-lg bg-linear-to-t from-25% from-background to-transparent pb-4 font-medium text-muted-foreground text-sm group-data-[state=open]/collapsible:hidden">
          Expand
        </CollapsibleTrigger>
      </SimpleTooltip>
    </Collapsible>
  )
}
