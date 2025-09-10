import { Container } from "@/components/layout/container"
import { Typography } from "@/components/layout/typography"

export default function Page() {
  return (
    <Container size="2xl">
      <Typography.H1 className="mb-4 text-start">Dashboard</Typography.H1>
      <Typography.Lead>Dashboard Page.</Typography.Lead>
    </Container>
  )
}
