import { useEffect } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Stay from '../components/Stay'
import Experience from '../components/Experience'
import Gallery from '../components/Gallery'
import InstagramReels from '../components/InstagramReels'
import Reviews from '../components/Reviews'
import Booking from '../components/Booking'
import Location from '../components/Location'
import Footer from '../components/Footer'
import { siteConfig } from '../config/site'

export default function HomePage() {
  useEffect(() => {
    document.title = `${siteConfig.name} | ${siteConfig.tagline}`

    const hash = window.location.hash.replace('#', '')
    if (!hash) return undefined

    const timer = window.setTimeout(() => {
      const target = document.getElementById(hash)
      if (!target) return
      target.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'))
      const headerOffset = 88
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset
      window.scrollTo(0, Math.max(0, top))
    }, 80)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Stay />
        <Experience />
        <Gallery />
        <InstagramReels />
        <Reviews />
        <Booking />
        <Location />
      </main>
      <Footer />
    </>
  )
}


