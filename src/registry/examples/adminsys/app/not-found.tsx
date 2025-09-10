import type { Metadata } from "next"

import { NotFound } from "@/components/layout/not-found"

export const metadata: Metadata = {
  title: "404: Page not found",
  description: "The page you are looking for could not be found.",
  robots: { index: false, follow: false },
}

export default function NotFoundPage() {
  return (
    <NotFound
      description="The page you are looking for could not be found."
      labelGoBack="Back"
      title="This page does not exist"
    />
  )
}
