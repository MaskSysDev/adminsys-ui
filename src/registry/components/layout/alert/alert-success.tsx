import { Check } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export type AlertSuccessProps = {
  title: string
  description?: string
}

export function AlertSuccess({ title, description }: AlertSuccessProps) {
  return (
    <Alert
      className="border-0 bg-green-200 text-green-600 dark:bg-green-950"
      variant="default"
    >
      <AlertTitle className="flex items-center gap-2">
        <Check className="size-6" />
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
