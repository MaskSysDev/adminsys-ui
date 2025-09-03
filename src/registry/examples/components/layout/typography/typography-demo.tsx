import { Container } from "@/registry/components/layout/container"
import { Typography } from "@/registry/components/layout/typography"

export default function TypographyDemo() {
  return (
    <Container>
      <Typography.H1 className="text-start">Typography H1</Typography.H1>
      <Typography.H2>Typography H2</Typography.H2>
      <Typography.H3>Typography H3</Typography.H3>
      <Typography.H4>Typography H4</Typography.H4>
      <Typography.Lead>Typography Lead</Typography.Lead>
      <Typography.Large>Typography Large</Typography.Large>
      <Typography.Small>Typography Small</Typography.Small>
      <Typography.Muted>Typography Muted</Typography.Muted>
      <Typography.P>Typography P</Typography.P>
      <Typography.InlineCode>Typography InlineCode</Typography.InlineCode>
      <Typography.Blockquote>Typography Blockquote</Typography.Blockquote>
    </Container>
  )
}
