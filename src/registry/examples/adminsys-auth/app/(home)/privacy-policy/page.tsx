import type { Metadata } from "next"

import { Container } from "@/registry/components/shared/container"
import { Typography } from "@/registry/components/shared/typography"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Description Privacy Policy.",
}

export default function Page() {
  return (
    <Container className="flex items-center justify-center py-24 md:py-32">
      <Typography.H1>Privacy Policy</Typography.H1>
    </Container>
  )
}
