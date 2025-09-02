import type { Metadata, Viewport } from "next"

import { ThemeProvider } from "@/components/layout/provider/theme-provider"

import { geistMono, geistSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

import { siteConfig } from "@/config/site-config"

import "@/styles/globals.css"

import { createMetadata } from "@/lib/metadata"

export const metadata: Metadata = createMetadata({
  // URL base para geração de links absolutos em Open Graph e Twitter
  metadataBase: new URL(siteConfig.url || "http://localhost:3000"),

  // Configuração do título da página
  title: {
    default: siteConfig.name || "DocSys", // Título padrão da aplicação
    template: `%s - ${siteConfig.name || "DocSys"}`, // Template para títulos de páginas específicas
  },

  // Descrição da aplicação para SEO
  description:
    siteConfig.description ||
    "React App with Next.js, Typescript, TailwindCSS, Shadcn, Biome, Husky, Commitlint and more.",

  // Palavras-chave para SEO
  keywords: siteConfig.keywords || [
    "React",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "Shadcn",
    "BiomeJs",
    "Husky",
    "Commitlint",
  ],

  // Informações dos autores do projeto
  authors: [
    {
      name: siteConfig.author || "MaskSysDev", // Nome do autor
      url: siteConfig.authorUrl || "https://github.com/MaskSysDev", // URL do autor
    },
  ],

  // Informações de criação e publicação
  creator: siteConfig.creator || "Mask", // Criador do projeto
  publisher: siteConfig.publisher || "MaskSysDev", // Publicador do projeto

  // Configurações de robots para controle de indexação
  robots: {
    follow: true, // Seguir links automaticamente
    index: true, // Indexar a página
    nocache: false, // Permitir cache da página
    googleBot: {
      index: true, // Google deve indexar
      follow: true, // Google deve seguir links
      noimageindex: false, // Permitir indexação de imagens
      "max-video-preview": -1, // Permitir preview completo de vídeos
      "max-image-preview": "large", // Permitir preview grande de imagens
      "max-snippet": -1, // Permitir snippet completo
    },
  },

  // Configurações de detecção automática de formato
  formatDetection: {
    email: false, // Não detectar emails automaticamente
    address: false, // Não detectar endereços automaticamente
    telephone: false, // Não detectar telefones automaticamente
  },

  // Configuração de ícones e favicons
  icons: {
    icon: [
      { url: siteConfig.favicon || "/favicon.ico", sizes: "any" }, // Favicon principal
      {
        url: siteConfig.favicon16x16 || "/assets/images/icon/icon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      }, // Favicon 16x16
      {
        url: siteConfig.favicon32x32 || "/assets/images/icon/icon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      }, // Favicon 32x32
    ],
    apple: [
      {
        url:
          siteConfig.favicon180x180 || "/assets/images/icon/icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      }, // Ícone para Apple
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/assets/images/icon/icon.svg",
        color: "#000000",
      }, // Ícone SVG para Safari
    ],
  },

  // Configuração do manifesto para PWA
  manifest: siteConfig.manifest || "/sitemap.xml", // Caminho do manifesto PWA

  // Configuração do Open Graph para redes sociais
  openGraph: {
    type: "website", // Tipo de conteúdo
    title: siteConfig.name || "DocSys", // Título para compartilhamento
    locale: siteConfig.locale || "en-US", // Localização do conteúdo
    description:
      siteConfig.description ||
      "React App with Next.js, Typescript, TailwindCSS, Shadcn, Biome, Husky, Commitlint and more.", // Descrição para compartilhamento
    url: siteConfig.url || "https://docsys-started.vercel.app", // URL da página
    siteName: siteConfig.name || "DocSys", // Nome do site
    images: [
      // Imagens para compartilhamento em diferentes tamanhos
      {
        url:
          siteConfig.favicon180x180 || "/assets/images/icon/icon-180x180.png", // Imagem 180x180
        width: 180,
        height: 180,
        alt: `${siteConfig.name || "DocSys"} - Logo`, // Alt text para acessibilidade
      },
      {
        url:
          siteConfig.favicon192x192 || "/assets/images/icon/icon-192x192.png", // Imagem 192x192
        width: 192,
        height: 192,
        alt: `${siteConfig.name || "DocSys"} - Logo`, // Alt text para acessibilidade
      },
      {
        url:
          siteConfig.favicon512x512 || "/assets/images/icon/icon-512x512.png", // Imagem 512x512
        width: 512,
        height: 512,
        alt: `${siteConfig.name || "DocSys"} - Logo`, // Alt text para acessibilidade
      },
    ],
  },

  // Configuração específica para Twitter
  twitter: {
    card: "summary_large_image", // Tipo de card do Twitter
    title: siteConfig.name || "DocSys", // Título para Twitter
    description:
      siteConfig.description ||
      "React App with Next.js, Typescript, TailwindCSS, Shadcn, Biome, Husky, Commitlint and more.", // Descrição para Twitter
    images: [
      siteConfig.favicon512x512 || "/assets/images/icon/icon-512x512.png", // Imagem para Twitter
    ],
    creator: siteConfig.creator || "Mask", // Criador do conteúdo
    site: siteConfig.twitterHandle || "@docsys", // Handle do Twitter do site
  },
})

export const viewport: Viewport = {
  // Configuração de largura e altura do viewport
  width: "device-width", // Largura baseada no dispositivo
  height: "device-height", // Altura baseada no dispositivo

  // Configuração de escala e zoom
  initialScale: 1, // Escala inicial
  maximumScale: 5, // Escala máxima permitida
  minimumScale: 1, // Escala mínima permitida
  userScalable: true, // Permite zoom do usuário

  // Configuração de cores de tema para diferentes esquemas
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" }, // Cor para modo claro
    { media: "(prefers-color-scheme: dark)", color: "#000000" }, // Cor para modo escuro
  ],

  // Configurações adicionais de viewport
  viewportFit: "cover", // Ajuste do viewport para cobrir toda a tela
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      className="scroll-smooth"
      data-scroll-behavior="smooth"
      dir="ltr"
      lang={siteConfig.locale || "en-US"}
      suppressHydrationWarning
    >
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "font-sans antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
