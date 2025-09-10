import type { Metadata } from "next"

import { Container } from "@/components/layout/container"

import { FormAuth } from "@/registry/components/auth/form/form-auth"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Description Sign in.",
}

export default function Page() {
  return (
    <Container className="flex items-center justify-center py-24 md:py-32">
      <FormAuth />
    </Container>
  )
}
