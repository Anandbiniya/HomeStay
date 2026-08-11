import { siteConfig } from '../config/site'
import { useReveal } from '../hooks/useReveal'

/**
 * Short Hostillam introduction — uses existing brand copy only.
 */
export default function Intro() {
  const ref = useReveal()

  return (
    <section id="intro" className="section !pb-0">
      <div ref={ref} className="container-site reveal">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-moss">
            {siteConfig.brand}
          </p>
          <h2 className="section-title">{siteConfig.tagline}</h2>
          <p className="section-lead mx-auto">{siteConfig.description}</p>
        </div>
      </div>
    </section>
  )
}
