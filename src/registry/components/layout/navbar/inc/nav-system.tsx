"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

import { cn } from "@/lib/utils"

import { ToggleTheme } from "@/registry/components/shared/toggle/toggle-theme"

export function NavSystem({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-5 items-center gap-1", className)}>
      <ToggleTheme className="flex" />
      <Separator className={cn("flex md:hidden")} orientation="vertical" />
      <SidebarTrigger className="flex size-8 cursor-pointer text-muted-foreground md:hidden" />
    </div>
  )
}
