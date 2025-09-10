import type { Metadata } from "next"

import { Container } from "@/components/layout/container"

import { CardAuthWrapper } from "@/registry/components/auth/card/card-auth-wrapper"
import { NewVerificationForm } from "@/registry/components/auth/form/new-verification-form"

export const metadata: Metadata = {
  title: "NewVerification",
  description: "Description NewVerification.",
}

export default function Page() {
  return (
    <Container className="flex items-center justify-center py-24 md:py-32">
      <CardAuthWrapper headerLabel="Confirming your verification">
        <NewVerificationForm />
      </CardAuthWrapper>
    </Container>
  )
}
