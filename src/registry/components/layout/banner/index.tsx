import Link from "next/link"
import type { ReactNode } from "react"

import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

export type BannerProps = {
  /**
   * The background image to display in the banner
   */
  backgroundImage?: string
  backgroundFixed?: boolean
  gradientTop?: boolean
  gradientBottom?: boolean
  gradientTopClassName?: string
  gradientBottomClassName?: string
  /**
   * Use from 1 to 100.
   * Example: "40" is equal to 40% of the viewport height.
   * @default auto
   */
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
}: BannerProps & React.ComponentProps<"div">) {
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
            "absolute inset-0 h-full overflow-hidden bg-center bg-cover bg-no-repeat",
            backgroundFixed ? "bg-fixed" : ""
          )}
          style={
            backgroundImage
              ? {
                  backgroundImage: `url(${backgroundImage})`,
                }
              : {}
          }
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

export type BannerBadgeProps = {
  subTitle?: string
  subTitleColor?: string
}

export function BannerBadge({ subTitle, subTitleColor }: BannerBadgeProps) {
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

export type BannerTitleProps = {
  className?: string
  children?: ReactNode
}

export function BannerTitle({
  className,
  children,
  ...props
}: BannerTitleProps & React.ComponentProps<"h2">) {
  if (!children) {
    return null
  }

  return (
    <h2
      {...props}
      className={cn(
        "scroll-m-20 pb-2 font-bold text-4xl text-shadow-lg tracking-tight first:mt-0 sm:text-6xl md:text-7xl",
        className
      )}
    >
      {children}
    </h2>
  )
}

export type BannerDescriptionProps = {
  className?: string
  children?: ReactNode
}

export function BannerDescription({
  className,
  children,
  ...props
}: BannerDescriptionProps & React.ComponentProps<"p">) {
  if (!children) {
    return null
  }

  return (
    <p
      {...props}
      className={cn(
        "mx-auto mb-4 max-w-2xl text-muted-foreground text-shadow-2xs text-xl",
        className
      )}
    >
      {children}
    </p>
  )
}

export type BannerActionsProps = {
  action01?: {
    label?: string
    href?: string
  }
  action02?: {
    label?: string
    href?: string
  }
}

export function BannerActions({ action01, action02 }: BannerActionsProps) {
  if (!(action01 || action02)) {
    return null
  }

  return (
    <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
      {action01 && (
        <Button
          asChild
          className="w-full cursor-pointer px-8 text-base shadow-lg sm:w-fit"
          size="lg"
        >
          {action01.href ? (
            <Link href={action01.href}>{action01.label}</Link>
          ) : (
            action01.label
          )}
        </Button>
      )}

      {action02 && (
        <Button
          asChild
          className="w-full cursor-pointer px-8 text-base shadow-lg sm:w-fit"
          size="lg"
          variant="secondary"
        >
          {action02.href ? (
            <Link
              href={action02.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {action02.label}
            </Link>
          ) : (
            action02.label
          )}
        </Button>
      )}
    </div>
  )
}
