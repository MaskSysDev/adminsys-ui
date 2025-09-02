import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins"
import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config"
import { transformerTwoslash } from "fumadocs-twoslash"
import { createFileSystemTypesCache } from "fumadocs-twoslash/cache-fs"

// Você pode customizar os esquemas Zod para frontmatter e `meta.json` aqui
// veja https://fumadocs.dev/docs/mdx/collections#define-docs
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema,
  },
  meta: {
    schema: metaSchema,
  },
})

export default defineConfig({
  mdxOptions: {
    // Opções do MDX
    rehypeCodeOptions: {
      langs: ["ts", "js", "html", "tsx", "mdx"],
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      transformers: [
        ...(rehypeCodeDefaultOptions.transformers ?? []),
        transformerTwoslash({
          typesCache: createFileSystemTypesCache(),
        }),
      ],
    },
    remarkCodeTabOptions: {
      parseMdx: true,
    },
    remarkNpmOptions: {
      persist: {
        id: "package-manager",
      },
    },
  },
})
