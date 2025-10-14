import { TriangleAlert } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export type AlertErrorProps = {
  title: string
  description?: string
}

export function AlertError({ title, description }: AlertErrorProps) {
  return (
    <Alert
      className="border-0 bg-red-200 text-red-600 dark:bg-red-950"
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
