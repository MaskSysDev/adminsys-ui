import { Footer01 } from "@/registry/components/layout/footer/footer-01"
import { Icons } from "@/registry/components/layout/icons"

export default function Footer01Demo() {
  return (
    <Footer01
      author={"Author"}
      authorUrl={"#"}
      socialLinks={[
        {
          href: "#",
          label: "facebook",
          icon: Icons.facebook,
        },
        {
          href: "#",
          label: "instagram",
          icon: Icons.instagram,
        },
        {
          href: "#",
          label: "youtube",
          icon: Icons.youtube,
        },
      ]}
      title={"Footer 01"}
    />
  )
}
