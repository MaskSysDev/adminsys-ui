import type { Metadata } from "next"

import { Container } from "@/components/layout/container"

import { CardAuthWrapper } from "@/registry/components/auth/card/card-auth-wrapper"
import { ForgotPasswordForm } from "@/registry/components/auth/form/forgot-password-form"

export const metadata: Metadata = {
  title: "ForgotPassword",
  description: "Description ForgotPassword.",
}

export default function Page() {
  return (
    <Container className="flex items-center justify-center py-24 md:py-32">
      <CardAuthWrapper headerLabel="Forgot your password?">
        <ForgotPasswordForm />
      </CardAuthWrapper>
    </Container>
  )
}
