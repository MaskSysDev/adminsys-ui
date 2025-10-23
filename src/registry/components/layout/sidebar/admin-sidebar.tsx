"use client"

import Link from "next/link"
import type * as React from "react"

import { ScrollArea } from "@/components/ui/scroll-area"

import { adminSidebar } from "@/config/site-config"
import { SidebarNavMain } from "@/registry/components/layout/sidebar/inc/sidebar-nav-main"
import { SidebarNavSecondary } from "@/registry/components/layout/sidebar/inc/sidebar-nav-secondary"
import { SidebarNavUser } from "@/registry/components/layout/sidebar/inc/sidebar-nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/registry/components/shared/sidebar"

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="border-none">
      <SidebarHeader className="flex flex-col gap-3 px-4 py-3">
        <Link
          className="mr-4 rounded-md outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          href="/"
        >
          <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-all">
            <div className="flex shrink-0 items-center gap-2">
              {adminSidebar.logoIcon && (
                <div className="flex aspect-square items-center justify-center rounded-md bg-sidebar-primary p-1 text-sidebar-primary-foreground">
                  {adminSidebar.logoIcon}
                </div>
              )}

              {adminSidebar.logo && (
                <span className="shrink-0 font-bold text-3xl leading-normal">
                  {adminSidebar.logo}
                </span>
              )}
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="overflow-hidden">
        <ScrollArea className="h-2/3 p-4">
          <SidebarNavMain sections={adminSidebar.sections} />
        </ScrollArea>
        <SidebarNavSecondary
          className="mt-auto"
          items={adminSidebar.navSecondary}
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarNavUser
          email={"admin@email.com"}
          image={"/assets/images/avatar/avatar.jpg"}
          name={"Admin 01"}
        />
      </SidebarFooter>
    </Sidebar>
  )
}
