import fs from "node:fs"
import path from "node:path"

import { rehypeCode } from "fumadocs-core/mdx-plugins"
import { compileMDX } from "next-mdx-remote/rsc"

import { CollapsibleCodeContainer } from "@/components/layout/docs-layout/code/collapsible-code-container"
import { getMDXComponents } from "@/components/layout/docs-layout/mdx/mdx-components"

import { getRegistryEntry } from "@/lib/registry-utils"

/**
 * Componente `ComponentSource`:
 * Um componente de servidor assíncrono que lê o código-fonte de um componente
 * (seja pelo nome do registro ou por um caminho de arquivo direto), processa-o
 * e o renderiza como um bloco de código com destaque de sintaxe.
 * Utiliza `next-mdx-remote/rsc` para compilar o código como MDX.
 */
export async function ComponentSource({
  name,
  src: srcProp,
  title,
  codeCollapsible = false,
  className,
}: {
  /** O nome do componente no registro, usado para buscar seu caminho de arquivo. */
  name?: string
  /** Caminho direto para o arquivo de origem, se `name` não for usado. */
  src?: string
  /** Título a ser exibido para o bloco de código. */
  title?: string
  /** Se o bloco de código deve ser colapsável. */
  codeCollapsible?: boolean
  /** Classe CSS adicional para o contêiner do componente. */
  className?: string
}) {
  let resolvedSrc: string | undefined

  // Resolve o caminho do arquivo de origem, preferindo `name` do registro.
  if (name) {
    const component = getRegistryEntry(name)

    if (!component) {
      return null
    }

    resolvedSrc = component.files[0]?.path
    if (!resolvedSrc) {
      // biome-ignore lint/suspicious/noConsole: Don't use console.
      console.error(`Source file not found for component: ${name}`)
      return null
    }
  } else if (srcProp) {
    resolvedSrc = srcProp
  }

  // Retorna nulo se nenhum caminho de origem puder ser resolvido.
  if (!resolvedSrc) {
    // biome-ignore lint/suspicious/noConsole: Don't use console.
    console.error("ComponentSource requires either 'name' or 'src' prop.")
    return null
  }

  // Formata o título a ser exibido, removendo "/registry" do caminho.
  const displayTitle = title ?? resolvedSrc.replaceAll("/registry", "")
  // Constrói o caminho absoluto do arquivo.
  const filePath = path.join(process.cwd(), resolvedSrc)

  // Verifica se o arquivo existe.
  if (!fs.existsSync(filePath)) {
    // biome-ignore lint/suspicious/noConsole: Don't use console.
    console.error(`File not found at path: ${filePath}`)
    return null
  }

  // Lê o conteúdo do arquivo.
  let source = fs.readFileSync(filePath, "utf-8")

  // Realiza substituições no código-fonte para ajustar caminhos e exportações.
  source = source.replaceAll("@/registry/", "@/components/")
  source = source.replaceAll("export default", "export")

  // Extrai a linguagem do arquivo pela extensão.
  const lang = path.extname(filePath).slice(1)

  // Obtém os componentes MDX para renderização.
  const mdxComponents = getMDXComponents()

  // Formata o código-fonte em um bloco de código MDX com título.
  const code = `\`\`\`${lang} title="${title || displayTitle}"\n${source}\n\`\`\``

  // Compila o bloco de código MDX para renderização.
  const { content } = await compileMDX({
    source: code,
    components: mdxComponents,
    options: {
      mdxOptions: {
        rehypePlugins: [rehypeCode],
      },
    },
  })

  // Envolve o conteúdo compilado em uma div.
  const finalContent = <div className={className}>{content}</div>

  // Retorna o conteúdo dentro de um `CollapsibleCodeContainer` para funcionalidade de colapsar.
  return (
    <CollapsibleCodeContainer className="my-0" collapsible={codeCollapsible}>
      {finalContent}
    </CollapsibleCodeContainer>
  )
}
