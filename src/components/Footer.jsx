import { Link } from 'react-router-dom'
import { siteConfig } from '../config/site'
import { useLead } from '../context/LeadContext'

export default function Footer() {
  const year = new Date().getFullYear()
  const { requestBookNow, requestWhatsAppContact } = useLead()

  return (
    <footer className="border-t border-pine/10 bg-pine-deep text-white">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="font-display text-3xl font-semibold tracking-[0.02em] text-ivory">
            {siteConfig.brand}
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">{siteConfig.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">{siteConfig.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-soft">Explore</h3>
          <nav className="mt-4 flex flex-col gap-2">
            {siteConfig.footerExplore.map((item) => (
              <Link key={item.href} to={item.href} className="text-white/80 hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-soft">Discover</h3>
          <nav className="mt-4 flex flex-col gap-2">
            {siteConfig.footerDiscover.map((item) => (
              <Link key={item.href} to={item.href} className="text-white/80 hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-soft">Contact</h3>
          <div className="mt-4 space-y-3 text-sm text-white/80">
            <p>{siteConfig.location.address}</p>
            <p>
              WhatsApp:{' '}
              <button
                type="button"
                onClick={() =>
                  requestWhatsAppContact({
                    source: 'footer',
                    message: 'I would like to enquire about a booking.',
                  })
                }
                className="text-white hover:underline"
              >
                {siteConfig.whatsapp.display}
              </button>
            </p>
            <p>
              Phone:{' '}
              <a href={`tel:${siteConfig.phone.number}`} className="text-white hover:underline">
                {siteConfig.phone.display}
              </a>
            </p>
            <p>
              Email:{' '}
              <a href={`mailto:${siteConfig.email}`} className="text-white hover:underline">
                {siteConfig.email}
              </a>
            </p>
            {siteConfig.social.instagram ? (
              <p>
                Instagram:{' '}
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:underline"
                >
                  @host.illam ↗
                </a>
              </p>
            ) : null}
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => requestBookNow({ source: 'footer' })}
              >
                Book Now
              </button>
              <a
                href={siteConfig.location.mapLink}
                target="_blank"
                rel="noreferrer"
                className="btn btn-secondary"
              >
                Get Directions ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-5 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.brand}. All rights reserved.
          </p>
          <p>Bookings are confirmed by the host on WhatsApp — not automatically.</p>
        </div>
      </div>
    </footer>
  )
}
