import type { JSX, SVGProps } from "react"

import { cn } from "@/registry/lib/cn"

export type SocialIconLinkProps = {
  label: string
  href: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

export function SocialIconLink({
  href,
  icon: Icon,
  label,
  ...props
}: SocialIconLinkProps & React.ComponentProps<"a">) {
  return (
    <a
      {...props}
      aria-label={label}
      className={cn(
        "group h-10 w-max items-center justify-center rounded-md py-2",
        "font-semibold text-sm transition ease-in-out",
        "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
        "text-muted-foreground hover:text-accent-foreground focus-visible:text-accent-foreground",
        "hover:bg-transparent"
      )}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icon />
    </a>
  )
}
