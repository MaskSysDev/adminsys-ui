import { TriangleAlert } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export type AlertWarnProps = {
  title: string
  description?: string
}

export function AlertWarn({ title, description }: AlertWarnProps) {
  return (
    <Alert
      className="border-0 bg-yellow-200 text-yellow-600 dark:bg-yellow-950"
      variant="default"
    >
      <AlertTitle className="flex items-center gap-2">
        <TriangleAlert className="size-6" />
        {title}
      </AlertTitle>
      {description && (
        <AlertDescription className="text-muted-foreground">
          {description}
        </AlertDescription>
      )}
    </Alert>
  )
}
