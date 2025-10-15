import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type DeleteConfirmationDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isLoading: boolean // Nova prop para o estado de loading
}

/**
 * Um diálogo de alerta genérico para confirmar ações destrutivas.
 *
 * @param open Controla a visibilidade do diálogo.
 * @param onOpenChange Função de callback para quando o estado de abertura muda.
 * @param onConfirm Função de callback a ser executada quando o usuário confirma a ação.
 * @param isLoading Controla o estado de carregamento do botão de confirmação.
 */
export function DeleteConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading,
}: Readonly<DeleteConfirmationDialogProps>) {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso irá deletar permanentemente os
            dados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer bg-red-600 hover:bg-red-700"
            disabled={isLoading} // Desabilita o botão durante o loading
            onClick={onConfirm}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
