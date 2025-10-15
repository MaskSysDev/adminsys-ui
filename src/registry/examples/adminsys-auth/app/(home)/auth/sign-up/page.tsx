import type { Metadata } from "next"

import { FormAuth } from "@/registry/components/auth/form/form-auth"
import { Container } from "@/registry/components/shared/container"

export const metadata: Metadata = {
  title: "Sign up",
  description: "Description Sign up.",
}

export default function Page() {
  return (
    <Container className="flex items-center justify-center py-24 md:py-32">
      <FormAuth activeTab="sign-up" />
    </Container>
  )
}
