import { Icons } from "@/components/layout/icons"
import { Logo } from "@/components/layout/logo/logo-docsys"

import { env } from "@/config/env"
import type {
  Assets,
  AuthorInfo,
  ContactInfo,
  SiteConfig,
  SiteMeta,
  SocialLink,
} from "@/config/types"
import { siteConfigSchema } from "@/config/validation/site-config.schema"

/**
 * Metadados principais do site
 *
 * Responsabilidades:
 * - Definir informações básicas do site para SEO e metadados
 * - Centralizar dados essenciais como nome, descrição e URL
 *
 * Retorno:
 * - Objeto contendo os metadados do site
 */
const siteMeta: SiteMeta = {
  name: "DocSys Started",
  description:
    "React App with Next.js, Typescript, TailwindCSS, Shadcn, Biome, Husky, Commitlint and more.",
  url: env.NEXT_PUBLIC_APP_URL,
  locale: "en-US",
  keywords: [
    "React",
    "Next.js",
    "TypeScript",
    "TailwindCSS",
    "Shadcn",
    "BiomeJs",
    "Husky",
    "Commitlint",
  ],
  twitterHandle: "@docsys",
}

/**
 * Caminhos dos favicons e logos do site
 *
 * Responsabilidades:
 * - Centralizar caminhos de imagens globais
 * - Facilitar manutenção de assets visuais
 *
 * Retorno:
 * - Objeto contendo os caminhos de todos os assets
 */
const assets: Assets = {
  favicon: "/favicon.ico",
  favicon16x16: "/assets/images/icon/icon-16x16.png",
  favicon32x32: "/assets/images/icon/icon-32x32.png",
  favicon180x180: "/assets/images/icon/icon-180x180.png",
  favicon192x192: "/assets/images/icon/icon-192x192.png",
  favicon512x512: "/assets/images/icon/icon-512x512.png",
  logo: "/assets/images/logo/logo-dark.png",
  logoLight: "/assets/images/logo/logo-light.png",
  logoDark: "/assets/images/logo/logo-dark.png",
  manifest: "/sitemap.xml",
}

/**
 * Links de redes sociais do projeto
 *
 * Responsabilidades:
 * - Centralizar URLs de redes sociais
 * - Facilitar atualização de links sociais
 *
 * Retorno:
 * - Array de objetos com links de redes sociais
 */
const socialLinks: SocialLink[] = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: Icons.facebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: Icons.instagram,
  },
  {
    label: "Youtube",
    href: "https://www.youtube.com/",
    icon: Icons.youtube,
  },
]

/**
 * Informações de contato do site
 *
 * Responsabilidades:
 * - Centralizar emails de contato e suporte
 * - Facilitar comunicação com usuários
 *
 * Retorno:
 * - Objeto contendo informações de contato
 */
const contactInfo: ContactInfo = {
  contactEmail: "contato@docsys.com.br",
  supportEmail: "suporte@docsys.com.br",
}

/**
 * Informações do autor e do projeto
 *
 * Responsabilidades:
 * - Centralizar dados do autor, criador, publicador e repositório
 * - Facilitar atribuição e rastreamento do projeto
 *
 * Retorno:
 * - Objeto contendo informações do autor e do projeto
 */
const authorInfo: AuthorInfo = {
  author: "MaskSysDev",
  authorUrl: "https://github.com/MaskSysDev",
  creator: "Mask",
  publisher: "MaskSysDev",
  projectUrl: "https://github.com/MaskSysDev/docsys-started",
}

/**
 * Objeto de configuração principal do site
 *
 * Responsabilidades:
 * - Centralizar todas as configurações globais
 * - Fornecer dados para componentes e páginas
 * - Agregar todas as configurações em um único objeto
 *
 * Retorno:
 * - Objeto de configuração global do site
 */
export const siteConfig: SiteConfig = {
  ...siteMeta,
  ...assets,
  ...authorInfo,
  ...contactInfo,
  project: {
    url: authorInfo.projectUrl,
    author: authorInfo.author,
    authorUrl: authorInfo.authorUrl,
  },
  docsRepositoryBase: authorInfo.projectUrl,
  socialLinks,
}

