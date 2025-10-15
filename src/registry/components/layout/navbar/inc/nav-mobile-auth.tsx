"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"

import { cn } from "@/lib/utils"

import { NavMobileNavUser } from "@/registry/components/layout/navbar/inc/part/nav-mobile-nav-user"
import type { Navbar, NavItem } from "@/registry/components/layout/navbar/types"
import type { SessionData } from "@/registry/components/layout/navbar/types/session-data"

function NavMobileItem({ label = "label", href = "#" }: NavItem) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        className={cn(
          "h-9 px-4 font-medium text-base text-muted-foreground",
          pathname === href ? "bg-primary/10 text-primary" : null
        )}
        onClick={() => setOpenMobile(false)}
      >
        <Link href={href}>
          <span>{label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

interface NavMobileAuthProps
  extends React.ComponentProps<typeof Sidebar>,
    Navbar {}

export function NavMobileAuth({
  label,
  logo,
  logoIcon,
  logoResponsive,
  navItems,
  ...props
}: NavMobileAuthProps) {
  const { setOpenMobile } = useSidebar()

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

  return (
    <Sidebar {...props}>
      <SidebarHeader className="relative">
        <div className="flex items-center gap-2 px-2 py-2">
          <Link
            className="rounded-md outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            href="/"
            onClick={() => setOpenMobile(false)}
          >
            <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-all">
              <div className="flex shrink-0 items-center gap-2">
                {logoIcon && (
                  <div className="flex aspect-square items-center justify-center rounded-md bg-sidebar-primary p-1 text-sidebar-primary-foreground">
                    {logoIcon}
                  </div>
                )}

                {logo && (
                  <span
                    className={cn(
                      "shrink-0 font-bold text-3xl leading-normal",
                      logoResponsive && logoIcon && "hidden md:flex"
                    )}
                  >
                    {logo}
                  </span>
                )}
              </div>
            </div>
          </Link>
        </div>
        <Button
          className="absolute top-2 right-2 size-7 cursor-pointer text-muted-foreground"
          onClick={() => setOpenMobile(false)}
          size="icon"
          variant="ghost"
        >
          <X />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems?.map((item) => (
                <NavMobileItem
                  href={item.href}
                  key={item.href}
                  label={item.label}
                />
              ))}

              {!session && (
                <>
                  <Button
                    asChild
                    onClick={() => setOpenMobile(false)}
                    size="sm"
                  >
                    <Link href={"/auth/sign-in"}>Sign in</Link>
                  </Button>
                  <Button
                    asChild
                    onClick={() => setOpenMobile(false)}
                    size="sm"
                    variant="outline"
                  >
                    <Link href={"/auth/sign-up"}>Sign up</Link>
                  </Button>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {session && <NavMobileNavUser user={session?.user} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
