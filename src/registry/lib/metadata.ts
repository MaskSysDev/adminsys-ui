import type { Metadata } from "next/types"

import { siteConfig } from "@/config/site-config"

/**
 * Cria e mescla metadados para uma página.
 *
 * Esta função auxiliar facilita a criação de metadados para as páginas do Next.js,
 * mesclando metadados padrão do site (como Open Graph e Twitter cards) com
 * metadados específicos da página fornecidos através do parâmetro `override`.
 *
 * @param override - Um objeto de metadados específico da página para mesclar com os padrões.
 * @returns Um objeto de metadados completo para a página.
 */
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
