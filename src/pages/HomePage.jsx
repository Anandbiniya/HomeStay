import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PageShell from '../components/PageShell'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Stay from '../components/Stay'
import Experience from '../components/Experience'
import InstagramReels from '../components/InstagramReels'
import About from '../components/About'
import Reviews from '../components/Reviews'
import VolunteerTeaser from '../components/VolunteerTeaser'
import Gallery from '../components/Gallery'
import Location from '../components/Location'
import Booking from '../components/Booking'
import { siteConfig } from '../config/site'

/** Legacy home hashes now map to dedicated pages. */
const HASH_REDIRECTS = {
  about: '/about',
  stay: '/stay',
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

    // Keep booking (and any remaining in-page anchors) scroll behaviour.
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
      <Intro />
      <Stay variant="preview" pagePath="/" />
      <Experience variant="preview" />
      <InstagramReels
        variant="preview"
        title="See Hostillam"
        lead="Real moments from @host.illam — campfires, trails, and quiet hill days."
      />
      <About variant="preview" />
      <Reviews variant="preview" />
      <VolunteerTeaser />
      <Gallery variant="preview" pagePath="/" />
      <Location />
      <Booking />
    </PageShell>
  )
}
