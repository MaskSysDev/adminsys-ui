"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export function ToggleTheme({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      aria-label="Change theme"
      className={cn(
        "group size-8 cursor-pointer text-muted-foreground data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted",
        className
      )}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      size="icon"
      variant="ghost"
    >
      <MoonIcon className="hidden dark:block" size={16} />
      <SunIcon className="block dark:hidden" size={16} />
      <span className="sr-only">Change theme</span>
    </Button>
  )
}
