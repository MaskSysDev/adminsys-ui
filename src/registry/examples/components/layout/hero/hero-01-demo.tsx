import { Hero01 } from "@/registry/components/layout/hero/hero-01"

export default function Hero01Demo() {
  return (
    <Hero01
      action01={{
        label: "Action 01",
        href: "#",
      }}
      action02={{
        label: "Action 02",
        href: "#",
      }}
      description="Hero Description"
      subTitle="Subtitle"
      subTitleColor="Color"
      title="Hero Title"
    />
  )
}
