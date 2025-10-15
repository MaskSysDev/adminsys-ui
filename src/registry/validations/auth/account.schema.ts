import { z } from "zod"

import { sanitizePassword } from "@/registry/utils/sanitize"
import { authBaseSchema } from "@/validations/auth/auth-base.schema"

const IMAGE_SIZE = 1024

/**
 * Constantes de validação
 *
 * Centraliza as regras de validação para garantir consistência nas mensagens
 * e facilitar manutenção. Evita duplicação de código e permite alterações
 * centralizadas.
 */
const VALIDATION = {
  currentPassword: {
    required: "Senha atual é obrigatória",
  },
  newPassword: {
    min: 8,
    max: 100,
    required: "Nova senha é obrigatória",
    // Regex para garantir senha forte: maiúscula, minúscula, número e caractere especial
    regex:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    invalid:
      "A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial",
  },
  confirmPassword: {
    required: "Confirmação de senha é obrigatória",
    mismatch: "As senhas não conferem",
  },
  accountImage: {
    maxSize: 2 * IMAGE_SIZE * IMAGE_SIZE, // 2MB
    maxSizeMessage: "A imagem deve ter no máximo 2MB",
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
    invalidType: "Formato de imagem não suportado. Use JPG, PNG ou WebP.",
  },
}

/**
 * Schema de atualização de conta
 *
 * Define a estrutura e regras de validação para atualização dos dados
 * da conta do usuário. Inclui validação de senha atual e nova senha,
 * além de suporte para configuração de 2FA.
 */
export const accountSchema = z
  .object({
    name: authBaseSchema.name,
    lastName: authBaseSchema.lastName,
    isTwoFactorEnabled: z.optional(z.boolean()),
    currentPassword: z.string().min(1, VALIDATION.currentPassword.required),
    newPassword: z
      .string()
      .min(1, VALIDATION.newPassword.required)
      .regex(VALIDATION.newPassword.regex, VALIDATION.newPassword.invalid)
      .min(
        VALIDATION.newPassword.min,
        `Senha deve ter no mínimo ${VALIDATION.newPassword.min} caracteres`
      )
      .max(
        VALIDATION.newPassword.max,
        `Senha deve ter no máximo ${VALIDATION.newPassword.max} caracteres`
      )
      .transform(sanitizePassword)
      .optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false
      }
      return true
    },
    {
      message: VALIDATION.confirmPassword.mismatch,
      path: ["confirmPassword"],
    }
  )

/**
 * Schema de validação para imagem de conta
 *
 * Define as regras para upload de imagens:
 * - Tipos permitidos: jpeg, png, webp
 * - Tamanho máximo: 2MB
 * - Dimensões mínimas: 400x400px
 */
export const accountImageSchema = z.object({
  file: z.instanceof(File),
  size: z
    .number()
    .max(
      VALIDATION.accountImage.maxSize,
      VALIDATION.accountImage.maxSizeMessage
    ),
  type: z
    .string()
    .refine(
      (type) => VALIDATION.accountImage.allowedTypes.includes(type),
      VALIDATION.accountImage.invalidType
    ),
})

/**
 * Tipo derivado do schema
 *
 * Define o tipo TypeScript derivado do schema Zod para garantir
 * type-safety em toda a aplicação. Facilita o uso em formulários
 * e respostas de API.
 */
export type AccountFormValues = z.infer<typeof accountSchema>
export type AccountImageFormValues = z.infer<typeof accountImageSchema>
