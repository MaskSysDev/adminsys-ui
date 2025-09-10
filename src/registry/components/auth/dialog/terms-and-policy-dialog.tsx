"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

/**
 * Propriedades do componente TermsDialog
 *
 * Define a configuração do diálogo, incluindo título,
 * descrição e conteúdo a ser exibido.
 */
export type TermsDialogProps = {
  title: string
  description: string
  content: string
  isOpen: boolean
  onCloseAction: () => void
}

/**
 * Componente de diálogo para exibição de termos e políticas
 *
 * Fornece uma interface modal para visualização de documentos
 * legais com rolagem e layout adequado.
 */
export function TermsAndPolicyDialog({
  title,
  description,
  content,
  isOpen,
  onCloseAction,
}: TermsDialogProps) {
  return (
    <Dialog onOpenChange={onCloseAction} open={isOpen}>
      <DialogContent className="max-h-[80vh] max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {/* Área de rolagem para o conteúdo. Permite visualização confortável de textos longos */}
        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="prose prose-sm dark:prose-invert">{content}</div>
        </ScrollArea>

        {/* Rodapé do diálogo com botão de fechar */}
        <DialogFooter>
          {/*
           * Botão de fechar usando DialogClose
           * - type='button': Evita submissão acidental de formulários
           * - variant='secondary': Estilo visual mais suave que o primário
           * - className='cursor-pointer': Indica interatividade
           */}
          <DialogClose asChild>
            <Button
              className="cursor-pointer"
              type="button"
              variant="secondary"
            >
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
