import type { HTMLAttributes, JSX, ReactNode } from "react"

import { Container } from "@/components/layout/container"

import { cn } from "@/lib/utils"

type SocialIconLinkProps = {
  label: string
  href: string
  icon: (props: HTMLAttributes<SVGElement>) => JSX.Element
}

function SocialIconLink({ href, icon: Icon, label }: SocialIconLinkProps) {
  return (
    <a
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

type AuthorLinkProps = {
  href: string
  children: ReactNode
  className?: string
}

function AuthorLink({ href, children, className }: AuthorLinkProps) {
  return (
    <a
      className={cn(
        "group inline-flex h-10 w-max items-center justify-center rounded-md py-2",
        "font-semibold text-sm transition ease-in-out",
        "focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
        "disabled:pointer-events-none disabled:opacity-50",
        "data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
        "hover:bg-transparent hover:text-accent-foreground focus-visible:text-accent-foreground",
        className
      )}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="font-semibold">{children}</span>
    </a>
  )
}

export type Footer01Props = {
  footer: {
    author: string
    authorUrl: string
    name: string
    socialLinks?: SocialIconLinkProps[]
  }
}

export function Footer01({ footer }: Footer01Props) {
  return (
    <footer className="body-font static bottom-0 left-0 w-full border-border/60 border-t bg-background text-muted-foreground">
      <Container
        className="flex flex-col flex-wrap items-center py-2 sm:flex-row"
        size="2xl"
      >
        <p className="text-center text-sm sm:text-left">
          &copy;2025{" "}
          <AuthorLink className="text-foreground" href="/">
            {footer.name}
          </AuthorLink>{" "}
          by <AuthorLink href={footer.authorUrl}>{footer.author}</AuthorLink>
        </p>

        <span className="mt-2 inline-flex justify-center gap-4 sm:mt-0 sm:ml-auto sm:justify-start">
          {footer.socialLinks?.map((item) => (
            <SocialIconLink
              href={item.href}
              icon={item.icon}
              key={item.label}
              label={item.label}
            />
          ))}
        </span>
      </Container>
    </footer>
  )
}
