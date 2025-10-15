import Link from "next/link"
import type { MouseEventHandler } from "react"

import type { Navbar } from "@/registry/components/layout/navbar/types"
import { cn } from "@/registry/lib/cn"

type NavLogoProps = {
  navbar: Navbar
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
}

export function NavLogo({ navbar, onClick }: NavLogoProps) {
  return (
    <Link
      className="mr-4 flex items-center rounded-md outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
      href="/"
      onClick={onClick}
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
                navbar.logoResponsive && navbar.logoIcon && "hidden md:flex"
              )}
            >
              {navbar.logo}
            </span>
          )}
        </div>
      </div>
      <span className="sr-only">{navbar.label}</span>
    </Link>
  )
}
