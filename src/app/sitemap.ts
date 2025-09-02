import type { MetadataRoute } from "next"

import { source } from "@/lib/source"

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
    {
      url: url("/docs/get-started"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url("/docs/fumadocs-ui"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: url("/docs/components"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...source.getPages().map((page) => {
      const { lastModified } = page.data

      return {
        url: url(page.url),
        lastModified: lastModified ? new Date(lastModified) : undefined,
        changeFrequency: "weekly",
        priority: 0.5,
      } as MetadataRoute.Sitemap[number]
    }),
  ]
}
