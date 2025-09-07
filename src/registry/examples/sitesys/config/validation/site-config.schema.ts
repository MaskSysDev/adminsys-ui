import { z } from "zod"

export const siteConfigSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  url: z.url().optional(),
  locale: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  twitterHandle: z.string().optional(),
  favicon: z.string(),
  favicon16x16: z.string(),
  favicon32x32: z.string(),
  favicon180x180: z.string(),
  favicon192x192: z.string(),
  favicon512x512: z.string(),
  logo: z.string().optional(),
  logoLight: z.string().optional(),
  logoDark: z.string().optional(),
  manifest: z.string().optional(),
  author: z.string(),
  authorUrl: z.url(),
  creator: z.string(),
  publisher: z.string(),
  projectUrl: z.url(),
  contactEmail: z.email(),
  supportEmail: z.email(),
  project: z
    .object({
      url: z.url().optional(),
      author: z.string().optional(),
      authorUrl: z.url().optional(),
    })
    .optional(),
  docsRepositoryBase: z.url().optional(),
  socialLinks: z
    .array(
      z.object({
        label: z.string(),
        href: z.url(),
        icon: z.unknown(),
      })
    )
    .optional(),
})
