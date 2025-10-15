import { Home } from "lucide-react"

import { NavbarAuth01 } from "@/registry/components/layout/navbar/navbar-auth-01"
import { SidebarProvider } from "@/registry/components/shared/sidebar"

export default function Navbar01Demo() {
  const navbar = {
    logo: "LogoNav",
    logoIcon: <Home />,
    logoResponsive: true,
    label: "LogoNav",
    position: "end",
    navItems: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "About",
        href: "/about",
      },
    ],
  }

  return (
    <SidebarProvider className="min-h-64 w-full">
      <NavbarAuth01 navbar={navbar} />
    </SidebarProvider>
  )
}
