import { Hero01 } from "@/components/layout/hero/hero-01"

import { hero01 } from "@/config/site-config"

export default function Home() {
  return (
    <section id="hero">
      <Hero01 {...hero01} />
    </section>
  )
}
