import { RootProvider } from "fumadocs-ui/provider"

import { DocsLayout } from "@/components/layout/docs-layout"

import { source } from "@/lib/source"

import { baseOptions } from "./layout.shared"

export default function Layout({ children }: LayoutProps<"/docs">) {
  return (
    <RootProvider>
      <DocsLayout tree={source.pageTree} {...baseOptions()}>
        {children}
      </DocsLayout>
    </RootProvider>
  )
}
