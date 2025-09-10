import { footer01, navbar01 } from "@/config/site-config"
import { AuthLayout } from "@/registry/components/layout/auth-layout"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthLayout footer={footer01} navbar={navbar01}>
      {children}
    </AuthLayout>
  )
}
