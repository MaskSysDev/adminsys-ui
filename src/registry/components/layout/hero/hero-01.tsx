import {
  Banner,
  BannerActions,
  BannerBadge,
  BannerDescription,
  BannerTitle,
} from "@/registry/components/layout/banner"

export type Hero01Props = {
  title?: string
  subTitle?: string
  subTitleColor?: string
  description?: string
  backgroundImage?: string
  backgroundFixed?: boolean
  gradientTop?: boolean
  gradientBottom?: boolean
  gradientTopClassName?: string
  gradientBottomClassName?: string
  size?: string
  action01?: {
    label?: string
    href?: string
  }
  action02?: {
    label?: string
    href?: string
  }
}

export function Hero01({ ...props }: Hero01Props) {
  return (
    <Banner
      backgroundFixed={props.backgroundFixed}
      backgroundImage={props.backgroundImage}
      gradientBottom={props.gradientBottom}
      gradientBottomClassName={props.gradientBottomClassName}
      gradientTop={props.gradientTop}
      gradientTopClassName={props.gradientTopClassName}
      size={props.size}
    >
      <BannerBadge
        subTitle={props.subTitle}
        subTitleColor={props.subTitleColor}
      />
      <BannerTitle>{props.title}</BannerTitle>
      <BannerDescription>{props.description}</BannerDescription>
      <BannerActions action01={props.action01} action02={props.action02} />
    </Banner>
  )
}
