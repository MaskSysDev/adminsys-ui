import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export interface BannerProps extends React.ComponentProps<"div"> {
  backgroundImage?: string
  backgroundFixed?: boolean
  gradientTop?: boolean
  gradientBottom?: boolean
  gradientTopClassName?: string
  gradientBottomClassName?: string
  size?: string
}

export function Banner({
  backgroundImage,
  backgroundFixed,
  gradientTop,
  gradientBottom,
  gradientTopClassName,
  gradientBottomClassName,
  size,
  className,
  children,
  ...props
}: BannerProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-auto w-full justify-center overflow-hidden",
        className
      )}
      data-slot="card"
      style={size ? { height: `${size}vh` } : { height: "auto" }}
      {...props}
    >
      {backgroundImage && (
        <div
          className={cn(
            `absolute inset-0 h-full overflow-hidden bg-center bg-cover bg-no-repeat bg-[url(${backgroundImage})]`,
            backgroundFixed ? "bg-fixed" : ""
          )}
        />
      )}

      {gradientTop && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b from-primary/10 via-45% via-transparent to-transparent",
            gradientTopClassName
          )}
        />
      )}

      {gradientBottom && (
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-background/20 via-45% via-transparent to-transparent",
            gradientBottomClassName
          )}
        />
      )}
      <Container className="relative">
        <div className="mx-auto flex h-full max-w-4xl flex-col justify-center gap-4 text-center">
          {children}
        </div>
      </Container>
    </div>
  )
}

export function BannerBadge({
  subTitle,
  subTitleColor,
}: {
  subTitle?: string
  subTitleColor?: string
}) {
  if (!(subTitle || subTitleColor)) {
    return null
  }

  return (
    <Badge
      className="mx-auto rounded-full px-3 py-1 font-medium text-sm shadow"
      variant="secondary"
    >
      {subTitle}
      {subTitleColor && (
        <span className="font-bold text-primary">{subTitleColor}</span>
      )}
    </Badge>
  )
}

export function BannerTitle({
  className,
  children,
  ...props
}: React.ComponentProps<"h2">) {
  if (!children) {
    return null
  }

  return (
    <h2
      {...props}
      className={cn(
        "mb-6 scroll-m-20 pb-2 font-bold text-4xl text-shadow-lg tracking-tight first:mt-0 sm:text-6xl md:text-7xl",
        className
      )}
    >
      {children}
    </h2>
  )
}

export function BannerDescription({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) {
  if (!children) {
    return null
  }

  return (
    <p
      {...props}
      className={cn(
        "mx-auto mb-8 max-w-2xl text-muted-foreground text-shadow-2xs text-xl",
        className
      )}
    >
      {children}
    </p>
  )
}

export type BannerActionsProps = {
  actions?: {
    action01?: {
      label?: string
      href?: string
    }
    action02?: {
      label?: string
      href?: string
    }
  }
}

export function BannerActions({ actions }: BannerActionsProps) {
  if (!actions) {
    return null
  }

  return (
    <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
      {actions.action01 && (
        <Button
          asChild
          className="w-full cursor-pointer px-8 text-base shadow-lg sm:w-fit"
          size="lg"
        >
          {actions.action01.href ? (
            <Link href={actions.action01.href}>{actions.action01.label}</Link>
          ) : (
            actions.action01.label
          )}
        </Button>
      )}

      {actions.action02 && (
        <Button
          asChild
          className="w-full cursor-pointer px-8 text-base shadow-lg sm:w-fit"
          size="lg"
          variant="secondary"
        >
          {actions.action02.href ? (
            <Link
              href={actions.action02.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {actions.action02.label}
            </Link>
          ) : (
            actions.action02.label
          )}
        </Button>
      )}
    </div>
  )
}
