import type { ReactNode } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type GenericFormDialogProps<T> = {
  item: T | null
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function FormDialog<T>({
  item,
  open,
  onClose,
  children,
}: Readonly<GenericFormDialogProps<T>>) {
  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          onClose()
        }
      }}
      open={open}
    >
      <DialogContent showCloseButton={true}>
        <DialogHeader>
          <DialogTitle>{item ? "Edit" : "Create"}</DialogTitle>
          <DialogDescription>Fill in the form.</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
