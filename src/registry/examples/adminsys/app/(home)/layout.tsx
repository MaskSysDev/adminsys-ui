import { SiteLayout } from "@/components/layout/site-layout"

import { footer01, navbar01 } from "@/config/site-config"

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
