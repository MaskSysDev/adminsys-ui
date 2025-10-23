"use client"

import { SidebarMenuFolder } from "@/registry/components/layout/sidebar/inc/part/sidebar-menu-folder"
import { SidebarMenuLink } from "@/registry/components/layout/sidebar/inc/part/sidebar-menu-link"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/registry/components/shared/sidebar"

type SidebarNavMainType = {
  sections: {
    id: string
    label: string
    items: {
      id: string
      label: string
      url: string
      path: string
      subItems: {
        id: string
        label: string
        url: string
      }[]
    }[]
  }[]
}

export function SidebarNavMain({ sections }: SidebarNavMainType) {
  return (
    <>
      {sections.map((section) => (
        <SidebarGroup className="p-0" key={section.id}>
          {section.label.length ? (
            <SidebarGroupLabel className="text-muted-foreground/60">
              {section.label}
            </SidebarGroupLabel>
          ) : null}

          <SidebarMenu>
            {section.items.map((item) => (
              <SidebarMenuItem key={item.id}>
                {item.subItems.length ? (
                  <SidebarMenuFolder item={item} />
                ) : (
                  <SidebarMenuLink label={item.label} url={item.url} />
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  )
}
