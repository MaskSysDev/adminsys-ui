import type { Metadata } from "next/types"

import { siteConfig } from "@/config/site-config"

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: siteConfig.url,
      images: "/banner.png",
      siteName: siteConfig.name,
      ...override.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.author,
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      images: "/banner.png",
      ...override.twitter,
    },
    alternates: {
      types: {
        "application/rss+xml": [
          {
            title: siteConfig.name,
            url: siteConfig.url ?? "http://localhost:3000",
          },
        ],
      },
      ...override.alternates,
    },
  }
}
