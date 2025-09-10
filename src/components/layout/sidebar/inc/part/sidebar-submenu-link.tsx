"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarMenuSubButton, useSidebar } from "@/components/ui/sidebar"

import { cn } from "@/lib/utils"

type SidebarSubmenuLinkType = {
  label: string
  url: string
}

export function SidebarSubmenuLink({ label, url }: SidebarSubmenuLinkType) {
  const pathname = usePathname()
  const isActive = pathname === url
  const { setOpenMobile } = useSidebar()

  return (
    <SidebarMenuSubButton
      asChild
      className={cn(
        "h-9 font-medium text-base text-muted-foreground transition-colors hover:bg-transparent hover:text-sidebar-accent-foreground active:bg-transparent",
        isActive && "text-primary"
      )}
      onClick={() => setOpenMobile(false)}
    >
      <Link href={url}>{label}</Link>
    </SidebarMenuSubButton>
  )
}
