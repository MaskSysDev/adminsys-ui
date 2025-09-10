"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar"

import { cn } from "@/lib/utils"

type SidebarMenuLinkType = {
  label: string
  url: string
}

export function SidebarMenuLink({ label, url }: SidebarMenuLinkType) {
  const pathname = usePathname()
  const isActive = pathname === url
  const { setOpenMobile } = useSidebar()

  return (
    <SidebarGroup className="p-0">
      <SidebarMenuButton
        asChild
        className={cn(
          "h-9 font-medium text-base text-muted-foreground transition-colors hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground active:bg-sidebar-accent/40",
          isActive && "bg-primary/10 text-primary"
        )}
        onClick={() => setOpenMobile(false)}
      >
        <Link href={url}>{label}</Link>
      </SidebarMenuButton>
    </SidebarGroup>
  )
}
