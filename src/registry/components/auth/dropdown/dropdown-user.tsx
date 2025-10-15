"use client"

import { LogOut, User2Icon } from "lucide-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type DropdownUserProps = {
  user: {
    id: string
    name: string
    email: string
    image: string | null | undefined
    lastName: string
    role: string
  }
}

export function DropdownUser({ user }: DropdownUserProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="cursor-pointer rounded-full"
          size="icon"
          variant="secondary"
        >
          <Avatar className="h-8 w-8 rounded-full">
            {user.image && (
              <AvatarImage
                alt={user.name}
                className="object-cover object-center"
                src={user.image}
              />
            )}
            <AvatarFallback className="rounded-full">
              <User2Icon className="text-muted-foreground" />
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">User Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              {user.image && <AvatarImage alt={user.name} src={user.image} />}
              <AvatarFallback className="rounded-lg">
                <User2Icon className="text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="line-clamp-1 truncate font-medium">
                {user.name}
              </span>
              <span className="line-clamp-1 truncate text-muted-foreground text-xs">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            asChild
            className="cursor-pointer transition-colors"
          >
            <Link href={"/settings/profile"}>Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className="cursor-pointer transition-colors"
          >
            <Link href={"/settings/account"}>Account</Link>
          </DropdownMenuItem>
          {user.role === "admin" && (
            <DropdownMenuItem
              asChild
              className="cursor-pointer transition-colors"
            >
              <Link href={"/admin/dashboard"}>Dashboard</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer transition-colors">
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
