import type { ReactNode } from "react"

import { TailwindIndicator } from "@/components/dev/tailwind-indicator"
import { AdminNavbar } from "@/components/layout/navbar/admin-navbar"
import { AdminSidebar } from "@/components/layout/sidebar/admin-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

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
