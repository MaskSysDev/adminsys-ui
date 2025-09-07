import type { HTMLAttributes, JSX } from "react"

export type SiteMeta = {
  name: string
  description?: string
  url?: string
  locale?: string
  keywords?: string[]
  twitterHandle?: string
}

export type Assets = {
  favicon: string
  favicon16x16: string
  favicon32x32: string
  favicon180x180: string
  favicon192x192: string
  favicon512x512: string
  logo?: string
  logoLight?: string
  logoDark?: string
  manifest?: string
}

export type SocialLink = {
  label: string
  href: string
  icon: (props: HTMLAttributes<SVGElement>) => JSX.Element
}

export type ContactInfo = {
  contactEmail: string
  supportEmail: string
}

export type AuthorInfo = {
  author: string
  authorUrl: string
  creator: string
  publisher: string
  projectUrl: string
}

export interface SiteConfig extends SiteMeta, Assets, ContactInfo, AuthorInfo {
  ogImage?: string
  authors?: { name: string; url: string }[]

  project?: {
    url?: string
    author?: string
    authorUrl?: string
  }
  docsRepositoryBase?: string
  socialLinks?: SocialLink[]
}
