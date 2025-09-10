import { z } from "zod"

import { authBaseSchema } from "@/validations/auth/auth-base.schema"

/**
 * Schema de registro de usuário
 *
 * Define a estrutura e regras de validação para o registro de novos
 * usuários. Garante que todos os campos obrigatórios estejam presentes
 * e válidos antes de prosseguir com o cadastro.
 */
export const signUpSchema = z.object({
  name: authBaseSchema.name,
  lastName: authBaseSchema.lastName,
  email: authBaseSchema.email,
  password: authBaseSchema.password,
})

/**
 * Tipos derivados dos schemas
 *
 * Define tipos TypeScript derivados dos schemas Zod para garantir
 * type-safety em toda a aplicação. Facilita o uso em formulários
 * e respostas de API.
 */
export type SignUpFormValues = z.infer<typeof signUpSchema>
