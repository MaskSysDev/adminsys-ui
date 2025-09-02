/**
 * @typedef {import("./types/unist").UnistTree} UnistTree
 * @typedef {import("./types/unist").UnistNode} UnistNode
 * @typedef {import("vfile").VFile} VFile
 */

// Este é o código-fonte da biblioteca "remark-code-import",
// customizado para se adequar ao projeto.

import fs from "node:fs"
import { EOL } from "node:os"
import path from "node:path"

import stripIndent from "strip-indent"
import { visit } from "unist-util-visit"

// --- Tipos e Constantes ---

/**
 * @typedef {object} RemarkCodeImportOptions
 * @property {string} [rootDir]
 * @property {boolean} [preserveTrailingNewline]
 * @property {boolean} [removeRedundantIndentations]
 */

/**
 * @typedef {object} ExtractLinesOptions
 * @property {number | undefined} [fromLine]
 * @property {boolean | undefined} [hasDash]
 * @property {number | undefined} [toLine]
 * @property {boolean} [preserveTrailingNewline]
 */

/**
 * @typedef {object} FileMeta
 * @property {string} path
 * @property {number | undefined} fromLine
 * @property {number | undefined} toLine
 * @property {boolean} hasDash
 */

const FILE_META_REGEX =
  /^file=(?<path>.+?)(?:(?:#(?:L(?<from>\d+)(?<dash>-)?)?)(?:L(?<to>\d+))?)?$/
const ROOT_DIR_ALIAS_REGEX = /^@/
const ESCAPED_SPACE_REGEX = /\\ /g

// --- Funções Auxiliares ---

/**
 * Extrai um intervalo de linhas de uma string.
 * @param {string} content O conteúdo completo do arquivo.
 * @param {ExtractLinesOptions} options As opções para extração.
 * @returns {string} O trecho de código extraído.
 */
function extractLines(content, options) {
  const { fromLine, hasDash, toLine, preserveTrailingNewline = false } = options
  const lines = content.split(EOL)
  const start = fromLine || 1

  let end
  if (!hasDash) {
    end = start
  } else if (toLine) {
    end = toLine
  } else if (lines.at(-1) === "" && !preserveTrailingNewline) {
    end = lines.length - 1
  } else {
    end = lines.length
  }

  return lines.slice(start - 1, end).join("\n")
}

/**
 * Analisa os metadados do arquivo a partir da string de meta do nó.
 * @param {string} meta A string de meta do nó.
 * @returns {FileMeta | null}
 */
function parseFileMeta(meta) {
  const fileMeta = meta.split(/(?<!\\) /g).find((s) => s.startsWith("file="))
  if (!fileMeta) {
    return null
  }

  const match = FILE_META_REGEX.exec(fileMeta)
  if (!match?.groups?.path) {
    return null
  }

  const { path: filePath, from, dash, to } = match.groups

  return {
    path: filePath,
    fromLine: from ? Number.parseInt(from, 10) : undefined,
    hasDash: !!dash || from === undefined,
    toLine: to ? Number.parseInt(to, 10) : undefined,
  }
}

// --- Plugin Principal ---

/**
 * Plugin Remark para importar trechos de código de arquivos externos.
 * @param {RemarkCodeImportOptions} [options={}]
 */
export function remarkCodeImport(options = {}) {
  const { rootDir = path.join(process.cwd(), "src"), ...restOptions } = options

  if (!path.isAbsolute(rootDir)) {
    throw new Error(`"rootDir" precisa ser um caminho absoluto
`)
  }

  /**
   * @param {UnistTree} tree
   * @param {VFile} file
   */
  return function transformer(tree, file) {
    const nodesToProcess = []
    visit(tree, "code", (node) => {
      if (node.meta?.includes("file=")) {
        nodesToProcess.push({ node, file, rootDir, options: restOptions })
      }
    })

    for (const {
      node,
      file: currentFile,
      rootDir: currentRootDir,
      options: currentOptions,
    } of nodesToProcess) {
      const parsedMeta = parseFileMeta(node.meta || "")
      if (!parsedMeta) {
        throw new Error(
          `Não foi possível analisar o caminho do arquivo: ${node.meta}`
        )
      }

      const normalizedFilePath = parsedMeta.path
        .replace(ROOT_DIR_ALIAS_REGEX, currentRootDir)
        .replace(ESCAPED_SPACE_REGEX, " ")

      const fileAbsPath = path.resolve(currentFile.dirname, normalizedFilePath)

      const relativePathFromRootDir = path.relative(currentRootDir, fileAbsPath)
      if (
        !currentRootDir ||
        relativePathFromRootDir.startsWith(`..${path.sep}`)
      ) {
        throw new Error(
          `Tentativa de importar código de "${fileAbsPath}", que está fora do diretório raiz "${currentRootDir}"
`
        )
      }

      const fileContent = fs.readFileSync(fileAbsPath, "utf8")

      node.value = extractLines(fileContent, {
        fromLine: parsedMeta.fromLine,
        hasDash: parsedMeta.hasDash,
        toLine: parsedMeta.toLine,
        preserveTrailingNewline: currentOptions.preserveTrailingNewline,
      })

      if (currentOptions.removeRedundantIndentations) {
        node.value = stripIndent(node.value)
      }
    }
  }
}
