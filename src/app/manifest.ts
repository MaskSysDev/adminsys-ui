import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site-config"

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: siteConfig.name,
    name: siteConfig.name,
    description: siteConfig.description,
    icons: [
      {
        src: "/assets/images/icon/icon.svg",
        type: "image/svg+xml",
        sizes: "any",
        purpose: "any",
      },
      {
        src: "/assets/images/icon/icon-192x192.png",
        type: "image/png",
        sizes: "192x192",
        purpose: "any",
      },
      {
        src: "/assets/images/icon/icon-512x512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "any",
      },
      {
        src: "/assets/images/icon/icon-512x512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
    ],
    id: "/?utm_source=pwa",
    start_url: "/?utm_source=pwa",
    display: "standalone",
    scope: "/",
    screenshots: [
      {
        src: "/assets/images/screenshot/screenshot-mobile-dark.png",
        type: "image/png",
        sizes: "440x956",
        form_factor: "narrow",
      },
      {
        src: "/assets/images/screenshot/screenshot-mobile-light.png",
        type: "image/png",
        sizes: "440x956",
        form_factor: "narrow",
      },
      {
        src: "/assets/images/screenshot/screenshot-desktop-dark.png",
        type: "image/png",
        sizes: "1920x1080",
        form_factor: "wide",
      },
      {
        src: "/assets/images/screenshot/screenshot-desktop-light.png",
        type: "image/png",
        sizes: "1920x1080",
        form_factor: "wide",
      },
    ],
  }
}
