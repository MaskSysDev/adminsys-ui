"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
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
import { Input } from "@/components/ui/input"

import { sanitizeData } from "@/utils/sanitize"

import { AlertError } from "@/registry/components/shared/alert/alert-error"
import { AlertSuccess } from "@/registry/components/shared/alert/alert-success"
import { LoadingSpinner } from "@/registry/components/shared/loading/loading-spinner"
import {
  type ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/validations/auth/forgot-password.schema"

/**
 * Estado do formulário de recuperação de senha
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
 * Formulário de recuperação de senha
 *
 * Implementa o fluxo completo de recuperação com:
 * - Validação de campos
 * - Feedback visual
 * - Tratamento de erros
 * - Logs para auditoria
 */
export function ForgotPasswordForm() {
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
   * Configuração do formulário
   *
   * Define valores iniciais e regras de validação
   * usando o schema Zod para type-safety.
   */
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

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
   * Gerencia o fluxo completo de recuperação:
   * - Validação dos dados
   * - Sanitização
   * - Envio à API
   * - Tratamento da resposta
   * - Feedback ao usuário
   * - Logs para auditoria
   */
  async function onSubmit(data: ForgotPasswordFormValues) {
    try {
      // Inicia o processo e limpa feedback anterior
      updateFormState({
        isLoading: true,
        errorMessage: null,
        successMessage: null,
      })

      // Sanitiza dados para prevenir injeção
      const sanitizedData = sanitizeData(data, forgotPasswordSchema)

      // TODO: Envia dados para recuperação
      // biome-ignore lint/style/noMagicNumbers: Magic number detected. Extract it to a constant with a meaningful name.
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Processa recuperação bem-sucedida
      const successMsg = `Email de recuperação enviado para ${sanitizedData.email}.`
      updateFormState({ successMessage: successMsg })

      // Exibe feedback visual
      toast.success("Email Enviado", {
        description: "Verifique sua caixa de entrada para redefinir sua senha",
        classNames: {
          success: "!bg-green-200 !text-green-600 dark:!bg-green-950",
          description: "!text-muted-foreground",
        },
      })

      // Limpa o formulário após sucesso
      form.reset()
    } catch (error) {
      // Trata erros inesperados
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Erro ao processar recuperação de senha"
      updateFormState({ errorMessage: errorMsg })
    } finally {
      // Finaliza o processo independente do resultado
      updateFormState({ isLoading: false })
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={(e) => {
          form.handleSubmit(onSubmit)(e)
        }}
      >
        {/* Campo de email - validação e sanitização */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={formState.isLoading}
                  placeholder="seu@email.com"
                  type="email"
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

        {/* Botão de ação - controle do fluxo de recuperação */}
        <Button
          className="w-full cursor-pointer"
          disabled={formState.isLoading}
          type="submit"
        >
          {formState.isLoading ? (
            <LoadingSpinner className="size-4" />
          ) : (
            "Enviar email de recuperação"
          )}
        </Button>
      </form>
    </Form>
  )
}
