"use client"

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { AuthButton } from "@/registry/components/auth/button/auth-button"
import { NavItemLink } from "@/registry/components/layout/navbar/inc/part/nav-item-link"
import type { NavItem } from "@/registry/components/layout/navbar/types"
import type { SessionData } from "@/registry/components/layout/navbar/types/session-data"
import { cn } from "@/registry/lib/cn"

type NavMainAuthProps = {
  position?: string
  items: NavItem[]
  className?: string
}

export function NavMainAuth({ position, items, className }: NavMainAuthProps) {
  const { data: session }: { data: SessionData } = {
    data: {
      session: {
        expiresAt: new Date(),
        token: "token",
        userAgent: null,
      },
      user: {
        id: "string",
        name: "string",
        lastName: "string",
        email: "string",
        image: null,
        role: "admin",
      },
    },
  }

  if (items.length === null) {
    return null
  }

  return (
    <div
      className={cn(
        "hidden w-full items-center justify-start md:flex",
        {
          "justify-start": position === "start" || position === "left",
          "justify-center": position === "center",
          "justify-end": position === "end" || position === "right",
        },
        className
      )}
    >
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {items.map((item) => (
            <NavItemLink href={item.href} key={item.href} label={item.label} />
          ))}
        </NavigationMenuList>
        {!session && <AuthButton />}
      </NavigationMenu>
    </div>
  )
}
