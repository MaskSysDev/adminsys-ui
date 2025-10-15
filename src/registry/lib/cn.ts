import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina classes Tailwind CSS de forma condicional e resolve conflitos.
 * Utiliza `clsx` para combinar classes e `tailwind-merge` para resolver conflitos de forma inteligente.
 * @param inputs As classes CSS a serem combinadas.
 * @returns Uma string contendo as classes CSS combinadas e resolvidas.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
