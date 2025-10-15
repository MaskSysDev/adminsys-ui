import { AdminNavbar } from "@/registry/components/layout/navbar/admin-navbar"
import { SidebarProvider } from "@/registry/components/shared/sidebar"

export default function AdminNavbarDemo() {
  return (
    <SidebarProvider className="min-h-64 w-full">
      <AdminNavbar />
    </SidebarProvider>
  )
}
