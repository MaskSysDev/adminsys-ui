"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

import { AlertError } from "@/registry/components/shared/alert/alert-error"
import { AlertSuccess } from "@/registry/components/shared/alert/alert-success"
import { PasswordInput } from "@/registry/components/shared/form/password-input"
import { LoadingSpinner } from "@/registry/components/shared/loading/loading-spinner"
import {
  type AccountFormValues,
  accountSchema,
} from "@/validations/auth/account.schema"

/**
 * Estado do formulário de conta
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
 * Formulário de configurações da conta
 *
 * Implementa o fluxo completo de atualização com:
 * - Validação de campos
 * - Atualização de dados pessoais
 * - Alteração de senha
 * - Configuração de 2FA
 * - Feedback visual
 */
export function AccountForm() {
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
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      lastName: "",
      isTwoFactorEnabled: false,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
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
   * Gerencia o fluxo completo de atualização:
   * - Validação dos dados
   * - Envio à API
   * - Tratamento da resposta
   * - Feedback ao usuário
   * - Logs para auditoria
   */
  async function onSubmit(data: AccountFormValues) {
    try {
      // Inicia o processo e limpa feedback anterior
      updateFormState({
        isLoading: true,
        errorMessage: null,
        successMessage: null,
      })

      // TODO: Envia dados para atualização
      // biome-ignore lint/style/noMagicNumbers: Magic number detected. Extract it to a constant with a meaningful name.
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Processa erro de atualização
      // if (!result.success) {
      //   updateFormState({ errorMessage: result.error })
      //   return
      // }

      // Processa atualização bem-sucedida
      const successMsg = "Conta atualizada com sucesso!"
      updateFormState({ successMessage: successMsg })

      // Exibe feedback visual
      toast.success("Conta Atualizada", {
        description: `Configurações atualizadas para ${data.name}`,
        classNames: {
          success: "!bg-green-200 !text-green-600 dark:!bg-green-950",
          description: "!text-muted-foreground",
        },
      })

      // Limpa campos de senha após sucesso
      form.setValue("currentPassword", "")
      form.setValue("newPassword", "")
      form.setValue("confirmPassword", "")
    } catch (error) {
      // Trata erros inesperados
      const errorMsg =
        error instanceof Error ? error.message : "Erro ao atualizar conta"
      updateFormState({ errorMessage: errorMsg })
    } finally {
      // Finaliza o processo independente do resultado
      updateFormState({ isLoading: false })
    }
  }

  return (
    <Form {...form}>
      <form
        className="mt-8 space-y-6 md:space-y-8"
        onSubmit={(e) => {
          form.handleSubmit(onSubmit)(e)
        }}
      >
        {/* Alteração de Nome */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Alterar nome</CardTitle>
            <CardDescription className="text-muted-foreground">
              Altere seu nome de exibição.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">
                    Nome:<span className="-ml-2 text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={formState.isLoading}
                      placeholder="Digite seu nome"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">
                    Sobrenome:<span className="-ml-2 text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={formState.isLoading}
                      placeholder="Digite seu sobrenome"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Segurança da Conta */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Segurança da conta</CardTitle>
            <CardDescription className="text-muted-foreground">
              Gerencie as configurações de segurança da sua conta.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">
                    Senha atual:<span className="-ml-2 text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      disabled={formState.isLoading}
                      placeholder="Digite sua senha atual"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">Nova senha:</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      disabled={formState.isLoading}
                      placeholder="Digite a nova senha"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground">
                    Confirmar nova senha:
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      disabled={formState.isLoading}
                      placeholder="Confirme a nova senha"
                    />
                  </FormControl>
                  <FormMessage className="text-red-600" />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Autenticação de Dois Fatores */}
        <Card>
          <CardContent>
            <FormField
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5">
                    <FormLabel className="text-foreground">
                      Autenticação de Dois Fatores
                    </FormLabel>
                    <FormDescription>
                      Ative a autenticação de dois fatores para sua conta
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      className="data-[state=checked]:bg-green-600"
                      disabled={formState.isLoading}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Mensagens de Erro e Sucesso */}
        {formState.errorMessage && (
          <AlertError title={formState.errorMessage} />
        )}
        {formState.successMessage && (
          <AlertSuccess title={formState.successMessage} />
        )}

        {/* Botão de Envio */}
        <Button
          className="w-full cursor-pointer bg-green-600 hover:bg-green-700 sm:w-auto"
          disabled={formState.isLoading}
          type="submit"
        >
          {formState.isLoading ? (
            <LoadingSpinner className="mr-2 h-4 w-4" />
          ) : null}
          {formState.isLoading ? "Atualizando..." : "Atualizar Conta"}
        </Button>
      </form>
    </Form>
  )
}
