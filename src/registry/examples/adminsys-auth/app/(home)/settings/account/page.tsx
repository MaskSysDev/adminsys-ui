"use client"

import { Container } from "@/components/layout/container"
import { Typography } from "@/components/layout/typography"
import { Separator } from "@/components/ui/separator"

import { AccountForm } from "@/registry/components/auth/form/account-form"
import { AccountImageForm } from "@/registry/components/auth/form/account-image-form"
import { DeleteAccountForm } from "@/registry/components/auth/form/delete-account-form"

export default function AccountPage() {
  return (
    <Container className="py-4" size="full">
      <Typography.H1>Account settings</Typography.H1>
      <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <AccountForm />
        </div>

        <div className="mt-8 xl:col-span-1">
          <Separator className="block xl:hidden" />
          <AccountImageForm />
        </div>

        <div className="space-y-6 xl:col-span-2">
          <Separator className="my-8" />
          <DeleteAccountForm />
        </div>
      </div>
    </Container>
  )
}
