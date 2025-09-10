import type { ReactNode } from "react"

import { TailwindIndicator } from "@/components/dev/tailwind-indicator"
import {
  Footer01,
  type Footer01Props,
} from "@/components/layout/footer/footer-01"
import type { NavbarAuth01Type } from "@/components/layout/navbar/types"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"

import { NavMobileAuth } from "@/registry/components/layout/navbar/inc/nav-mobile-auth"
import { NavbarAuth01 } from "@/registry/components/layout/navbar/navbar-auth-01"

export type AuthLayoutProps = {
  navbar?: NavbarAuth01Type
  footer?: Footer01Props
  children: ReactNode
}

export function AuthLayout({
  navbar,
  children,
  footer,
}: Readonly<AuthLayoutProps>) {
  return (
    <SidebarProvider open={false}>
      <NavMobileAuth
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
            <NavbarAuth01 navbar={navbar} />
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
