"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
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

import { AlertError } from "@/registry/components/shared/alert/alert-error"
import { AlertSuccess } from "@/registry/components/shared/alert/alert-success"
import { PasswordInput } from "@/registry/components/shared/form/password-input"
import { LoadingSpinner } from "@/registry/components/shared/loading/loading-spinner"
import { sanitizeData } from "@/registry/utils/sanitize"
import {
  type SignUpFormValues,
  signUpSchema,
} from "@/validations/auth/sign-up.schema"

/**
 * Estado do formulário de registro
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
 * Formulário de registro
 *
 * Implementa o fluxo completo de cadastro com:
 * - Validação de campos
 * - Feedback visual
 * - Tratamento de erros
 * - Redirecionamento após sucesso
 */
export function SignUpForm() {
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
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
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
   * Gerencia o fluxo completo de cadastro:
   * - Validação dos dados
   * - Sanitização
   * - Envio à API
   * - Tratamento da resposta
   * - Feedback ao usuário
   * - Logs para auditoria
   */
  async function onSubmit(data: SignUpFormValues) {
    try {
      // Inicia o processo e limpa feedback anterior
      updateFormState({
        isLoading: true,
        errorMessage: null,
        successMessage: null,
      })

      // Sanitiza dados para prevenir injeção
      const sanitizedData = sanitizeData(data, signUpSchema)

      // TODO: Envia dados para cadastro
      // Simula delay de rede para melhor UX
      // biome-ignore lint/style/noMagicNumbers: Magic number detected. Extract it to a constant with a meaningful name.
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Processa cadastro bem-sucedido
      const successMsg = `Conta criada com sucesso para ${sanitizedData.name} (${sanitizedData.email}). Please check your email for verification.`
      updateFormState({ successMessage: successMsg })

      // Exibe feedback visual
      toast.success("Cadastro Realizado", {
        description: `Bem-vindo(a), ${sanitizedData.name}! ${successMsg}`,
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
        error instanceof Error ? error.message : "Erro ao realizar cadastro"
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
          {/** Campo de nome - validação e sanitização */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    disabled={formState.isLoading}
                    placeholder="Seu nome"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/** Campo de sobrenome - validação e sanitização */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input
                    disabled={formState.isLoading}
                    placeholder="Seu sobrenome"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/** Campo de email - validação e sanitização */}
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

          {/** Campo de senha - entrada segura com validação */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
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

          {/** Feedback visual - mensagens de erro/sucesso */}
          {formState.errorMessage && (
            <AlertError title={formState.errorMessage} />
          )}
          {formState.successMessage && (
            <AlertSuccess title={formState.successMessage} />
          )}

          {/** Botão de ação - controle do fluxo de cadastro */}
          <Button
            className="w-full cursor-pointer"
            disabled={formState.isLoading}
            type="submit"
          >
            {formState.isLoading ? (
              <LoadingSpinner className="size-4" />
            ) : (
              "Criar Conta"
            )}
          </Button>
        </form>
      </Form>

      {/** Navegação - links para fluxos alternativos */}
      <div className="flex flex-col space-y-4">
        <div className="text-center text-muted-foreground text-sm">
          Já tem uma conta?{" "}
          <Link className="text-primary hover:underline" href="/auth/sign-in">
            Faça login.
          </Link>
        </div>
      </div>
    </div>
  )
}
