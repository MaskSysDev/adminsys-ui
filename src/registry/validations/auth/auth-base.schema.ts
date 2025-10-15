import { z } from "zod"

import {
  sanitizeEmail,
  sanitizeName,
  sanitizePassword,
} from "@/registry/utils/sanitize"

/**
 * Constantes de validação
 *
 * Centraliza as regras de validação para garantir consistência nas mensagens
 * e facilitar manutenção. Evita duplicação de código e permite alterações
 * centralizadas.
 */
export const VALIDATION = {
  name: {
    min: 3,
    max: 100,
    required: "Nome é obrigatório",
  },
  lastName: {
    min: 3,
    max: 100,
    required: "Sobrenome é obrigatório",
  },
  email: {
    max: 100,
    required: "Email é obrigatório",
    invalid: "Email inválido",
  },
  password: {
    min: 8,
    max: 100,
    required: "Senha é obrigatória",
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
  code: {
    required: "Código é obrigatório",
    invalid: "Código inválido",
  },
  token: {
    required: "Token é obrigatório",
    invalid: "Token inválido",
  },
}

/**
 * Schemas base reutilizáveis
 *
 * Define schemas base que podem ser reutilizados em diferentes contextos
 * de validação. Cada schema inclui transformações para sanitização dos
 * dados antes da validação.
 */
export const authBaseSchema = {
  name: z
    .string()
    .min(1, VALIDATION.name.required)
    .min(
      VALIDATION.name.min,
      `Nome deve ter no mínimo ${VALIDATION.name.min} caracteres`
    )
    .max(
      VALIDATION.name.max,
      `Nome deve ter no máximo ${VALIDATION.name.max} caracteres`
    )
    .transform(sanitizeName),
  lastName: z
    .string()
    .min(1, VALIDATION.lastName.required)
    .min(
      VALIDATION.lastName.min,
      `Sobrenome deve ter no mínimo ${VALIDATION.lastName.min} caracteres`
    )
    .max(
      VALIDATION.lastName.max,
      `Sobrenome deve ter no máximo ${VALIDATION.lastName.max} caracteres`
    )
    .transform(sanitizeName),
  email: z
    .string()
    .min(1, VALIDATION.email.required)
    .max(
      VALIDATION.email.max,
      `Email deve ter no máximo ${VALIDATION.email.max} caracteres`
    )
    .email(VALIDATION.email.invalid)
    .transform(sanitizeEmail),
  password: z
    .string()
    .min(1, VALIDATION.password.required)
    .regex(VALIDATION.password.regex, VALIDATION.password.invalid)
    .min(
      VALIDATION.password.min,
      `Senha deve ter no mínimo ${VALIDATION.password.min} caracteres`
    )
    .max(
      VALIDATION.password.max,
      `Senha deve ter no máximo ${VALIDATION.password.max} caracteres`
    )
    .transform(sanitizePassword),
}
