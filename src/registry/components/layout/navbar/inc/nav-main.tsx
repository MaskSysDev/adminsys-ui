"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import type { NavItemType } from "@/components/layout/navbar/types"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { cn } from "@/lib/utils"

function NavItem({ label = "label", href = "#" }: NavItemType) {
  const pathname = usePathname()

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        asChild
        className={navigationMenuTriggerStyle({
          className: cn(
            "h-8 bg-transparent px-3 text-base text-muted-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground",
            pathname === href ? "text-primary" : null
          ),
        })}
      >
        <Link href={href}>{label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

type NavMainProps = {
  position?: string
  items: NavItemType[]
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
            <NavItem href={item.href} key={item.href} label={item.label} />
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
