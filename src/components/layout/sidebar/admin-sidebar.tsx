"use client"

import Link from "next/link"
import type * as React from "react"

import { Logo } from "@/components/layout/logo/logo-adminsys"
import { SidebarNavMain } from "@/components/layout/sidebar/inc/sidebar-nav-main"
import { SidebarNavSecondary } from "@/components/layout/sidebar/inc/sidebar-nav-secondary"
import { SidebarNavUser } from "@/components/layout/sidebar/inc/sidebar-nav-user"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"

const adminSidebar = {
  id: "1",
  label: "AdminSys",
  logo: <Logo.Theme />,
  logoIcon: <Logo.Icon className="size-6" />,
  sections: [
    {
      id: "2",
      label: "Admin",
      items: [
        {
          id: "3",
          label: "Dashboard",
          url: "/admin/dashboard",
          path: "",
          subItems: [],
        },
        {
          id: "4",
          label: "Folder 01",
          url: "",
          path: "/folder-01",
          subItems: [
            {
              id: "5",
              label: "Submenu-01",
              url: "/admin/folder-01/submenu-01",
            },
            {
              id: "6",
              label: "Submenu-02",
              url: "/admin/folder-01/submenu-02",
            },
          ],
        },
      ],
    },
  ],
  navSecondary: [
    {
      id: "1",
      label: "Documentation",
      url: "/docs",
    },
  ],
}

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
      <SidebarContent className="gap-0 overflow-hidden py-4 pl-1">
        <ScrollArea className="h-2/3">
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
