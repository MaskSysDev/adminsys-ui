import { SidebarTrigger } from "@/components/ui/sidebar"

import { DropdownUser } from "@/registry/components/auth/dropdown/dropdown-user"
import { Container } from "@/registry/components/shared/container"
import { ToggleTheme } from "@/registry/components/shared/toggle/toggle-theme"

export function AdminNavbar() {
  return (
    <div className="sticky top-0 flex h-16 w-full shrink-0 items-center gap-2 border-b bg-background">
      <Container className="flex items-center gap-2" size="2xl">
        <SidebarTrigger className="-ml-1.5 size-8 cursor-pointer text-muted-foreground" />

        <div className="ml-auto flex w-auto items-center gap-2">
          <ToggleTheme />
          <DropdownUser
            email={"admin@email.com"}
            image={"/assets/images/avatar/avatar.jpg"}
            name={"Admin 01"}
          />
        </div>
      </Container>
    </div>
  )
}
