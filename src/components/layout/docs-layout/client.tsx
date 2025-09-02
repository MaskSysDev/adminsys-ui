"use client"

import { useNav } from "fumadocs-ui/contexts/layout"
import { useSidebar } from "fumadocs-ui/contexts/sidebar"
import { Sidebar as SidebarIcon } from "lucide-react"
import type { ComponentProps } from "react"

import { SidebarCollapseTrigger } from "@/components/layout/docs-layout/sidebar"
import { SearchToggle } from "@/components/layout/docs-layout/toggle/search-toggle"
import { buttonVariants } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export function Navbar(props: ComponentProps<"header">) {
  const { isTransparent } = useNav()

  return (
    <header
      id="nd-subnav"
      {...props}
      className={cn(
        "fixed inset-x-0 top-(--fd-banner-height) z-30 flex items-center border-b ps-4 pe-2.5 backdrop-blur-sm transition-colors",
        !isTransparent && "bg-fd-background/80",
        props.className
      )}
    >
      {props.children}
    </header>
  )
}

export function LayoutBody(props: ComponentProps<"main">) {
  const { collapsed } = useSidebar()

  return (
    <main
      id="nd-docs-layout"
      {...props}
      className={cn(
        "flex flex-1 flex-col pt-(--fd-nav-height) transition-[padding]",
        !collapsed && "mx-(--fd-layout-offset)",
        props.className
      )}
      style={{
        ...props.style,
        paddingInlineStart: collapsed
          ? "min(calc(100vw - var(--fd-page-width)), var(--fd-sidebar-width))"
          : "var(--fd-sidebar-width)",
      }}
    >
      {props.children}
    </main>
  )
}

export function CollapsibleControl() {
  const { collapsed } = useSidebar()

  return (
    <div
      className={cn(
        "fixed z-10 flex rounded-xl border bg-fd-muted p-0.5 text-fd-muted-foreground shadow-lg transition-opacity max-md:hidden max-xl:end-4 xl:start-4",
        !collapsed && "pointer-events-none opacity-0"
      )}
      style={{
        top: "calc(var(--fd-banner-height) + var(--fd-tocnav-height) + var(--spacing) * 4)",
      }}
    >
      <SidebarCollapseTrigger
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "icon",
            className: "cursor-pointer rounded-lg",
          })
        )}
      >
        <SidebarIcon />
      </SidebarCollapseTrigger>
      <SearchToggle className="rounded-lg" hideIfDisabled />
    </div>
  )
}
