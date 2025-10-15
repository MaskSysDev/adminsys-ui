"use client"

import { SidebarIcon, User2Icon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type React from "react"
import { useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

import { cn } from "@/lib/utils"

import { Container } from "@/registry/components/shared/container"

const userSettingsSidebar = {
  items: [
    {
      id: "1",
      label: "Profile",
      url: "/settings/profile",
    },
    {
      id: "2",
      label: "Account",
      url: "/settings/account",
    },
  ],
}

type NavItemProps = {
  label: string
  href: string
  active?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

function NavItem({ label, href, active, onClick }: NavItemProps) {
  return (
    <Link
      className={`flex items-center space-x-3 rounded-md px-3 py-2 font-medium text-base text-muted-foreground transition-colors md:text-sm ${
        active
          ? "border-primary border-l-2 bg-sidebar-accent/40 text-primary"
          : "text-muted-foreground hover:bg-sidebar-accent/40 hover:text-sidebar-foreground"
      }`}
      href={href}
      onClick={onClick}
    >
      <span className="truncate">{label}</span>
    </Link>
  )
}

function SidebarContent({
  onClick,
}: {
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined
}) {
  const pathname = usePathname()

  return (
    <div className="h-full overflow-y-auto py-4">
      <div className="space-y-4 md:space-y-6">
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 flex-shrink-0 md:h-12 md:w-12">
            <AvatarImage src={"/assets/images/avatar/avatar.jpg"} />
            <AvatarFallback className="rounded-full">
              <User2Icon />
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h2 className="line-clamp-1 truncate font-semibold text-base md:text-lg">
              Admin 01
            </h2>
            <p className="line-clamp-1 truncate text-muted-foreground text-xs md:text-sm">
              admin@email.com
            </p>
          </div>
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="space-y-1">
          <div className="space-y-1 pr-4">
            {userSettingsSidebar.items.map((item) => (
              <NavItem
                active={pathname === item.url}
                href={item.url}
                key={item.id}
                label={item.label}
                onClick={onClick}
              />
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Container className="flex flex-1 flex-col gap-4 pt-16" size="2xl">
      <div className="flex">
        {/* Mobile Sidebar Settings*/}
        <Sheet onOpenChange={setSidebarOpen} open={sidebarOpen}>
          {/* TODO: Reposicionar Trigger mobile Sidebar Settings */}
          <Button
            className={cn(
              "absolute top-2 left-4 flex h-8 w-8 cursor-pointer text-muted-foreground md:hidden"
            )}
            onClick={() => setSidebarOpen(true)}
            size="icon"
            variant="ghost"
          >
            <SidebarIcon />
            <span className="sr-only">Menu Settings</span>
          </Button>
          <SheetContent
            className="w-(--sidebar-width) bg-sidebar pl-4 text-sidebar-foreground"
            data-mobile="true"
            data-sidebar="sidebar"
            data-slot="sidebar"
            side="left"
            style={
              {
                "--sidebar-width": "18rem",
              } as React.CSSProperties
            }
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Nav Settings</SheetTitle>
              <SheetDescription>Displays the mobile Settings.</SheetDescription>
            </SheetHeader>
            <SidebarContent onClick={() => setSidebarOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <div className="hidden min-h-screen w-64 border-r md:block">
          <SidebarContent />
        </div>

        {/* Main Content */}
        <div className="w-full flex-1 md:w-auto">
          <div className="md:pl-4">
            <div className="mx-auto max-w-full">{children}</div>
          </div>
        </div>
      </div>
    </Container>
  )
}
