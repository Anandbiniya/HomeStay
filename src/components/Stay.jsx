import { accommodations } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { useLead } from '../context/LeadContext'
import TrackOnce from './TrackOnce'
import { Events } from '../services/trackingService'
import SectionCta from './SectionCta'

export default function Stay({ variant = 'full', pagePath = '/stay' }) {
  const ref = useReveal()
  const { requestBookNow, trackEvent } = useLead()
  const isPreview = variant === 'preview'

  const onBook = (item) => {
    trackEvent(Events.ACCOMMODATION_DETAIL_OPENED, {
      page: pagePath,
      accommodation: item.name,
      data: { id: item.id },
    })
    requestBookNow({ accommodation: item.name, source: 'stay_card' })
  }

  return (
    <section
      id="stay"
      className="section bg-[linear-gradient(180deg,transparent,rgb(231_235_228_/_0.55)_12%,rgb(231_235_228_/_0.55)_88%,transparent)]"
    >
      <div ref={ref} className="container-site reveal">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-label">Stay</p>
            <h2 className="section-title">Accommodation made for rest and connection</h2>
            <p className="section-lead">
              Choose a cozy cottage stay, a private garden room, or a starlit tent — each designed for comfort
              in the middle of nature.
            </p>
          </div>
          {isPreview ? <SectionCta to="/stay">Explore Stay</SectionCta> : null}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {accommodations.map((item) => (
            <TrackOnce
              key={item.id}
              as="article"
              className="card-surface group flex flex-col"
              event={Events.ACCOMMODATION_VIEWED}
              page={pagePath}
              accommodation={item.name}
              data={{ id: item.id }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <span className="absolute left-4 top-4 rounded-lg bg-white/92 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-pine">
                  {item.type}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-[1.7rem] leading-tight text-pine-deep">{item.name}</h3>
                </div>
                <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{item.description}</p>

                <ul className="mt-4 space-y-1.5 text-sm text-ink/80">
                  {item.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex items-end justify-between gap-3 border-t border-pine/8 pt-4">
                  <div>
                    <p className="text-sm text-muted">Capacity</p>
                    <p className="font-semibold text-pine">{item.capacity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl text-pine-deep">{item.price}</p>
                    <p className="text-xs text-muted">{item.priceNote}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-whatsapp mt-5 w-full"
                  onClick={() => onBook(item)}
                >
                  Book via WhatsApp
                </button>
              </div>
            </TrackOnce>
          ))}
        </div>
      </div>
    </section>
  )
}
