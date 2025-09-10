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
  name: string
  email: string
  image?: string
}

export function DropdownUser({ name, email, image }: DropdownUserProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="cursor-pointer rounded-full"
          size="icon"
          variant="secondary"
        >
          <Avatar className="h-8 w-8 rounded-full">
            {image && (
              <AvatarImage
                alt={name}
                className="aspect-square size-full"
                src={image}
              />
            )}
            <AvatarFallback className="rounded-full">
              <User2Icon />
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">User Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              {image && <AvatarImage alt={name} src={image} />}
              <AvatarFallback className="rounded-lg">
                <User2Icon />
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="line-clamp-1 truncate font-medium">{name}</span>
              <span className="line-clamp-1 truncate text-muted-foreground text-xs">
                {email}
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
