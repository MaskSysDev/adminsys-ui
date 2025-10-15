import type { ReactNode } from "react"

export type NavItem = {
  label?: string
  href?: string
}

export type Navbar = {
  label?: string
  logo?: ReactNode | string
  logoIcon?: ReactNode
  logoResponsive?: boolean
  position?: string // "start" | "left" | "center" | "right" | "end"
  navItems?: NavItem[]
}
