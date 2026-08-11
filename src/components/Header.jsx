import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLead } from '../context/LeadContext'
import { siteConfig } from '../config/site'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { requestBookNow } = useLead()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  const close = () => setOpen(false)

  const onBookNow = (event) => {
    event.preventDefault()
    close()
    requestBookNow({ source: 'header' })
  }

  const solid = scrolled || open || !isHome

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-[rgb(246_248_246_/_0.92)] shadow-[0_10px_30px_-24px_rgb(21_32_28_/_0.45)] backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container-site flex h-[4.25rem] items-center justify-between gap-4 md:h-[4.75rem]">
        <Link
          to="/"
          className={`font-display text-[1.35rem] font-semibold tracking-[0.06em] transition-colors sm:text-[1.45rem] ${
            solid ? 'text-pine-deep' : 'text-white'
          }`}
          onClick={close}
        >
          {siteConfig.brand}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {siteConfig.primaryNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-[0.92rem] font-semibold transition-colors ${
                solid ? 'text-ink/80 hover:text-pine' : 'text-white/90 hover:text-white'
              } ${location.pathname === item.href ? (solid ? 'text-pine' : 'text-white') : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button type="button" onClick={onBookNow} className="btn btn-primary !min-h-11 !px-5 !text-sm">
            Book Now
          </button>
        </div>

        <button
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border lg:hidden ${
            solid
              ? 'border-pine/15 bg-white text-pine'
              : 'border-white/35 bg-white/10 text-white'
          }`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 top-0 block h-0.5 w-full rounded bg-current transition ${
                open ? 'translate-y-[6px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-[6px] block h-0.5 w-full rounded bg-current transition ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-[12px] block h-0.5 w-full rounded bg-current transition ${
                open ? '-translate-y-[6px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </div>

      <div className={`border-t border-pine/10 bg-mist-soft lg:hidden ${open ? 'block' : 'hidden'}`}>
        <nav className="container-site flex flex-col gap-1 py-4">
          {siteConfig.primaryNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={close}
              className="rounded-xl px-3 py-3 text-base font-semibold text-pine-deep hover:bg-white"
            >
              {item.label}
            </Link>
          ))}
          <button type="button" onClick={onBookNow} className="btn btn-primary mt-2 w-full">
            Book Now
          </button>
        </nav>
      </div>
    </header>
  )
}
