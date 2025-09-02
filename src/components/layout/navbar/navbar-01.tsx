import Link from "next/link"

import { Container } from "@/components/layout/container"
import { NavMain } from "@/components/layout/navbar/inc/nav-main"
import { NavSystem } from "@/components/layout/navbar/inc/nav-system"
import type { Navbar01Type } from "@/components/layout/navbar/types"

import { cn } from "@/lib/utils"

type Navbar01Props = {
  navbar: Navbar01Type
}

export function Navbar01({ navbar }: Navbar01Props) {
  const shouldApplyFullWidth = !(
    navbar.navItems ||
    navbar.logo ||
    navbar.logoIcon
  )

  return (
    <div className="fixed top-0 z-50 flex h-16 w-full shrink-0 items-center border-border/60 border-b backdrop-blur supports-[backdrop-filter]:bg-background/90">
      <Container className="flex items-center justify-center" size="2xl">
        <div className="relative flex w-full items-center justify-between gap-2">
          <Link
            className="mr-4 flex items-center rounded-md outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            href="/"
          >
            <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-all">
              <div className="flex shrink-0 items-center gap-2">
                {navbar.logoIcon && (
                  <div className="flex aspect-square items-center justify-center rounded-md bg-sidebar-primary p-1 text-sidebar-primary-foreground">
                    {navbar.logoIcon}
                  </div>
                )}

                {navbar.logo && (
                  <span
                    className={cn(
                      "shrink-0 font-bold text-3xl leading-normal",
                      navbar.logoResponsive &&
                        navbar.logoIcon &&
                        "hidden md:flex"
                    )}
                  >
                    {navbar.logo}
                  </span>
                )}
              </div>
            </div>
          </Link>

          {navbar.navItems && (
            <NavMain items={navbar.navItems} position={navbar.position} />
          )}

          <NavSystem
            className={shouldApplyFullWidth ? "w-full justify-end" : undefined}
          />
        </div>
      </Container>
    </div>
  )
}
