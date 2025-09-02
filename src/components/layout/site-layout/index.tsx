import type { ReactNode } from "react"

import { TailwindIndicator } from "@/components/dev/tailwind-indicator"
import {
  Footer01,
  type Footer01Props,
} from "@/components/layout/footer/footer-01"
import { NavMobile } from "@/components/layout/navbar/inc/nav-mobile"
import { Navbar01 } from "@/components/layout/navbar/navbar-01"
import type { Navbar01Type } from "@/components/layout/navbar/types"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

export type SiteLayoutProps = {
  navbar?: Navbar01Type
  footer?: Footer01Props["footer"]
  children: ReactNode
}

export function SiteLayout({
  navbar,
  children,
  footer,
}: Readonly<SiteLayoutProps>) {
  return (
    <SidebarProvider open={false}>
      <NavMobile
        className="md:!hidden"
        label={navbar?.label}
        logo={navbar?.logo}
        logoIcon={navbar?.logoIcon}
        logoResponsive={!navbar?.logoResponsive}
        navItems={navbar?.navItems}
      />

      <div className="flex min-h-screen w-full flex-col">
        {navbar && (
          <header id="header">
            <Navbar01 navbar={navbar} />
          </header>
        )}

        <main className="flex-1">{children}</main>

        {footer && <Footer01 footer={footer} />}
      </div>
      <Toaster />
      <TailwindIndicator />
    </SidebarProvider>
  )
}
