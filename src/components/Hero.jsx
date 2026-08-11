import { Link } from 'react-router-dom'
import heroImage from '../assets/images/hero.jpg'
import { siteConfig } from '../config/site'
import { useLead } from '../context/LeadContext'

export default function Hero() {
  const { requestBookNow } = useLead()

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <div className="hero-media absolute inset-0">
        <img
          src={heroImage}
          alt="Camping under the open sky at Hostillam"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(19_40_33_/_0.55)_0%,rgb(19_40_33_/_0.28)_42%,rgb(19_40_33_/_0.72)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgb(168_137_69_/_0.18),transparent_42%)]" />
      </div>

      <div className="container-site relative flex min-h-[100svh] items-end pb-16 pt-28 md:items-center md:pb-24 md:pt-24">
        <div className="hero-copy max-w-2xl text-white">
          <p className="mb-4 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-white/80">
            {siteConfig.tagline}
          </p>
          <h1 className="font-display text-[clamp(3.1rem,9vw,5.6rem)] font-semibold leading-[0.95] tracking-[0.04em]">
            {siteConfig.brand}
          </h1>
          <p className="mt-5 max-w-xl text-[1.08rem] leading-relaxed text-white/88 md:text-[1.18rem]">
            Soulful stays and serene camping in the hills of Kodaikanal — a warm home for beautiful minds.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => requestBookNow({ source: 'hero' })}
            >
              Book Now
            </button>
            <Link to="/stay" className="btn btn-secondary">
              Explore Stay
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/70">{siteConfig.location.short}</p>
        </div>
      </div>
    </section>
  )
}
