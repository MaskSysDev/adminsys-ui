import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site-config"

export const revalidate = false

// biome-ignore lint/suspicious/useAwait: This async function lacks an await expression.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string): string => new URL(path, siteConfig.url).toString()

  return [
    {
      url: url("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
