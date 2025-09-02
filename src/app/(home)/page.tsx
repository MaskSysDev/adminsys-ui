import { Hero01 } from "@/components/layout/hero/hero-01"
import { FeaturesSection } from "@/components/layout/section/features-section"

import { featuresSection, hero01 } from "@/config/site-config"

export default function Home() {
  return (
    <>
      <section id="hero">
        <Hero01 {...hero01} />
      </section>
      <FeaturesSection {...featuresSection} />
    </>
  )
}
