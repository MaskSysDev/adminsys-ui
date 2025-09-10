import { footer01, navbar01 } from "@/config/site-config"
import { SiteLayout } from "@/registry/components/layout/site-layout"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SiteLayout footer={footer01} navbar={navbar01}>
      {children}
    </SiteLayout>
  )
}
