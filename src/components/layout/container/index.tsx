import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

const containerVariants = cva("p-4", {
  variants: {
    center: {
      true: "mx-auto",
    },
    size: {
      sm: "container max-w-screen-sm",
      md: "container max-w-screen-md",
      lg: "container max-w-screen-lg",
      xl: "container max-w-screen-xl",
      "2xl": "container max-w-screen-2xl",
      full: "w-full p-0",
    },
  },
  defaultVariants: {
    size: "xl",
    center: true,
  },
})

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

function Container({ className, size, center, ...props }: ContainerProps) {
  return (
    <div
      className={cn(containerVariants({ size, center }), className)}
      {...props}
    />
  )
}

export { Container, containerVariants, type ContainerProps }
