"use client"

import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

import { cn } from "@/lib/utils"

import { NavItemLink } from "@/registry/components/layout/navbar/inc/part/nav-item-link"
import type { NavItem } from "@/registry/components/layout/navbar/types"

type NavMainProps = {
  position?: string
  items: NavItem[]
  className?: string
}

export function NavMain({ position, items, className }: NavMainProps) {
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
      </NavigationMenu>
    </div>
  )
}
