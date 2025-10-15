import { EditIcon, EyeIcon, MoreVerticalIcon, TrashIcon } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DeleteConfirmationDialog } from "@/registry/components/shared/dialog/delete-confirmation-dialog"

type DataTableRowActionsProps<TItem, TDetailsDialogProps, TFormDialogProps> = {
  item: TItem
  onDelete: (id: string) => Promise<void>
  isLoadingDelete: boolean
  DetailsDialogComponent?: React.ComponentType<TDetailsDialogProps>
  FormDialogComponent?: React.ComponentType<TFormDialogProps>
  detailsDialogProps?: Omit<TDetailsDialogProps, "item" | "onClose">
  formDialogProps?: Omit<TFormDialogProps, "item" | "open" | "onClose">
  onView?: (item: TItem) => void
  onEdit?: (item: TItem) => void
}

export function DataTableRowActions<
  TItem extends { id: string },
  TDetailsDialogProps,
  TFormDialogProps,
>({
  item,
  onDelete,
  isLoadingDelete,
  DetailsDialogComponent,
  FormDialogComponent,
  detailsDialogProps,
  formDialogProps,
  onView,
  onEdit,
}: Readonly<
  DataTableRowActionsProps<TItem, TDetailsDialogProps, TFormDialogProps>
>) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)

  const handleDelete = async () => {
    await onDelete(item.id)
    setIsDeleteDialogOpen(false)
  }

  const handleViewClick = () => {
    if (onView) {
      onView(item)
    } else if (DetailsDialogComponent) {
      setIsDetailsDialogOpen(true)
    }
  }

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(item)
    } else if (FormDialogComponent) {
      setIsFormDialogOpen(true)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="h-8 w-8 cursor-pointer p-0" variant="ghost">
            <span className="sr-only">Open menu</span>
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {(onView || DetailsDialogComponent) && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleViewClick}
            >
              <EyeIcon className="mr-2 size-4" />
              View
            </DropdownMenuItem>
          )}
          {(onEdit || FormDialogComponent) && (
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={handleEditClick}
            >
              <EditIcon className="mr-2 size-4" />
              Edit
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-red-600 focus:text-red-600"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            <TrashIcon className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {DetailsDialogComponent && (
        <DetailsDialogComponent
          item={isDetailsDialogOpen ? item : null}
          onClose={() => setIsDetailsDialogOpen(false)}
          {...(detailsDialogProps as TDetailsDialogProps)}
        />
      )}

      {FormDialogComponent && (
        <FormDialogComponent
          item={isFormDialogOpen ? item : null}
          onClose={() => setIsFormDialogOpen(false)}
          open={isFormDialogOpen}
          {...(formDialogProps as TFormDialogProps)}
        />
      )}

      <DeleteConfirmationDialog
        isLoading={isLoadingDelete}
        onConfirm={handleDelete}
        onOpenChange={setIsDeleteDialogOpen}
        open={isDeleteDialogOpen}
      />
    </>
  )
}
