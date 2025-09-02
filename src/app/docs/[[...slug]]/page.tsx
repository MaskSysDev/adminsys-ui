import { createRelativeLink } from "fumadocs-ui/mdx"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getMDXComponents } from "@/components/layout/docs-layout/mdx/mdx-components"

import { createMetadata } from "@/lib/metadata"
import { source } from "@/lib/source"

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) {
    notFound()
  }

  const MDXContent = page.data.body

  return (
    <DocsPage full={page.data.full} toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(
  props: PageProps<"/docs/[[...slug]]">
): Promise<Metadata> {
  const { slug = [] } = await props.params
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) {
    notFound()
  }

  const description =
    page.data.description ?? "The library for building documentation sites"

  const image = {
    url: ["/og", ...slug, "image.png"].join("/"),
    width: 1200,
    height: 630,
  }

  return createMetadata({
    title: page.data.title,
    description,
    openGraph: {
      url: `/docs/${page.slugs.join("/")}`,
      images: [image],
    },
    twitter: {
      images: [image],
    },
  })
}
