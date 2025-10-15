import type { Metadata } from "next"

import { Container } from "@/registry/components/shared/container"
import { Typography } from "@/registry/components/shared/typography"

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Description Terms of Service.",
}

export default function Page() {
  return (
    <Container className="flex items-center justify-center py-24 md:py-32">
      <Typography.H1>Terms of Service</Typography.H1>
    </Container>
  )
}
