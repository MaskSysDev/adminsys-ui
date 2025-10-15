import type { Metadata } from "next"

import { CardAuthWrapper } from "@/registry/components/auth/card/card-auth-wrapper"
import { ResetPasswordForm } from "@/registry/components/auth/form/reset-password-form"
import { Container } from "@/registry/components/shared/container"

export const metadata: Metadata = {
  title: "ResetPassword",
  description: "Description ResetPassword.",
}

export default function Page() {
  return (
    <Container className="flex items-center justify-center py-24 md:py-32">
      <CardAuthWrapper headerLabel="Enter a new password">
        <ResetPasswordForm />
      </CardAuthWrapper>
    </Container>
  )
}
