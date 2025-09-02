import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"
import {
  type ComponentPropsWithoutRef,
  type ComponentRef,
  forwardRef,
} from "react"

import { cn } from "@/lib/utils"

const ScrollArea = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    className={cn("overflow-hidden", className)}
    ref={ref}
    type="scroll"
    {...props}
  >
    {children}
    <ScrollAreaPrimitive.Corner />
    <ScrollBar orientation="vertical" />
  </ScrollAreaPrimitive.Root>
))

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollViewport = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Viewport
    className={cn("size-full rounded-[inherit]", className)}
    ref={ref}
    {...props}
  >
    {children}
  </ScrollAreaPrimitive.Viewport>
))

ScrollViewport.displayName = ScrollAreaPrimitive.Viewport.displayName

const ScrollBar = forwardRef<
  ComponentRef<typeof ScrollAreaPrimitive.Scrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.Scrollbar
    className={cn(
      "flex select-none data-[state=hidden]:animate-fd-fade-out",
      orientation === "vertical" && "h-full w-1.5",
      orientation === "horizontal" && "h-1.5 flex-col",
      className
    )}
    orientation={orientation}
    ref={ref}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-fd-border" />
  </ScrollAreaPrimitive.Scrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.Scrollbar.displayName

export { ScrollArea, ScrollBar, ScrollViewport }
