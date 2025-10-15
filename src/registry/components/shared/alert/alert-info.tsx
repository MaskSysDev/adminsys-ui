import { InfoIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export type AlertInfoProps = {
  title: string
  description?: string
}

export function AlertInfo({ title, description }: AlertInfoProps) {
  return (
    <Alert
      className="border-0 bg-blue-200 text-blue-600 dark:bg-blue-950"
      variant="default"
    >
      <AlertTitle className="flex items-center gap-2">
        <InfoIcon className="size-6" />
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
