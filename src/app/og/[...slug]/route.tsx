import fs from "node:fs/promises"

import { notFound } from "next/navigation"

import { source } from "@/lib/source"

import { generateOGImage } from "@/app/og/[...slug]/og"

export const revalidate = false

export async function GET(
  _req: Request,
  { params }: RouteContext<"/og/[...slug]">
) {
  const { slug } = await params
  const page = source.getPage(slug.slice(0, -1))
  if (!page) {
    notFound()
  }

  const robotoCondensedMedium = await fs.readFile(
    "./src/app/og/[...slug]/RobotoCondensed-Medium.ttf"
  )

  return generateOGImage({
    primaryTextColor: "rgb(240,240,240)",
    title: page.data.title,
    description: page.data.description,
    fonts: [
      {
        name: "RobotoCondensed",
        data: robotoCondensedMedium,
        weight: 500,
      },
    ],
  })
}

export function generateStaticParams(): {
  slug: string[]
}[] {
  return source.generateParams().map((page) => ({
    ...page,
    slug: [...page.slug, "image.png"],
  }))
}