// Validate at runtime in non-production to catch issues early
if (process.env.NODE_ENV !== "production") {
  siteConfigSchema.parse(siteConfig)
}

/**
 * Configuração da barra de navegação principal (Navbar01)
 *
 * Responsabilidades:
 * - Definir o conteúdo e a aparência da barra de navegação.
 * - Centralizar os itens de menu, logo e comportamento responsivo.
 *
 * Retorno:
 * - Objeto contendo as propriedades da barra de navegação.
 */
export const navbar01 = {
  label: "Menu",
  logo: <Logo.Theme />,
  logoIcon: <Logo.Icon className="size-6" />,
  logoResponsive: true,
  position: "end",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Features",
      href: "/#features",
    },
    {
      label: "Documentation",
      href: "/docs/get-started",
    },
  ],
}

/**
 * Configuração do rodapé principal (Footer01)
 *
 * Responsabilidades:
 * - Definir o conteúdo do rodapé, como nome, autor e links sociais.
 * - Centralizar informações exibidas na parte inferior do site.
 *
 * Retorno:
 * - Objeto contendo as propriedades do rodapé.
 */
export const footer01 = {
  name: "DocSys Started",
  author: "MaskSysDev",
  authorUrl: "https://github.com/MaskSysDev",
  socialLinks: [
    {
      label: "Facebook",
      icon: Icons.facebook,
      href: "/",
    },
    {
      label: "Instagram",
      icon: Icons.instagram,
      href: "/",
    },
    {
      label: "Youtube",
      icon: Icons.youtube,
      href: "/",
    },
  ],
}

/**
 * Configuração da seção de herói (Hero01)
 *
 * Responsabilidades:
 * - Definir o conteúdo principal da seção de destaque (hero).
 * - Centralizar títulos, descrições e ações (botões).
 *
 * Retorno:
 * - Objeto contendo as propriedades da seção de herói.
 */
export const hero01 = {
  title: "DocSys Started Boilerplate",
  subTitle: "Template",
  subTitleColor: "Docs",
  description:
    "React App with Next.js, Typescript, TailwindCSS, Shadcn, Biome, Husky, Commitlint and more.",
  size: "90",
  gradientTop: true,
  gradientBottom: true,
  actions: {
    action01: {
      label: "Get Started",
      href: "/docs/get-started",
    },
    action02: {
      label: "GitHub",
      href: "https://github.com/MaskSysDev/docsys-started",
    },
  },
}

/**
 * Configuração da seção de funcionalidades (FeaturesSection)
 *
 * Responsabilidades:
 * - Definir o conteúdo da seção que destaca as funcionalidades ou tecnologias.
 * - Centralizar o título, a descrição e a lista de features.
 *
 * Retorno:
 * - Objeto contendo as propriedades da seção de funcionalidades.
 */
export const featuresSection = {
  title: "Technologies that enhance the project",
  description:
    "A modern, productive, and reliable stack to accelerate development and ensure quality from start to finish.",
  features: [
    {
      icon: Icons.react,
      title: "React",
      description: "Declarative library for building modern user interfaces.",
    },
    {
      icon: Icons.nextJS,
      title: "Next.js",
      description:
        "Production-grade React framework with SSR, SSG, and API Routes.",
    },
    {
      icon: Icons.typescript,
      title: "TypeScript",
      description:
        "Advanced static typing for safer and more productive development.",
    },
    {
      icon: Icons.biome,
      title: "Biome",
      description:
        "Automatic code formatter to keep style consistent across the project.",
    },
    {
      icon: Icons.tailwindCSS,
      title: "TailwindCSS",
      description:
        "Fast and responsive styling with highly customizable CSS utilities.",
    },
    {
      icon: Icons.shadcn,
      title: "Shadcn UI",
      description: "Modern, accessible, and production-ready UI components.",
    },
  ],
}
