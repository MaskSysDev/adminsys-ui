import { DropdownUser } from "@/registry/components/auth/dropdown/dropdown-user"

export default function DropdownUserDemo() {
  return (
    <DropdownUser
      email={"admin@email.com"}
      image={"/assets/images/avatar/avatar.jpg"}
      name={"Admin 01"}
    />
  )
}
