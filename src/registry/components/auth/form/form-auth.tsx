"use client"

import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { CardAuthWrapper } from "@/registry/components/auth/card/card-auth-wrapper"
import { SignInForm } from "@/registry/components/auth/form/sign-in-form"
import { SignUpForm } from "@/registry/components/auth/form/sign-up-form"

/**
 * Define os tipos de abas disponíveis no formulário
 *
 * Controla a navegação entre as diferentes seções
 * do formulário de autenticação.
 */
type TabType = "sign-in" | "sign-up"

/**
 * Propriedades do componente FormAuth
 *
 * Define a configuração inicial do componente,
 * permitindo controlar qual aba deve estar ativa.
 */
export type FormAuthProps = {
  activeTab?: TabType
}

/**
 * Configuração dos formulários
 *
 * Define o título e descrição específicos para cada
 * tipo de formulário (login e cadastro).
 */
type FormConfig = {
  title: string
  description: string
}

/**
 * Configurações dos formulários
 *
 * Mapeia cada tipo de formulário com suas respectivas
 * configurações de título e descrição.
 */
const formConfig: Record<TabType, FormConfig> = {
  "sign-in": {
    title: "Login",
    description: "Entre com suas credenciais para acessar sua conta",
  },
  "sign-up": {
    title: "Criar Conta",
    description: "Preencha os dados abaixo para criar sua conta",
  },
} as const

/**
 * Mapeamento dos formulários
 *
 * Associa cada tipo de aba ao seu respectivo
 * componente de formulário.
 */
const formComponents: Record<TabType, React.ComponentType> = {
  "sign-in": SignInForm,
  "sign-up": SignUpForm,
} as const

/**
 * Componente principal de autenticação
 *
 * Gerencia o sistema de abas e a navegação entre os
 * formulários de login e cadastro.
 */
export function FormAuth({ activeTab = "sign-in" }: FormAuthProps) {
  /**
   * Estado que controla a aba ativa no formulário
   *
   * Inicializa com o valor da prop activeTab ou 'sign-in'
   * como padrão, permitindo alternar entre as abas.
   */
  const [currentTab, setCurrentTab] = useState<TabType>(activeTab)

  /**
   * Obtém a configuração atual do formulário
   *
   * Retorna as configurações específicas da aba
   * que está atualmente ativa.
   */
  const currentFormConfig = formConfig[currentTab]

  /**
   * Manipula a mudança de aba
   *
   * Atualiza o estado da aba ativa quando o usuário
   * seleciona uma nova aba.
   */
  const handleTabChange = (value: string) => {
    setCurrentTab(value as TabType)
  }

  return (
    /**
     * Wrapper do card de autenticação
     *
     * Fornece a estrutura visual e o contexto para os formulários,
     * incluindo cabeçalho e descrição da seção de autenticação.
     */
    <CardAuthWrapper
      headerDescription={currentFormConfig.description}
      headerLabel={currentFormConfig.title}
      showSocial={true}
      termsAndPolicy
    >
      {/* Sistema de abas para alternar entre formulários * * Gerencia a navegação entre os
      formulários de login e cadastro, * mantendo o estado da aba ativa e atualizando a interface. */}
      <Tabs onValueChange={handleTabChange} value={currentTab}>
        <TabList />
        <TabContent activeTab={currentTab} />
      </Tabs>
    </CardAuthWrapper>
  )
}

/**
 * Componente de lista de abas
 *
 * Renderiza os botões de navegação entre as abas
 * de login e cadastro.
 */
function TabList() {
  return (
    <TabsList className="mb-4 grid w-full grid-cols-2">
      <TabsTrigger className="cursor-pointer" value="sign-in">
        Entrar
      </TabsTrigger>
      <TabsTrigger className="cursor-pointer" value="sign-up">
        Cadastrar
      </TabsTrigger>
    </TabsList>
  )
}

/**
 * Componente de conteúdo das abas
 *
 * Gerencia a renderização do conteúdo específico
 * de cada aba (login ou cadastro).
 */
function TabContent({ activeTab }: { activeTab: TabType }) {
  /**
   * Obtém o componente de formulário apropriado
   *
   * Utiliza o mapeamento de formulários para renderizar
   * o componente correto baseado na aba ativa.
   */
  const FormComponent = formComponents[activeTab]

  return (
    <TabsContent value={activeTab}>
      <FormComponent />
    </TabsContent>
  )
}
