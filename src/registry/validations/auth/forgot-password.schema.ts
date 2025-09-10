import { z } from "zod"

import { authBaseSchema } from "@/validations/auth/auth-base.schema"

/**
 * Schema de recuperação de senha
 *
 * Define a estrutura e regras de validação para o processo de
 * recuperação de senha. Requer apenas o email para iniciar o processo.
 */
export const forgotPasswordSchema = z.object({
  email: authBaseSchema.email,
})

/**
 * Tipos derivados dos schemas
 *
 * Define tipos TypeScript derivados dos schemas Zod para garantir
 * type-safety em toda a aplicação. Facilita o uso em formulários
 * e respostas de API.
 */
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
