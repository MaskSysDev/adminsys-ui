"use client"

import { CardUserProfile } from "@/registry/components/auth/card/card-user-profile"
import { Container } from "@/registry/components/shared/container"

export default function Page() {
  return (
    <Container className="py-4" size="full">
      <CardUserProfile
        email={"admin@email.com"}
        image={"/assets/images/avatar/avatar.jpg"}
        name={"Admin 01"}
      />
    </Container>
  )
}
