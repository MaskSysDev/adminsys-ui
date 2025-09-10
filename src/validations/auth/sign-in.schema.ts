import { z } from "zod"

import { authBaseSchema, VALIDATION } from "@/validations/auth/auth-base.schema"

/**
 * Schema de autenticação
 *
 * Define a estrutura e regras de validação para o processo de login.
 * Suporta autenticação em duas etapas (2FA) através do campo code opcional.
 */
export const signInSchema = z.object({
  email: authBaseSchema.email,
  password: z.string().min(1, VALIDATION.password.required),
  code: z.string().optional(),
})

/**
 * Tipos derivados dos schemas
 *
 * Define tipos TypeScript derivados dos schemas Zod para garantir
 * type-safety em toda a aplicação. Facilita o uso em formulários
 * e respostas de API.
 */
export type SignInFormValues = z.infer<typeof signInSchema>
