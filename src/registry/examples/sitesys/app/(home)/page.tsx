import { hero01 } from "@/config/site-config"
import { Hero01 } from "@/registry/components/layout/hero/hero-01"

export default function Home() {
  return (
    <section id="hero">
      <Hero01 {...hero01} />
    </section>
  )
}
