import { Typography } from "@/components/layout/typography"

import { Container } from "@/registry/components/shared/container"

export default function Page() {
  return (
    <Container size="2xl">
      <Typography.H1 className="mb-4 text-start">Submenu 01</Typography.H1>
      <Typography.Lead>Submenu 01 Page.</Typography.Lead>
    </Container>
  )
}
