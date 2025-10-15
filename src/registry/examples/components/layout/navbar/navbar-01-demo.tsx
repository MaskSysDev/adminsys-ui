import { Home } from "lucide-react"

import { SidebarProvider } from "@/components/ui/sidebar"

import { Navbar01 } from "@/registry/components/layout/navbar/navbar-01"

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
      <Navbar01 navbar={navbar} />
    </SidebarProvider>
  )
}
