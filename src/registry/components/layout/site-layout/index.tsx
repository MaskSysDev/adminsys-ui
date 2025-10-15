import type { ReactNode } from "react"

import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

import { TailwindIndicator } from "@/registry/components/dev/tailwind-indicator"
import {
  Footer01,
  type Footer01Props,
} from "@/registry/components/layout/footer/footer-01"
import { NavMobile } from "@/registry/components/layout/navbar/inc/nav-mobile"
import { Navbar01 } from "@/registry/components/layout/navbar/navbar-01"
import type { Navbar } from "@/registry/components/layout/navbar/types"

export type SiteLayoutProps = {
  navbar?: Navbar
  footer?: Footer01Props
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

        {footer && <Footer01 {...footer} />}
      </div>
      <Toaster />
      <TailwindIndicator />
    </SidebarProvider>
  )
}
