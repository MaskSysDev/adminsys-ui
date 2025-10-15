import { Container } from "@/registry/components/shared/container"
import { Typography } from "@/registry/components/shared/typography"

export default function Page() {
  return (
    <Container size="2xl">
      <Typography.H1 className="mb-4 text-start">Dashboard</Typography.H1>
      <Typography.Lead>Dashboard Page.</Typography.Lead>
    </Container>
  )
}
