import { z } from "zod"

import { authBaseSchema, VALIDATION } from "@/validations/auth/auth-base.schema"

/**
 * Schema de redefinição de senha
 *
 * Define a estrutura e regras de validação para o processo de
 * redefinição de senha. Garante que a senha e confirmação sejam
 * iguais através de uma validação customizada.
 */
export const resetPasswordSchema = z
  .object({
    password: authBaseSchema.password,
    confirmPassword: z.string().min(1, VALIDATION.confirmPassword.required),
    token: z.string().min(1, VALIDATION.token.required),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: VALIDATION.confirmPassword.mismatch,
    path: ["confirmPassword"],
  })

/**
 * Tipos derivados dos schemas
 *
 * Define tipos TypeScript derivados dos schemas Zod para garantir
 * type-safety em toda a aplicação. Facilita o uso em formulários
 * e respostas de API.
 */
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
