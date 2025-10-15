"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"

export function AuthButton() {
  const { isPending }: { isPending: boolean } = { isPending: true }

  if (isPending) {
    return null
  }

  return (
    <>
      <Button asChild className="mx-1" size="sm">
        <Link href={"/auth/sign-in"}>Sign in</Link>
      </Button>
      <Button asChild size="sm" variant="outline">
        <Link href={"/auth/sign-up"}>Sign up</Link>
      </Button>
    </>
  )
}
