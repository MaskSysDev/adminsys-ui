import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"

import { cn } from "@/lib/utils"

import { navbar01 } from "@/config/site-config"

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium text-sm outline-none transition-all">
          <div className="flex shrink-0 items-center gap-2">
            {navbar01.logoIcon && (
              <div className="flex aspect-square items-center justify-center rounded-md bg-sidebar-primary p-1 text-sidebar-primary-foreground">
                {navbar01.logoIcon}
              </div>
            )}

            {navbar01.logo && (
              <span
                className={cn(
                  "shrink-0 font-bold text-3xl leading-normal",
                  navbar01.logoResponsive &&
                    navbar01.logoIcon &&
                    "hidden md:flex"
                )}
              >
                {navbar01.logo}
              </span>
            )}
          </div>
        </div>
      ),
    },
    // see https://fumadocs.dev/docs/ui/navigation/links
    links: [],
  }
}
