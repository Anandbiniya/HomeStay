import { Link } from 'react-router-dom'
import heroImage from '../assets/images/hero.jpg'
import { siteConfig } from '../config/site'
import { useLead } from '../context/LeadContext'
import SafeImage from './SafeImage'

export default function Hero() {
  const { requestBookNow } = useLead()

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <div className="hero-media absolute inset-0">
        <SafeImage
          src={heroImage}
          alt="Camping under the open sky at Hostillam"
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(19_40_33_/_0.5)_0%,rgb(19_40_33_/_0.28)_42%,rgb(19_40_33_/_0.78)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgb(168_137_69_/_0.14),transparent_42%)]" />
      </div>

      <div className="container-site relative flex min-h-[100svh] items-end pb-16 pt-28 md:items-center md:pb-24 md:pt-24">
        <div className="hero-copy max-w-2xl">
          <h1 className="font-display text-[clamp(3.4rem,10vw,6rem)] font-semibold leading-[0.92] tracking-[0.01em] text-ivory">
            {siteConfig.brand}
          </h1>
          <p className="mt-3 font-display text-[clamp(1.15rem,2.6vw,1.55rem)] font-medium italic leading-snug tracking-[0.01em] text-amber-soft">
            {siteConfig.tagline}
          </p>
          <p className="mt-5 max-w-xl font-sans text-[1.05rem] leading-relaxed text-[#e8e2d6]/md:text-[1.12rem]">
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
          <p className="mt-6 text-sm font-medium tracking-[0.04em] text-[#d7d0c3]/md:text-[0.95rem]">
            {siteConfig.location.short}
          </p>
        </div>
      </div>
    </section>
  )
}
