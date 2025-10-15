"use client"

import { RepeatIcon } from "lucide-react"
import React, { useMemo, useState } from "react"

import { OpenInV0Button } from "@/components/layout/docs-layout/button/open-in-v0-button"
import { CollapsibleCodeContainer } from "@/components/layout/docs-layout/code/collapsible-code-container"
import { Code as CodeInline } from "@/components/layout/docs-layout/typography/mdx-typography"
import { SimpleTooltip } from "@/components/layout/tooltip/simple-tooltip"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { getRegistryEntry } from "@/lib/registry-utils"

import { cn } from "@/registry/lib/cn"

/**
 * Componente `ComponentPreview`:
 * Um componente cliente React que exibe uma pré-visualização interativa de um componente de UI
 * e seu código-fonte correspondente. Permite alternar entre a visualização e o código,
 * além de funcionalidades como 'replay' e 'abrir no V0'.
 */
export function ComponentPreview({
  className,
  name,
  openInV0Url,
  canReplay = false,
  notProse = true,
  codeCollapsible = true,
  code: Code,
  ...props
}: React.ComponentProps<"div"> & {
  /** Classe CSS adicional para o contêiner do componente. */
  className?: string
  /** O nome do componente a ser pré-visualizado, usado para buscar no registro. */
  name: string
  /** URL para abrir o componente no V0, se aplicável. */
  openInV0Url?: string
  /** Se o botão de 'replay' deve ser exibido para reiniciar a pré-visualização. */
  canReplay?: boolean
  /** Se o contêiner da pré-visualização não deve aplicar estilos 'prose'. */
  notProse?: boolean
  /** Se o bloco de código deve ser colapsável. */
  codeCollapsible?: boolean
  /** O conteúdo do código-fonte a ser exibido na aba 'Code'. */
  code: React.ReactNode
}) {
  // Estado para controlar a funcionalidade de 'replay' da pré-visualização.
  const [replay, setReplay] = useState(0)

  // `useMemo` para carregar dinamicamente o componente de pré-visualização do registro.
  // Garante que o componente só seja recarregado quando o `name` mudar.
  const Preview = useMemo(() => {
    const entry = getRegistryEntry(name)
    const Component = entry?.component

    if (!Component) {
      return (
        <p className="text-muted-foreground text-sm">
          Component <CodeInline>{name}</CodeInline> not found in registry.
        </p>
      )
    }

    return <Component />
  }, [name])

  return (
    <div className={cn("my-6", notProse && "not-prose", className)} {...props}>
      {/* Componente de abas para alternar entre 'Preview' e 'Code' */}
      <Tabs className="gap-0" defaultValue="preview">
        <TabsList>
          <TabsTrigger className="cursor-pointer" value="preview">
            Preview
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="code">
            Code
          </TabsTrigger>
        </TabsList>

        {/* Conteúdo da aba 'Preview' */}
        <TabsContent className="py-4" value="preview">
          <div className="rounded-xl border border-border bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-center bg-size-[10px_10px] bg-zinc-950/0.75 p-4 [--pattern-foreground:var(--color-zinc-950)]/5 dark:bg-white/0.75 dark:[--pattern-foreground:var(--color-white)]/5">
            {/* Botões de 'Replay' e 'Open in V0', exibidos condicionalmente */}
            {(canReplay || openInV0Url) && (
              <div className="flex justify-end gap-2">
                {canReplay && (
                  <SimpleTooltip content="Replay">
                    <Button
                      className="size-8 cursor-pointer"
                      onClick={() => setReplay((v) => v + 1)}
                      size="icon"
                      variant="outline"
                    >
                      <RepeatIcon />
                    </Button>
                  </SimpleTooltip>
                )}

                {openInV0Url && <OpenInV0Button url={openInV0Url} />}
              </div>
            )}

            {/* Contêiner da pré-visualização do componente, com `Suspense` para carregamento assíncrono */}
            <div
              className="flex min-h-80 items-center justify-center font-sans"
              key={replay} // A chave `replay` força a remontagem do componente para simular um 'replay'.
            >
              <React.Suspense
                fallback={
                  <div className="flex items-center justify-center text-muted-foreground text-sm">
                    Loading...
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </div>
          </div>
        </TabsContent>

        {/* Conteúdo da aba 'Code' */}
        <TabsContent className="[&>figure]:m-0" value="code">
          {/* Utiliza `CollapsibleCodeContainer` para exibir o código, permitindo que seja colapsável */}
          <CollapsibleCodeContainer
            className="my-0"
            collapsible={codeCollapsible}
          >
            {Code}
          </CollapsibleCodeContainer>
        </TabsContent>
      </Tabs>
    </div>
  )
}
