import { siteConfig } from "@/config/site-config"

export const dynamic = "force-static"

export function GET() {
  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>${siteConfig.name}</title>
      <link>${siteConfig.url}</link>
      <description>${siteConfig.description}</description>
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "text/xml",
    },
  })
}
