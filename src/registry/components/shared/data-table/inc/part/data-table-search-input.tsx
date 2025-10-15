"use client"

import { X } from "lucide-react"
import type { ChangeEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type DataTableSearchInputProps = {
  name: string
  setNameAction: (name: string) => void
  placeholder?: string // Adicionada a prop placeholder
}

export function DataTableSearchInput({
  name,
  setNameAction,
  placeholder = "Search...", // Usando um valor padrão para placeholder
}: DataTableSearchInputProps) {
  return (
    <div className="relative w-fit rounded-md md:w-64">
      <Input
        className="h-8 w-full lg:w-[250px]"
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setNameAction(event.target.value)
        }
        placeholder={placeholder} // Usando a prop placeholder
        value={name ?? ""}
      />
      {name && (
        <Button
          className="-translate-y-1/2 absolute top-1/2 right-2 size-6 cursor-pointer rounded-md text-muted-foreground"
          onClick={() => setNameAction("")}
          size="icon"
          type="button"
          variant="ghost"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  )
}
