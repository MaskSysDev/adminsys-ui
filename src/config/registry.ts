import { env } from "@/config/env"

/**
 * Este arquivo define as configurações relacionadas ao registro de componentes do projeto.
 * Ele centraliza valores como a URL base do registro, que pode ser utilizada para
 * substituir placeholders em caminhos de dependência.
 */
export const registryConfig = {
  /**
   * A URL base do registro de componentes.
   * É utilizada para substituir o placeholder `<registryBaseUrl>` em caminhos de dependência
   * definidos nos metadados dos componentes. O valor é obtido da variável de ambiente `REGISTRY_URL`
   * ou, caso não esteja definida, utiliza `http://localhost:3000/r` como fallback.
   */
  baseUrl: env.REGISTRY_URL || "http://localhost:3000/r",
  /**
   * A URL base do registro de componentes.
   * É utilizada para substituir o placeholder `<baseUrl>` em caminhos de dependência
   * definidos nos metadados dos componentes. O valor é obtido da variável de ambiente `NEXT_PUBLIC_APP_URL`
   * ou, caso não esteja definida, utiliza `http://localhost:3000` como fallback.
   */
  url: env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  author: "MaskSysDev",
  authorUrl: "https://github.com/MaskSysDev",
}
