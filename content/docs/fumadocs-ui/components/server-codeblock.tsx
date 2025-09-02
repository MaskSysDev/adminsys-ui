import { highlight } from "fumadocs-core/highlight"
// biome-ignore lint/performance/noNamespaceImport: Avoid namespace imports, it can prevent efficient tree shaking and increase bundle size.
import * as Base from "fumadocs-ui/components/codeblock"
import type { HTMLAttributes } from "react"

export async function CodeBlock({
  code,
  lang,
  ...rest
}: HTMLAttributes<HTMLElement> & {
  code: string
  lang: string
}) {
  const rendered = await highlight(code, {
    lang,
    components: {
      pre: (props) => <Base.Pre {...props} />,
    },
    // other Shiki options
  })

  return <Base.CodeBlock {...rest}>{rendered}</Base.CodeBlock>
}
