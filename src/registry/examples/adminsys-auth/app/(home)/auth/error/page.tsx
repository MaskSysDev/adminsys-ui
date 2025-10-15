import { TriangleAlertIcon } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { CardAuthWrapper } from "@/registry/components/auth/card/card-auth-wrapper"
import { Container } from "@/registry/components/shared/container"

export const metadata: Metadata = {
  title: "AuthError",
  description: "Description AuthError.",
}

export default function Page() {
  return (
    <Container className="flex items-center justify-center py-24 md:py-32">
      <CardAuthWrapper headerLabel="Oops! Something went wrong!">
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <TriangleAlertIcon className="size-16 text-red-600" />

          <Button asChild variant="link">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </CardAuthWrapper>
    </Container>
  )
}
