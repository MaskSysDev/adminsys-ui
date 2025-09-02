import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site-config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
