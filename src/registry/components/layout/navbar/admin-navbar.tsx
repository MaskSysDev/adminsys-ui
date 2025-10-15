import { DropdownUser } from "@/registry/components/auth/dropdown/dropdown-user"
import type { SessionData } from "@/registry/components/layout/navbar/types/session-data"
import { Container } from "@/registry/components/shared/container"
import { SidebarTrigger } from "@/registry/components/shared/sidebar"
import { ToggleTheme } from "@/registry/components/shared/toggle/toggle-theme"

export function AdminNavbar() {
  const { data: session }: { data: SessionData } = {
    data: {
      session: {
        expiresAt: new Date(),
        token: "token",
        userAgent: null,
      },
      user: {
        id: "string",
        name: "string",
        lastName: "string",
        email: "string",
        image: null,
        role: "admin",
      },
    },
  }

  const user = session?.user

  return (
    <div className="sticky top-0 flex h-16 w-full shrink-0 items-center gap-2 border-b bg-background">
      <Container className="flex items-center gap-2" size="2xl">
        <SidebarTrigger className="-ml-1.5 size-8 cursor-pointer text-muted-foreground" />

        <div className="ml-auto flex w-auto items-center gap-2">
          <ToggleTheme />
          {user && <DropdownUser user={user} />}
        </div>
      </Container>
    </div>
  )
}
