import { z } from "zod"

/**
 * Utilitários para sanitização de dados
 *
 * Implementa funções para limpar e padronizar diferentes tipos de dados:
 * - Strings (removendo caracteres especiais)
 * - Emails (padronizando formato)
 * - Nomes (formatando corretamente)
 * - Senhas (preservando caracteres especiais)
 * - Dados de formulário (validação e sanitização)
 * - Respostas de API (validação e sanitização)
 */

// Lista de caracteres permitidos em regex
const ALLOWED_CHARS = {
  // Caracteres básicos
  basic: "a-zA-Z0-9",
  // Espaços e hífens
  spacing: "\\s\\-",
  // Acentos e caracteres especiais da língua portuguesa
  accents: "áàâãéêíóõôúçÁÀÂÃÉÊÍÓÕÔÚÇ^~´`",
  // Caracteres não permitidos (usados em código)
  forbidden: "{}()[]<>=\\+*/\\|&%$#@!?;:\"'",
}

/**
 * Sanitiza uma string removendo caracteres especiais e espaços extras
 *
 * Mantém apenas:
 * - Letras e números
 * - Espaços simples
 * - Hífens
 * - Acentos e caracteres especiais da língua portuguesa
 *
 * Exemplos:
 * - "João Paulo" -> "João Paulo"
 * - "José-Maria" -> "José-Maria"
 * - "Café com Leite" -> "Café com Leite"
 * - "Maria da Conceição" -> "Maria da Conceição"
 * - "José da Silva Júnior" -> "José da Silva Júnior"
 */
export function sanitizeString(value: string): string {
  const allowedChars = `${ALLOWED_CHARS.basic}${ALLOWED_CHARS.spacing}${ALLOWED_CHARS.accents}`

  return value
    .trim()
    .replace(/\s+/g, " ") // Remove espaços extras
    .replace(new RegExp(`[^${allowedChars}]`, "g"), "") // Remove caracteres não permitidos
}

/**
 * Sanitiza um email removendo espaços e convertendo para minúsculas
 *
 * Garante que o email esteja em um formato consistente:
 * - Sem espaços no início ou fim
 * - Todo em minúsculas
 */
export function sanitizeEmail(value: string): string {
  return value.trim().toLowerCase()
}

/**
 * Sanitiza os dados de entrada de acordo com o schema fornecido
 *
 * Processo de sanitização:
 * 1. Converte FormData para objeto se necessário
 * 2. Sanitiza strings (exceto senhas)
 * 3. Valida contra o schema Zod
 * 4. Retorna dados sanitizados e validados
 */
export function sanitizeData<T extends z.ZodType>(
  data: unknown,
  schema: T
): z.infer<T> {
  try {
    // Se for um FormData, converte para objeto
    if (data instanceof FormData) {
      const obj: Record<string, string> = {}
      data.forEach((value, key) => {
        obj[key] = value.toString()
      })
      // biome-ignore lint/style/noParameterAssign: Assigning a function parameter is confusing.
      data = obj
    }

    // Sanitiza strings antes da validação, exceto campos de senha
    if (typeof data === "object" && data !== null) {
      // biome-ignore lint/complexity/noForEach: Prefer for...of instead of forEach.
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === "string") {
          if (key.toLowerCase().includes("email")) {
            ;(data as Record<string, unknown>)[key] = sanitizeEmail(value)
          } else if (!key.toLowerCase().includes("password")) {
            ;(data as Record<string, unknown>)[key] = sanitizeString(value)
          }
        }
      })
    }

    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Validation error: ${error.issues.map((e) => e.message).join(", ")}`
      )
    }
    throw error
  }
}

/**
 * Sanitiza a resposta da API de acordo com o schema fornecido
 *
 * Garante que a resposta da API:
 * 1. Segue o formato esperado
 * 2. Contém todos os campos necessários
 * 3. Tem os tipos corretos
 */
export function sanitizeResponse<T extends z.ZodType>(
  response: unknown,
  schema: T
): z.infer<T> {
  try {
    return schema.parse(response)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Response validation error: ${error.issues.map((e) => e.message).join(", ")}`
      )
    }
    throw error
  }
}

/**
 * Sanitiza um nome removendo caracteres especiais e formatando corretamente
 *
 * Aplica as seguintes regras:
 * 1. Remove caracteres especiais (exceto caracteres da língua portuguesa)
 * 2. Remove espaços extras
 * 3. Primeira letra de cada palavra em maiúscula
 *
 * Exemplos:
 * - "joão paulo" -> "João Paulo"
 * - "josé-maria" -> "José-Maria"
 * - "café-com-leite" -> "Café-Com-Leite"
 * - "maria da conceição" -> "Maria Da Conceição"
 * - "josé da silva júnior" -> "José Da Silva Júnior"
 */
export function sanitizeName(name: string): string {
  // Primeiro sanitiza a string usando a função sanitizeString
  const sanitized = sanitizeString(name)

  return sanitized
    .replace(/^\p{L}/gu, (letter) => letter.toUpperCase()) // Primeira letra maiúscula
    .replace(/\s\p{L}/gu, (letter) => letter.toUpperCase()) // Primeira letra de cada palavra maiúscula
}

/**
 * Sanitiza uma senha removendo espaços extras
 *
 * Preserva:
 * - Caracteres especiais
 * - Case-sensitivity
 * - Espaços internos
 *
 * Remove apenas:
 * - Espaços no início e fim
 */
export function sanitizePassword(password: string): string {
  // Remove espaços extras, mas mantém a senha exatamente como foi digitada
  // para preservar caracteres especiais e case-sensitivity
  return password.trim()
}
