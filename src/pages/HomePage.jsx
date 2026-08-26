import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import Hero from '../components/Hero'
import About from '../components/About'
import Stay from '../components/Stay'
import Experience from '../components/Experience'
import InstagramReels from '../components/InstagramReels'
import Reviews from '../components/Reviews'
import VolunteerTeaser from '../components/VolunteerTeaser'
import Gallery from '../components/Gallery'
import Location from '../components/Location'
import Booking from '../components/Booking'
import { siteConfig } from '../config/site'

/** Legacy home hashes now map to dedicated pages (except about — stays on home). */
const HASH_REDIRECTS = {
  stay: '/stay',
  camping: '/camping',
  experience: '/experience',
  gallery: '/gallery',
  reels: '/reels',
  reviews: '/reviews',
  location: '/location',
  volunteer: '/volunteer',
}

export default function HomePage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = `${siteConfig.brand} | ${siteConfig.tagline}`

    const hash = window.location.hash.replace('#', '')
    if (!hash) return undefined

    if (HASH_REDIRECTS[hash]) {
      navigate(HASH_REDIRECTS[hash], { replace: true })
      return undefined
    }

    // Keep #about and booking (and any remaining in-page anchors) on the home page.
    const timer = window.setTimeout(() => {
      const target = document.getElementById(hash)
      if (!target) return
      target.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'))
      const headerOffset = 88
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset
      window.scrollTo(0, Math.max(0, top))
    }, 80)

    return () => window.clearTimeout(timer)
  }, [navigate])

  return (
    <PageShell>
      <Hero />
      <About />
      <Stay variant="preview" pagePath="/" />
      <Experience variant="preview" />
      <InstagramReels
        variant="preview"
        username="host.illam"
        title="See Hostillam"
        lead="Real moments from @host.illam — campfires, trails, and quiet hill days."
      />
      <Reviews variant="preview" />
      <VolunteerTeaser />
      <Gallery variant="preview" pagePath="/" />
      <Location />
      <Booking />
    </PageShell>
  )
}
