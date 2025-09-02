import { loader } from "fumadocs-core/source"
import { icons } from "lucide-react"
import { createElement } from "react"

import { docs } from "@/.source"

/**
 * @description Configuração da fonte de dados do Fumadocs.
 * Define como o conteúdo da documentação é carregado e acessado.
 * @see https://fumadocs.vercel.app/docs/headless/source-api
 */
export const source = loader({
  // Define a URL base para as páginas da documentação.
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
  icon(icon) {
    if (!icon) {
      // You may set a default icon
      return
    }
    if (icon in icons) {
      return createElement(icons[icon as keyof typeof icons])
    }
  },
})
