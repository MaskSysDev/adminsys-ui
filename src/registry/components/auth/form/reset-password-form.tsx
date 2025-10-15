"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { sanitizeData } from "@/utils/sanitize"

import { PasswordInput } from "@/registry/components/layout/form/password-input"
import { LoadingSpinner } from "@/registry/components/layout/loading/loading-spinner"
import { AlertError } from "@/registry/components/shared/alert/alert-error"
import { AlertSuccess } from "@/registry/components/shared/alert/alert-success"
import {
  type ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/validations/auth/reset-password.schema"

/**
 * Estado do formulário de redefinição de senha
 *
 * Centraliza o controle de UI e feedback do formulário:
 * - Loading durante requisições
 * - Mensagens de erro/sucesso
 * - Validação do token
 */
type FormState = {
  isLoading: boolean
  errorMessage: string | null
  successMessage: string | null
  isValidToken: boolean
}

/**
 * Formulário de redefinição de senha
 *
 * Implementa o fluxo completo de redefinição com:
 * - Validação de campos
 * - Validação do token
 * - Feedback visual
 * - Tratamento de erros
 * - Logs para auditoria
 */
export function ResetPasswordForm() {
  const router = useRouter()

  /**
   * Estado inicial do formulário
   *
   * Controla o estado de loading, mensagens
   * de feedback e validação do token.
   */
  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    errorMessage: null,
    successMessage: null,
    isValidToken: false,
  })

  /**
   * Configuração do formulário
   *
   * Define valores iniciais e regras de validação
   * usando o schema Zod para type-safety.
   */
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: "",
    },
  })

  /**
   * Valida o token na montagem do componente
   *
   * Verifica se o token existe e é válido
   * antes de permitir a redefinição.
   */

  // biome-ignore lint/correctness/useExhaustiveDependencies: This hook does not specify its dependency on updateFormState.
  useEffect(() => {
    const validateToken = async () => {
      const token = new URLSearchParams(window.location.search).get("token")

      if (!token) {
        updateFormState({
          errorMessage: "Link de recuperação inválido",
          isValidToken: false,
        })
        return
      }

      try {
        // Validação do token
        const isValid = token

        // biome-ignore lint/style/noMagicNumbers: Magic number detected. Extract it to a constant with a meaningful name.
        await new Promise((resolve) => setTimeout(resolve, 1000))

        if (!isValid) {
          updateFormState({
            errorMessage: "Link de recuperação expirado ou inválido",
            isValidToken: false,
          })
          return
        }

        // Atualiza o token no formulário
        form.setValue("token", token)
        updateFormState({ isValidToken: true })
      } catch (error) {
        // biome-ignore lint/suspicious/noConsole: Don't use console.
        console.error("🚀 ~ validateToken ~ error:", error)

        updateFormState({
          errorMessage: "Erro ao validar link de recuperação",
          isValidToken: false,
        })
      }
    }

    validateToken()
  }, [form])

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
   * Processa o envio do formulário
   *
   * Gerencia o fluxo completo de redefinição:
   * - Validação dos dados
   * - Sanitização
   * - Envio à API
   * - Tratamento da resposta
   * - Feedback ao usuário
   * - Logs para auditoria
   */
  async function onSubmit(data: ResetPasswordFormValues) {
    try {
      // Verifica se o token é válido antes de prosseguir
      if (!formState.isValidToken) {
        updateFormState({
          errorMessage: "Link de recuperação inválido ou expirado",
        })
        return
      }

      // Inicia o processo e limpa feedback anterior
      updateFormState({
        isLoading: true,
        errorMessage: null,
        successMessage: null,
      })

      const _token = new URLSearchParams(window.location.search).get("token")

      // Sanitiza dados para prevenir injeção
      const _sanitizedData = sanitizeData(data, resetPasswordSchema)

      // TODO: Envia dados para redefinição
      // Simula delay de rede para melhor UX
      // biome-ignore lint/style/noMagicNumbers: Magic number detected. Extract it to a constant with a meaningful name.
      await new Promise((resolve) => setTimeout(resolve, 1000))
      // Processa redefinição bem-sucedida
      const successMsg = "Senha redefinida com sucesso!"
      updateFormState({ successMessage: successMsg })

      // Exibe feedback visual
      toast.success("Senha Redefinida", {
        description: "Sua senha foi atualizada com sucesso",
        classNames: {
          success: "!bg-green-200 !text-green-600 dark:!bg-green-950",
          description: "!text-muted-foreground",
        },
      })

      // Limpa o formulário após sucesso
      form.reset()

      // Redireciona para login após 2 segundos
      router.push("/auth/sign-in")
    } catch (error) {
      // Trata erros inesperados
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Erro ao processar redefinição de senha"
      updateFormState({ errorMessage: errorMsg })
    } finally {
      // Finaliza o processo independente do resultado
      updateFormState({ isLoading: false })
    }
  }

  if (!formState.isValidToken) {
    // Se o token for inválido, exibe apenas a mensagem de erro
    return (
      <div className="space-y-4">
        <AlertError
          title={formState.errorMessage || "Link de recuperação inválido"}
        />
        <Button
          className="w-full cursor-pointer"
          onClick={() => router.push("/auth/forgot-password")}
          variant="outline"
        >
          Solicitar novo link
        </Button>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          form.handleSubmit(onSubmit)(e)
        }}
      >
        {/* Campo de senha - entrada segura com validação */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nova Senha</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  disabled={formState.isLoading}
                  placeholder="••••••••"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo de confirmação de senha */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Nova Senha</FormLabel>
              <FormControl>
                <PasswordInput
                  {...field}
                  disabled={formState.isLoading}
                  placeholder="••••••••"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Feedback visual - mensagens de erro/sucesso */}
        {formState.errorMessage && (
          <AlertError title={formState.errorMessage} />
        )}
        {formState.successMessage && (
          <AlertSuccess title={formState.successMessage} />
        )}

        {/* Botão de ação - controle do fluxo de redefinição */}
        <Button
          className="w-full cursor-pointer"
          disabled={formState.isLoading}
          type="submit"
        >
          {formState.isLoading ? (
            <LoadingSpinner className="size-4" />
          ) : (
            "Redefinir Senha"
          )}
        </Button>
      </form>
    </Form>
  )
}
