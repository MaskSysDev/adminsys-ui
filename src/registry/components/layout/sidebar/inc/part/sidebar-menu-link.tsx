"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarMenuButton,
  useSidebar,
} from "@/registry/components/shared/sidebar"
import { cn } from "@/registry/lib/cn"

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
          "h-9 font-medium text-base text-muted-foreground transition-colors hover:bg-accent/50 hover:text-accent-foreground/80 active:bg-accent/50",
          isActive && "bg-primary/10 text-primary"
        )}
        onClick={() => setOpenMobile(false)}
      >
        <Link href={url}>{label}</Link>
      </SidebarMenuButton>
    </SidebarGroup>
  )
}
