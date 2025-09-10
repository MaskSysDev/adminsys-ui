"use client"

import { AlertTriangle, Trash2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { LoadingSpinner } from "@/registry/components/layout/loading/loading-spinner"

/**
 * Estado do formulário de exclusão
 *
 * Centraliza o controle de UI e feedback do formulário:
 * - Loading durante requisições
 * - Estado do diálogo de confirmação
 * - Mensagens de erro/sucesso
 */
type FormState = {
  isLoading: boolean
  showDeleteDialog: boolean
  errorMessage: string | null
}

/**
 * Formulário de exclusão de conta
 *
 * Implementa o fluxo completo de exclusão com:
 * - Diálogo de confirmação
 * - Validação de permissões
 * - Exclusão via server action
 * - Feedback visual
 * - Redirecionamento após exclusão
 */
export function DeleteAccountForm() {
  /**
   * Estado inicial do formulário
   *
   * Controla o estado de loading e diálogo
   * durante o processo de exclusão.
   */
  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    showDeleteDialog: false,
    errorMessage: null,
  })

  /**
   * Hook de navegação
   *
   * Permite redirecionar o usuário após
   * a exclusão da conta.
   */
  const router = useRouter()

  /**
   * Atualiza o estado do formulário
   *
   * Preserva o estado anterior e aplica apenas as
   * mudanças necessárias de forma segura.
   */
  const updateFormState = (updates: Partial<FormState>) => {
    setFormState((prev) => ({ ...prev, ...updates }))
  }

  /**
   * Atualiza o estado do diálogo
   *
   * Controla a visibilidade do diálogo de
   * confirmação de exclusão.
   */
  const handleDialogChange = (open: boolean) => {
    updateFormState({ showDeleteDialog: open })
  }

  /**
   * Processa a exclusão da conta
   *
   * Gerencia o fluxo completo de exclusão:
   * - Confirmação do usuário
   * - Exclusão via server action
   * - Feedback ao usuário
   * - Redirecionamento
   * - Logs para auditoria
   */
  async function handleDeleteAccount() {
    try {
      // Fecha o diálogo e inicia o processo
      updateFormState({
        showDeleteDialog: false,
        isLoading: true,
        errorMessage: null,
      })

      // TODO: Processa a exclusão
      // biome-ignore lint/style/noMagicNumbers: Magic number detected. Extract it to a constant with a meaningful name.
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Processa erro de exclusão
      // if (!result.success) {
      //   updateFormState({ errorMessage: result.error })
      //   return
      // }

      // Exibe feedback visual
      toast.error("Conta Excluída", {
        description: "Sua conta foi permanentemente excluída.",
        classNames: {
          error: "!bg-red-200 !text-red-600 dark:!bg-red-950",
          description: "!text-muted-foreground",
        },
      })

      // Redireciona para a página inicial
      router.push("/")
    } catch (error) {
      // Trata erros inesperados
      const errorMsg =
        error instanceof Error ? error.message : "Erro ao excluir conta"
      updateFormState({ errorMessage: errorMsg })
    } finally {
      // Finaliza o processo independente do resultado
      updateFormState({ isLoading: false })
    }
  }

  return (
    <Card className="mt-16 border-red-800 bg-red-900">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-lg text-red-500">
          <AlertTriangle className="h-5 w-5" />
          <span>Zona de Perigo</span>
        </CardTitle>
        <CardDescription className="text-red-200">
          Depois de excluir sua conta, não há como voltar atrás. Por favor,
          tenha certeza.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog
          onOpenChange={handleDialogChange}
          open={formState.showDeleteDialog}
        >
          <AlertDialogTrigger asChild>
            <Button
              className="flex w-full cursor-pointer items-center space-x-2 sm:w-auto"
              disabled={formState.isLoading}
              type="button"
              variant="destructive"
            >
              {formState.isLoading ? (
                <LoadingSpinner className="h-4 w-4" />
              ) : (
                <Trash2Icon className="h-4 w-4" />
              )}
              <span>Excluir conta</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center space-x-2 text-red-500">
                <AlertTriangle className="h-5 w-5" />
                <span>Excluir Conta</span>
              </AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground">
                Esta ação não pode ser desfeita. Isso excluirá permanentemente
                sua conta e removerá todos os seus dados de nossos servidores.
                <br />
                <br />
                <strong className="text-red-500">
                  Você tem certeza absoluta que deseja excluir sua conta?
                </strong>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                className="cursor-pointer bg-red-600 text-white hover:bg-red-700"
                disabled={formState.isLoading}
                onClick={() => {
                  handleDeleteAccount()
                }}
              >
                {formState.isLoading ? (
                  <>
                    <LoadingSpinner className="mr-2 h-4 w-4" />
                    Excluindo...
                  </>
                ) : (
                  "Sim, excluir minha conta"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
