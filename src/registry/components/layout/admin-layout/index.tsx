import type { ReactNode } from "react"

import { Toaster } from "@/components/ui/sonner"

import { TailwindIndicator } from "@/registry/components/dev/tailwind-indicator"
import { AdminNavbar } from "@/registry/components/layout/navbar/admin-navbar"
import { AdminSidebar } from "@/registry/components/layout/sidebar/admin-sidebar"
import {
  SidebarInset,
  SidebarProvider,
} from "@/registry/components/shared/sidebar"

export type AdminLayoutProps = {
  children: ReactNode
}

export function AdminLayout({ children }: Readonly<AdminLayoutProps>) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <div className="flex min-h-screen w-full flex-col">
          <header id="header">
            <AdminNavbar />
          </header>

          <main className="flex-1">{children}</main>
        </div>
        <Toaster />
        <TailwindIndicator />
      </SidebarInset>
    </SidebarProvider>
  )
}
