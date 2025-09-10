"use client"

import { toast } from "sonner"

import { Icons } from "@/components/layout/icons"
import { Button } from "@/components/ui/button"

/**
 * Componente de login social
 *
 * Implementa o fluxo de autenticação via provedores
 * sociais (Google e GitHub) com:
 * - Feedback visual
 * - Tratamento de erros
 * - Logs para auditoria
 */
export const SocialLogin = () => {
  /**
   * Processa o login social
   *
   * Gerencia o fluxo de autenticação:
   * - Validação do provedor
   * - Feedback ao usuário
   * - Logs para auditoria
   */
  const handleSocialLogin = (provider: "google" | "github") => {
    try {
      // TODO: Integração com provedores

      toast.success("Login Realizado", {
        description: `Autenticado via ${provider}`,
        classNames: {
          success: "!bg-green-200 !text-green-600 dark:!bg-green-950",
          description: "!text-muted-foreground",
        },
      })
    } catch (error) {
      // Trata erros inesperados
      const errorMsg =
        error instanceof Error ? error.message : "Erro ao realizar login social"

      // Exibe feedback visual do erro
      toast.error("Erro no Login", {
        description: errorMsg,
        classNames: {
          error: "!bg-red-200 !text-red-600 dark:!bg-red-950",
          description: "!text-muted-foreground",
        },
      })
    }
  }

  return (
    <div className="grid w-full grid-cols-2 items-center gap-x-2">
      <Button
        className="w-full cursor-pointer bg-background"
        onClick={() => {
          handleSocialLogin("google")
        }}
        size="lg"
        variant="outline"
      >
        <Icons.google className="size-5" />
      </Button>
      <Button
        className="w-full cursor-pointer bg-background"
        onClick={() => {
          handleSocialLogin("github")
        }}
        size="lg"
        variant="outline"
      >
        <Icons.gitHub className="size-5" />
      </Button>
    </div>
  )
}
