import { Popup, PopupContent, PopupTrigger } from "fumadocs-twoslash/ui"
import { createGenerator } from "fumadocs-typescript"
import { AutoTypeTable } from "fumadocs-typescript/ui"
import { Accordion, Accordions } from "fumadocs-ui/components/accordion"
import { Banner } from "fumadocs-ui/components/banner"
import { Callout } from "fumadocs-ui/components/callout"
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"
import { File, Files, Folder } from "fumadocs-ui/components/files"
import { ImageZoom } from "fumadocs-ui/components/image-zoom"
import { InlineTOC } from "fumadocs-ui/components/inline-toc"
import { Step, Steps } from "fumadocs-ui/components/steps"
import {
  Tab,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "fumadocs-ui/components/tabs"
import { TypeTable } from "fumadocs-ui/components/type-table"
import defaultMdxComponents from "fumadocs-ui/mdx"
// biome-ignore lint/performance/noNamespaceImport: Avoid namespace imports, it can prevent efficient tree shaking and increase bundle size.
import * as icons from "lucide-react"
import type { MDXComponents } from "mdx/types"
import type { ComponentProps, FC } from "react"

import { DocsCategory } from "@/components/layout/docs-layout/category/docs-category"
import { GraphView } from "@/components/layout/docs-layout/graph/graph-view"
import { Wrapper } from "@/components/layout/docs-layout/preview/wrapper"

const generator = createGenerator()

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Accordions,
    Accordion,
    AutoTypeTable: (props) => (
      <AutoTypeTable {...props} generator={generator} />
    ),
    Banner,
    blockquote: Callout as unknown as FC<ComponentProps<"blockquote">>,
    DocsCategory,
    DynamicCodeBlock,
    ...(icons as unknown as MDXComponents),
    File,
    Files,
    Folder,
    GraphView,
    img: (props) => <ImageZoom {...props} />,
    InlineTOC,
    Step,
    Steps,
    Tab,
    Tabs,
    TabsTrigger,
    TabsContent,
    TabsList,
    TabsTriggerShadcnCLI: () => (
      <TabsTrigger className="cursor-pointer" value="cli">
        <svg aria-label="Logo Shadcn" role="img" viewBox="0 0 256 256">
          <path
            d="m208 128-80 80M192 40 40 192"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          />
        </svg>
        shadcn CLI
      </TabsTrigger>
    ),
    TypeTable,
    Popup,
    PopupContent,
    PopupTrigger,
    Wrapper,
    ...components,
  }
}
