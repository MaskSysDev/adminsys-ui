import { DropdownUser } from "@/registry/components/auth/dropdown/dropdown-user"

export default function DropdownUserDemo() {
  const user = {
    id: "uuid-01",
    name: "Admin",
    lastName: "User",
    email: "admin@email.com",
    image: null,
    role: "admin",
  }

  return <DropdownUser user={user} />
}
