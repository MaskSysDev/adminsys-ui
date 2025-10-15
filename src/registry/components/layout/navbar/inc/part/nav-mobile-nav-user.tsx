"use client"

import { ChevronsUpDown, LogOut, User2Icon } from "lucide-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/registry/components/shared/sidebar"

type NavMobileNavUserProps = {
  user?: {
    id: string
    name: string
    email: string
    image: string | null | undefined
    lastName: string
    role: "user" | "admin"
  }
}

export function NavMobileNavUser({ user }: NavMobileNavUserProps) {
  const { isMobile, setOpenMobile } = useSidebar()

  const handleLogout = () => {
    setOpenMobile(false)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="cursor-pointer text-muted-foreground transition-colors hover:bg-sidebar-accent/40 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {user?.image && (
                  <AvatarImage alt={user.name} src={user.image} />
                )}
                <AvatarFallback className="rounded-lg">
                  <User2Icon className="text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tights">
                <span className="line-clamp-1 truncate font-medium">
                  {user?.name}
                </span>
                <span className="line-clamp-1 truncate text-xs">
                  {user?.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {user?.image && (
                    <AvatarImage alt={user.name} src={user.image} />
                  )}
                  <AvatarFallback className="rounded-lg">
                    <User2Icon className="text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="line-clamp-1 truncate font-medium">
                    {user?.name}
                  </span>
                  <span className="line-clamp-1 truncate text-muted-foreground text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                asChild
                className="cursor-pointer transition-colors"
                onClick={() => setOpenMobile(false)}
              >
                <Link href="/settings/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="cursor-pointer transition-colors"
                onClick={() => setOpenMobile(false)}
              >
                <Link href="/settings/account">Account</Link>
              </DropdownMenuItem>
              {user?.role === "admin" && (
                <DropdownMenuItem
                  asChild
                  className="cursor-pointer transition-colors"
                  onClick={() => setOpenMobile(false)}
                >
                  <Link href={"/admin/dashboard"}>Dashboard</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer transition-colors"
              onClick={handleLogout}
            >
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
