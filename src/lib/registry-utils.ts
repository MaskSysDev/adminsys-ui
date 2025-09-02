import { Index } from "@/__registry__"

/**
 * Recupera uma entrada de componente do registro global pelo seu nome.
 * Esta função centraliza o acesso ao objeto `Index`, abstraindo sua utilização direta
 * e facilitando futuras modificações na estrutura do registro.
 *
 * @param name O nome do componente a ser recuperado.
 * @returns A entrada do registro correspondente ao nome, ou `undefined` se não for encontrada.
 */
export function getRegistryEntry(name: string) {
  return Index[name]
}
