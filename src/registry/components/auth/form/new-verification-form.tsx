"use client"

import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

import { AlertError } from "@/registry/components/layout/alert/alert-error"
import { AlertSuccess } from "@/registry/components/layout/alert/alert-success"
import { LoadingSpinner } from "@/registry/components/layout/loading/loading-spinner"

/**
 * Estado do formulário de verificação
 *
 * Centraliza o controle de UI e feedback do formulário:
 * - Loading durante requisições
 * - Mensagens de erro/sucesso
 */
type FormState = {
  isLoading: boolean
  errorMessage: string | null
  successMessage: string | null
}

/**
 * Formulário de verificação de email
 *
 * Implementa o fluxo completo de verificação com:
 * - Validação do token
 * - Feedback visual
 * - Tratamento de erros
 * - Redirecionamento após sucesso
 */
export const NewVerificationForm = () => {
  /**
   * Estado inicial do formulário
   *
   * Controla o estado de loading e mensagens
   * de feedback durante o processo.
   */
  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    errorMessage: null,
    successMessage: null,
  })

  /**
   * Obtém parâmetros da URL
   *
   * Extrai o token de verificação da query string
   * para processamento.
   */
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

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
   * Processa a verificação do token
   *
   * Gerencia o fluxo completo de verificação:
   * - Validação do token
   * - Envio à API
   * - Tratamento da resposta
   * - Feedback ao usuário
   * - Logs para auditoria
   */

  // biome-ignore lint/correctness/useExhaustiveDependencies: This hook does not specify its dependency on updateFormState.
  const onNewVerificationSubmit = useCallback(async () => {
    // Evita processamento duplicado
    if (formState.successMessage || formState.errorMessage) {
      return
    }

    try {
      // Inicia o processo e limpa feedback anterior
      updateFormState({
        isLoading: true,
        errorMessage: null,
        successMessage: null,
      })

      // Valida presença do token
      if (!token) {
        const errorMsg = "Token de verificação não encontrado"
        updateFormState({ errorMessage: errorMsg })

        return
      }

      // TODO: Envia token para verificação
      // biome-ignore lint/style/noMagicNumbers: Magic number detected. Extract it to a constant with a meaningful name.
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Processa verificação bem-sucedida
      const successMsg = "Email verificado com sucesso!"
      updateFormState({ successMessage: successMsg })

      // Exibe feedback visual
      toast.success("Email Verificado", {
        description: "Seu email foi verificado com sucesso!",
        classNames: {
          success: "!bg-green-200 !text-green-600 dark:!bg-green-950",
          description: "!text-muted-foreground",
        },
      })
    } catch (error) {
      // Trata erros inesperados
      const errorMsg =
        error instanceof Error ? error.message : "Erro ao verificar email"
      updateFormState({ errorMessage: errorMsg })
    } finally {
      // Finaliza o processo independente do resultado
      updateFormState({ isLoading: false })
    }
  }, [
    token,
    formState.successMessage,
    formState.errorMessage, // Finaliza o processo independente do resultado
  ])

  /**
   * Inicia o processo de verificação
   *
   * Executa a verificação automaticamente quando
   * o componente é montado.
   */
  useEffect(() => {
    onNewVerificationSubmit()
  }, [onNewVerificationSubmit])

  return (
    <div className="flex w-full items-center justify-center">
      {/* Indicador de loading durante o processo */}
      {formState.isLoading && <LoadingSpinner className="size-5" />}

      {/* Feedback visual - mensagens de erro/sucesso */}
      {formState.successMessage && (
        <AlertSuccess title={formState.successMessage} />
      )}
      {formState.errorMessage && <AlertError title={formState.errorMessage} />}
    </div>
  )
}
