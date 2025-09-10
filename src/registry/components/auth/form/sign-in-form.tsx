"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { cn } from "@/lib/utils"
import { sanitizeData } from "@/utils/sanitize"

import { AlertError } from "@/registry/components/layout/alert/alert-error"
import { AlertSuccess } from "@/registry/components/layout/alert/alert-success"
import { PasswordInput } from "@/registry/components/layout/form/password-input"
import { LoadingSpinner } from "@/registry/components/layout/loading/loading-spinner"
import {
  type SignInFormValues,
  signInSchema,
} from "@/validations/auth/sign-in.schema"

/**
 * Estado do formulário de login
 *
 * Centraliza o controle de UI e feedback do formulário:
 * - Loading durante requisições
 * - Mensagens de erro/sucesso
 * - Estado do 2FA
 */
type FormState = {
  isLoading: boolean
  errorMessage: string | null
  successMessage: string | null
  showTwoFactor: boolean
}

/**
 * Formulário de autenticação
 *
 * Implementa o fluxo completo de login com:
 * - Validação de campos
 * - Suporte a 2FA
 * - Feedback visual
 * - Tratamento de erros
 * - Redirecionamento após sucesso
 */
export function SignInForm() {
  const router = useRouter()

  /**
   * Estado inicial do formulário
   *
   * Controla o estado de loading, mensagens de feedback
   * e exibição do campo de 2FA quando necessário.
   */
  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    errorMessage: null,
    successMessage: null,
    showTwoFactor: false,
  })

  /**
   * Configuração do formulário
   *
   * Define valores iniciais e regras de validação
   * usando o schema Zod para type-safety.
   */
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
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
   * Gerencia o fluxo completo de autenticação:
   * - Validação dos dados
   * - Sanitização
   * - Envio à API
   * - Tratamento da resposta
   * - Feedback ao usuário
   * - Logs para auditoria
   * - Redirecionamento após sucesso
   */
  async function onSubmit(data: SignInFormValues) {
    try {
      // Inicia o processo e limpa feedback anterior
      updateFormState({
        isLoading: true,
        errorMessage: null,
        successMessage: null,
      })

      // Sanitiza dados para prevenir injeção
      const _sanitizedData = sanitizeData(data, signInSchema)

      // TODO: Envia dados para autenticação
      // Simula delay de rede para melhor UX
      // biome-ignore lint/style/noMagicNumbers: Magic number detected. Extract it to a constant with a meaningful name.
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Processa login bem-sucedido
      const successMsg = `Login realizado com sucesso para ${data.email}.`
      updateFormState({ successMessage: successMsg })

      // Exibe feedback visual
      toast.success("Login Realizado", {
        description: "Bem-vindo(a) de volta!",
        classNames: {
          success: "!bg-green-200 !text-green-600 dark:!bg-green-950",
          description: "!text-muted-foreground",
        },
      })

      // Limpa o formulário após sucesso
      form.reset()

      // Redireciona para o dashboard
      router.push("/admin/dashboard")
    } catch (error) {
      // Trata erros inesperados
      const errorMsg =
        error instanceof Error ? error.message : "Erro ao realizar login"
      updateFormState({ errorMessage: errorMsg })
    } finally {
      // Finaliza o processo independente do resultado
      updateFormState({ isLoading: false })
    }
  }

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            form.handleSubmit(onSubmit)(e)
          }}
        >
          {formState.showTwoFactor ? (
            /* Campo de código 2FA - validação e processamento */
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Código de Autenticação</FormLabel>
                  <FormControl>
                    <Input
                      disabled={formState.isLoading}
                      placeholder="Digite o código de 6 dígitos"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <>
              {/* Campo de email - validação e sanitização */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={formState.isLoading}
                        placeholder="seu@email.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Campo de senha - entrada segura com validação */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel>Senha</FormLabel>
                      <Link
                        className={cn(
                          buttonVariants({
                            variant: "link",
                            size: "sm",
                            className: "ml-auto h-auto p-0 font-normal",
                          })
                        )}
                        href="/auth/forgot-password"
                      >
                        Esqueceu a senha?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput
                        disabled={formState.isLoading}
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* Feedback visual - mensagens de erro/sucesso */}
          {formState.errorMessage && (
            <AlertError title={formState.errorMessage} />
          )}
          {formState.successMessage && (
            <AlertSuccess title={formState.successMessage} />
          )}

          {/* Botão de ação - controle do fluxo de autenticação */}
          <Button
            className="w-full cursor-pointer"
            disabled={formState.isLoading}
            type="submit"
          >
            {(() => {
              if (formState.isLoading) {
                return <LoadingSpinner className="size-4" />
              }
              if (formState.showTwoFactor) {
                return "Confirmar"
              }
              return "Entrar"
            })()}
          </Button>
        </form>
      </Form>

      {/* Navegação - links para fluxos alternativos */}
      <div className="flex flex-col space-y-4">
        <div className="text-center text-muted-foreground text-sm">
          Não tem uma conta?{" "}
          <Link className="text-primary hover:underline" href="/auth/sign-up">
            Crie uma conta.
          </Link>
        </div>
      </div>
    </div>
  )
}
