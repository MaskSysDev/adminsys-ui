import {
  Banner,
  BannerActions,
  BannerBadge,
  BannerDescription,
  BannerTitle,
} from "@/registry/components/layout/banner"

export default function BannerDemo() {
  return (
    <Banner>
      <BannerBadge subTitle={"Banner"} subTitleColor={"Subtitle"} />
      <BannerTitle>Banner Title</BannerTitle>
      <BannerDescription>Banner Description</BannerDescription>
      <BannerActions
        action01={{
          label: "Action 01",
          href: "#",
        }}
        action02={{
          label: "Action 02",
          href: "#",
        }}
      />
    </Banner>
  )
}
