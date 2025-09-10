import { SidebarProvider } from "@/components/ui/sidebar"

import { AdminNavbar } from "@/registry/components/layout/navbar/admin-navbar"

export default function AdminNavbarDemo() {
  return (
    <SidebarProvider className="min-h-64 w-full">
      <AdminNavbar />
    </SidebarProvider>
  )
}
