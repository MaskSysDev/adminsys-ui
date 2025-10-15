"use client"

import { Upload, User2Icon } from "lucide-react"
import { useRef, useState } from "react"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { LoadingSpinner } from "@/registry/components/shared/loading/loading-spinner"

/**
 * Estado do formulário de imagem de conta
 *
 * Centraliza o controle de UI e feedback do formulário:
 * - Loading durante requisições
 * - Preview da imagem
 * - Mensagens de erro/sucesso
 */
type FormState = {
  isLoading: boolean
  imageUrl: string | null
  errorMessage: string | null
}

/**
 * Formulário de imagem de conta
 *
 * Implementa o fluxo completo de gerenciamento de imagem:
 * - Seleção de arquivo
 * - Preview da imagem
 * - Upload via server action
 * - Remoção da imagem
 * - Feedback visual
 */
export function AccountImageForm() {
  /**
   * Referência para o input de arquivo
   *
   * Permite acionar o seletor de arquivo
   * programaticamente.
   */
  const fileInputRef = useRef<HTMLInputElement>(null)

  /**
   * Estado inicial do formulário
   *
   * Controla o estado de loading e preview
   * da imagem durante o processo.
   */
  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    imageUrl: null,
    errorMessage: null,
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
   * Processa o upload da imagem
   *
   * Gerencia o fluxo completo de upload:
   * - Validação do arquivo
   * - Preview da imagem
   * - Upload via server action
   * - Feedback ao usuário
   * - Logs para auditoria
   */
  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    try {
      // Inicia o processo e limpa feedback anterior
      updateFormState({
        isLoading: true,
        errorMessage: null,
      })

      // Cria preview temporário da imagem
      const imageUrl = URL.createObjectURL(file)
      updateFormState({ imageUrl })

      // Prepara dados para envio
      const formData = new FormData()
      formData.append("file", file)

      // TODO: Envia imagem para upload
      // biome-ignore lint/style/noMagicNumbers: Magic number detected. Extract it to a constant with a meaningful name.
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Processa erro de upload
      // if (!result.success) {
      //   updateFormState({ errorMessage: result.error })
      //   return
      // }

      // Exibe feedback visual
      toast.success("Imagem atualizada", {
        description: "Sua foto de conta foi atualizada com sucesso.",
        classNames: {
          success: "!bg-green-200 !text-green-600 dark:!bg-green-950",
          description: "!text-muted-foreground",
        },
      })
    } catch (error) {
      // Trata erros inesperados
      const errorMsg =
        error instanceof Error
          ? error.message
          : "Erro ao fazer upload da imagem"
      updateFormState({ errorMessage: errorMsg })
    } finally {
      // Finaliza o processo independente do resultado
      updateFormState({ isLoading: false })
    }
  }

  /**
   * Processa a remoção da imagem
   *
   * Gerencia o fluxo de remoção:
   * - Confirmação do usuário
   * - Remoção via server action
   * - Feedback visual
   * - Logs para auditoria
   */
  async function handleRemove() {
    try {
      // Inicia o processo e limpa feedback anterior
      updateFormState({
        isLoading: true,
        errorMessage: null,
      })

      // TODO: Remove a imagem
      // biome-ignore lint/style/noMagicNumbers: Magic number detected. Extract it to a constant with a meaningful name.
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Processa erro de remoção
      // if (!result.success) {
      //   updateFormState({ errorMessage: result.error })
      //   return
      // }

      // Limpa preview e estado
      updateFormState({ imageUrl: null })

      // Exibe feedback visual
      toast.success("Imagem removida", {
        description: "Sua foto de conta foi removida com sucesso.",
        classNames: {
          success: "!bg-green-200 !text-green-600 dark:!bg-green-950",
          description: "!text-muted-foreground",
        },
      })
    } catch (error) {
      // Trata erros inesperados
      const errorMsg =
        error instanceof Error ? error.message : "Erro ao remover imagem"
      updateFormState({ errorMessage: errorMsg })
    } finally {
      // Finaliza o processo independente do resultado
      updateFormState({ isLoading: false })
    }
  }

  return (
    <Card className="mt-16 xl:mt-0">
      <CardHeader>
        <CardTitle className="text-lg">Foto de conta</CardTitle>
        <CardDescription className="text-muted-foreground">
          Faça upload de uma foto para ajudar outros a reconhecê-lo.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-32 w-32">
            <AvatarImage
              className="object-cover object-center"
              src={
                formState.imageUrl || "/placeholder.svg?height=128&width=128"
              }
            />
            <AvatarFallback className="rounded-full">
              <User2Icon className="h-24 w-24" />
            </AvatarFallback>
          </Avatar>

          <div className="flex w-full flex-col space-y-2">
            <input
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                handleUpload(e)
              }}
              ref={fileInputRef}
              type="file"
            />

            <Button
              className="flex cursor-pointer items-center space-x-2"
              disabled={formState.isLoading}
              onClick={() => {
                fileInputRef.current?.click()
              }}
              size="sm"
              type="button"
              variant="outline"
            >
              {formState.isLoading ? (
                <LoadingSpinner className="h-4 w-4" />
              ) : (
                <Upload className="h-4 w-4" />
              )}
              <span>Upload de nova foto</span>
            </Button>

            <Button
              className="cursor-pointer text-red-600 hover:text-red-300"
              disabled={formState.isLoading || !formState.imageUrl}
              onClick={() => {
                handleRemove()
              }}
              size="sm"
              type="button"
              variant="ghost"
            >
              Remover foto
            </Button>
          </div>

          <p className="text-center text-muted-foreground text-xs">
            Recomendado: Imagem quadrada, mínimo 400×400px e menos de 2MB.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
