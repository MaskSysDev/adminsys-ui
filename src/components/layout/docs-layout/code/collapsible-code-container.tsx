import type React from "react"

import { CodeCollapsibleWrapper } from "@/components/layout/docs-layout/code/code-collapsible-wrapper"

export function CollapsibleCodeContainer({
  collapsible,
  children,
  className,
}: {
  collapsible: boolean
  children: React.ReactNode
  className?: string
}) {
  if (collapsible) {
    return (
      <CodeCollapsibleWrapper className={className}>
        {children}
      </CodeCollapsibleWrapper>
    )
  }

  return <>{children}</>
}
