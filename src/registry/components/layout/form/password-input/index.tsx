"use client"

import { Eye, EyeOff } from "lucide-react"
import { forwardRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { cn } from "@/lib/utils"

export type PasswordInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
>

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
      <div className="relative rounded-md">
        <Input
          className={cn(className)}
          ref={ref}
          type={showPassword ? "text" : "password"}
          {...props}
          autoComplete="off"
        />
        <Button
          className="-translate-y-1/2 absolute top-1/2 right-1 size-6 rounded-md text-muted-foreground"
          onClick={() => setShowPassword((prev) => !prev)}
          size="icon"
          type="button"
          variant="ghost"
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </Button>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
