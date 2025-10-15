"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

import { DropdownUser } from "@/registry/components/auth/dropdown/dropdown-user"
import type { SessionData } from "@/registry/components/layout/navbar/types/session-data"
import { ToggleTheme } from "@/registry/components/shared/toggle/toggle-theme"
import { cn } from "@/registry/lib/cn"

export function NavSystemAuth({ className }: { className?: string }) {
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
    <div className={cn("flex h-5 items-center gap-1", className)}>
      <ToggleTheme className="flex" />

      {session && <DropdownUser user={session.user} />}

      <Separator
        className={cn("flex md:hidden", session && "ml-2")}
        orientation="vertical"
      />
      <SidebarTrigger className="flex size-8 cursor-pointer text-muted-foreground md:hidden" />
    </div>
  )
}
