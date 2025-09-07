import type { ReactNode } from "react"

export type NavItemType = {
  label?: string
  href?: string
}

export type Navbar01Type = {
  logo?: ReactNode | string
  logoIcon?: ReactNode
  logoResponsive?: boolean
  label?: string
  position?: string // "start" | "left" | "center" | "right" | "end"
  navItems?: NavItemType[]
}

export type NavbarAuth01Type = {
  logo?: ReactNode | string
  logoIcon?: ReactNode
  logoResponsive?: boolean
  label?: string
  position?: string // "start" | "left" | "center" | "right" | "end"
  navItems?: NavItemType[]
}
