"use client"

import { ChevronLeft } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { SidebarSubmenuLink } from "@/components/layout/sidebar/inc/part/sidebar-submenu-link"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import { cn } from "@/lib/utils"

type SidebarMenuFolderType = {
  item: {
    id: string
    label: string
    url: string
    path: string
    subItems: {
      id: string
      label: string
      url: string
    }[]
  }
}

export function SidebarMenuFolder({ item }: SidebarMenuFolderType) {
  const pathname = usePathname()
  const isActive = pathname.includes(item.path)
  const [isOpen, setIsOpen] = useState(isActive)

  useEffect(() => {
    if (isActive) {
      setIsOpen(true)
    }
  }, [isActive])

  return (
    <Collapsible
      className="group/collapsible"
      onOpenChange={setIsOpen}
      open={isOpen}
      title={item.label}
    >
      <SidebarGroup
        className={cn("p-0", isOpen && "rounded-md bg-transparent")}
      >
        <SidebarGroupLabel
          asChild
          className={cn(
            "group/label h-9 cursor-pointer text-base text-muted-foreground transition-colors hover:bg-sidebar-accent/40 hover:text-sidebar-accent-foreground",
            { "text-sidebar-accent-foreground": isOpen }
          )}
        >
          <CollapsibleTrigger>
            {item.label}
            <ChevronLeft className="group-data-[state=open]/collapsible:-rotate-90 ml-auto transition-transform" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent className="rounded-b-md">
          <SidebarMenuSub className="mx-2 gap-0">
            {item.subItems.map((subItem) => (
              <SidebarMenuSubItem key={subItem.label}>
                <SidebarSubmenuLink label={subItem.label} url={subItem.url} />
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
