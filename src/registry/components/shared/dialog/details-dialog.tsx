import type { ReactNode } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type DetailsDialogProps<T> = {
  item: T | null
  onClose: () => void
  title: string
  description?: string
  children: ReactNode
}

export function DetailsDialog<T>({
  item,
  onClose,
  title,
  description,
  children,
}: Readonly<DetailsDialogProps<T>>) {
  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose()
        }
      }}
      open={!!item}
    >
      <DialogContent className="sm:max-w-md" showCloseButton={true}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {
            <DialogDescription>
              {description || "Displays the details."}
            </DialogDescription>
          }
        </DialogHeader>
        {item && children}
      </DialogContent>
    </Dialog>
  )
}
