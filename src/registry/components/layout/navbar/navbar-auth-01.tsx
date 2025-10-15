import { NavMainAuth } from "@/registry/components/layout/navbar/inc/nav-main-auth"
import { NavSystemAuth } from "@/registry/components/layout/navbar/inc/nav-system-auth"
import { NavLogo } from "@/registry/components/layout/navbar/inc/part/nav-logo"
import type { Navbar } from "@/registry/components/layout/navbar/types"
import { Container } from "@/registry/components/shared/container"

export type NavbarAuth01Props = {
  navbar: Navbar
}

export function NavbarAuth01({ navbar }: NavbarAuth01Props) {
  const shouldApplyFullWidth = !(
    navbar.navItems ||
    navbar.logo ||
    navbar.logoIcon
  )

  return (
    <div className="fixed top-0 z-50 flex h-16 w-full shrink-0 items-center border-border/60 border-b backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <Container className="flex items-center justify-center" size="2xl">
        <div className="relative flex w-full items-center justify-between gap-2">
          <NavLogo navbar={navbar} />

          {navbar.navItems && (
            <NavMainAuth items={navbar.navItems} position={navbar.position} />
          )}

          <NavSystemAuth
            className={shouldApplyFullWidth ? "w-full justify-end" : undefined}
          />
        </div>
      </Container>
    </div>
  )
}
