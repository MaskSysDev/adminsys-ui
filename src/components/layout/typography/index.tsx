import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type TypographyProps = {
  children: ReactNode
  className?: string
}

function TypographyH1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-balance text-center font-extrabold text-4xl tracking-tight",
        className
      )}
    >
      {children}
    </h1>
  )
}

function TypographyH2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  )
}

function TypographyH3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 font-semibold text-2xl tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  )
}

function TypographyH4({ children, className }: TypographyProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 font-semibold text-xl tracking-tight",
        className
      )}
    >
      {children}
    </h4>
  )
}

function TypographyP({ children, className }: TypographyProps) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  )
}

function TypographyBlockquote({ children, className }: TypographyProps) {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </blockquote>
  )
}

function TypographyInlineCode({ children, className }: TypographyProps) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm",
        className
      )}
    >
      {children}
    </code>
  )
}

function TypographyLead({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-muted-foreground text-xl", className)}>{children}</p>
  )
}

function TypographyLarge({ children, className }: TypographyProps) {
  return (
    <div className={cn("font-semibold text-lg", className)}>{children}</div>
  )
}

function TypographySmall({ children, className }: TypographyProps) {
  return (
    <small className={cn("font-medium text-sm leading-none", className)}>
      {children}
    </small>
  )
}

function TypographyMuted({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>
  )
}

export const Typography = {
  H1: TypographyH1,
  H2: TypographyH2,
  H3: TypographyH3,
  H4: TypographyH4,
  P: TypographyP,
  Blockquote: TypographyBlockquote,
  InlineCode: TypographyInlineCode,
  Lead: TypographyLead,
  Large: TypographyLarge,
  Small: TypographySmall,
  Muted: TypographyMuted,
}
