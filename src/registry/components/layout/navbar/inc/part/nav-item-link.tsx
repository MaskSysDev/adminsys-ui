"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import type { NavItem } from "@/registry/components/layout/navbar/types"
import { cn } from "@/registry/lib/cn"

export function NavItemLink({ label = "label", href = "#" }: NavItem) {
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
