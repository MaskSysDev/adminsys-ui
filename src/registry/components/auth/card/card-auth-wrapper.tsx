"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { TermsAndPolicyDialog } from "@/registry/components/auth/dialog/terms-and-policy-dialog"
import { SocialLogin } from "@/registry/components/auth/form/social-login"
import { cn } from "@/registry/lib/cn"

/**
 * Propriedades do componente CardAuthWrapper
 *
 * Define a estrutura e comportamento do card de autenticação,
 * incluindo cabeçalho, descrição e opções de exibição.
 */
export type CardWrapperProps = {
  children: React.ReactNode
  headerLabel?: string
  headerDescription?: string
  showSocial?: boolean
  className?: string
  termsAndPolicy?: boolean
}

/**
 * Componente wrapper para cards de autenticação
 *
 * Fornece uma estrutura consistente para formulários de autenticação,
 * incluindo cabeçalho, conteúdo, login social e termos de uso.
 */
export const CardAuthWrapper = ({
  children,
  headerLabel,
  headerDescription,
  showSocial,
  className,
  termsAndPolicy,
}: CardWrapperProps) => {
  /**
   * Estado para controlar a exibição dos diálogos
   *
   * Gerencia a visibilidade dos diálogos de termos
   * e política de privacidade.
   */
  const [dialogState, setDialogState] = useState({
    terms: false,
    policy: false,
  })

  /**
   * Manipula a abertura do diálogo de termos
   *
   * Atualiza o estado para exibir o diálogo
   * de termos de serviço.
   */
  const handleOpenTerms = () => {
    setDialogState((prev) => ({ ...prev, terms: true }))
  }

  /**
   * Manipula a abertura do diálogo de política
   *
   * Atualiza o estado para exibir o diálogo
   * de política de privacidade.
   */
  const handleOpenPolicy = () => {
    setDialogState((prev) => ({ ...prev, policy: true }))
  }

  /**
   * Manipula o fechamento dos diálogos
   *
   * Reseta o estado para fechar todos os diálogos.
   */
  const handleCloseDialogs = () => {
    setDialogState({ terms: false, policy: false })
  }

  return (
    <>
      <Card
        className={cn("mx-auto w-full max-w-lg overflow-hidden", className)}
      >
        {/* Cabeçalho do card. Exibe o título e descrição quando fornecidos, com estilo
        centralizado e tipografia adequada */}
        <CardHeader>
          {headerLabel && (
            <CardTitle className="text-center font-bold text-2xl">
              {headerLabel}
            </CardTitle>
          )}
          {headerDescription && (
            <CardDescription className="text-center">
              {headerDescription}
            </CardDescription>
          )}
        </CardHeader>
        {/* Conteúdo principal do card * * Renderiza o conteúdo filho (formulários, etc) * dentro da
        estrutura do card */}
        <CardContent>{children}</CardContent>
        {/* Seção de login social * * Exibe opções de login social quando showSocial é true, * com
        separador visual e layout adequado */}
        {showSocial && (
          <div>
            {/* Separador visual * * Cria uma linha divisória com texto central * para separar login
            social do formulário principal */}
            <div className="flex items-center px-6 pb-6 before:mt-0.5 before:flex-1 before:border-muted before:border-t after:mt-0.5 after:flex-1 after:border-muted after:border-t">
              <p className="mx-4 mb-0 text-center text-muted-foreground text-sm">
                ou continue com
              </p>
            </div>

            {/* Rodapé com login social * * Renderiza os botões de login social * sem borda superior
            para melhor integração visual */}
            <CardFooter className="border-t-0 bg-card">
              <SocialLogin />
            </CardFooter>
          </div>
        )}

        {/* Rodapé com termos de uso * * Exibe os links para termos de serviço e política * de privacidade
        quando termsAndPolicy é true */}
        <CardFooter className="flex flex-col flex-wrap items-center gap-4 border-t-0 bg-card">
          <div className="block w-full space-y-8">
            {termsAndPolicy && (
              /**
               * Texto dos termos
               *
               * Apresenta o texto legal com links para
               * termos de serviço e política de privacidade.
               */
              <p className="text-center text-muted-foreground text-sm">
                Ao fazer login, você concorda com nossos{" "}
                <Button
                  className="cursor-pointer p-0"
                  onClick={handleOpenTerms}
                  size="sm"
                  variant="link"
                >
                  Termos de Serviço
                </Button>{" "}
                e{" "}
                <Button
                  className="cursor-pointer p-0"
                  onClick={handleOpenPolicy}
                  size="sm"
                  variant="link"
                >
                  Política de Privacidade
                </Button>
                .
              </p>
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Diálogo de Termos de Serviço. Exibe o conteúdo dos termos em uma janela modal */}
      <TermsAndPolicyDialog
        content="Conteúdo dos Termos de Serviço..."
        description="Por favor, leia atentamente nossos termos de serviço antes de prosseguir."
        isOpen={dialogState.terms}
        onCloseAction={handleCloseDialogs}
        title="Termos de Serviço"
      />

      {/* Diálogo de Política de Privacidade. Exibe o conteúdo da política em uma janela modal */}
      <TermsAndPolicyDialog
        content="Conteúdo da Política de Privacidade..."
        description="Entenda como tratamos suas informações pessoais."
        isOpen={dialogState.policy}
        onCloseAction={handleCloseDialogs}
        title="Política de Privacidade"
      />
    </>
  )
}
