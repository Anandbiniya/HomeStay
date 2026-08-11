import { siteConfig } from '../config/site'
import { getWhatsAppUrl } from '../utils/whatsapp'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-pine/10 bg-pine-deep text-white">
      <div className="container-site grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <a href="#home" className="font-display text-3xl font-semibold tracking-[-0.02em]">
            {siteConfig.name}
          </a>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">{siteConfig.tagline}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/65">{siteConfig.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-soft">Explore</h3>
          <nav className="mt-4 flex flex-col gap-2">
            {siteConfig.nav.map((item) => (
              <a key={item.href} href={item.href} className="text-white/80 hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-soft">Contact</h3>
          <div className="mt-4 space-y-3 text-sm text-white/80">
            <p>{siteConfig.location.address}</p>
            <p>
              WhatsApp:{' '}
              <a
                href={getWhatsAppUrl('Hello Hostillam,')}
                target="_blank"
                rel="noreferrer"
                className="text-white hover:underline"
              >
                {siteConfig.whatsapp.display}
              </a>
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
                  @host.illam
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-5 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>Bookings confirmed via WhatsApp with the host.</p>
        </div>
      </div>
    </footer>
  )
}
