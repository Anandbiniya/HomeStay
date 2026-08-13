import { hostillamVeedu } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { useLead } from '../context/LeadContext'
import TrackOnce from './TrackOnce'
import { Events } from '../services/trackingService'
import SectionCta from './SectionCta'
import SafeImage from './SafeImage'

export default function Stay({ variant = 'full', pagePath = '/stay' }) {
  const ref = useReveal()
  const { requestBookNow, trackEvent } = useLead()
  const isPreview = variant === 'preview'
  const item = hostillamVeedu

  if (!item) return null

  const onBook = () => {
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
        <TrackOnce
          as="div"
          event={Events.ACCOMMODATION_VIEWED}
          page={pagePath}
          accommodation={item.name}
          data={{ id: item.id }}
        >
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative">
              <div className="overflow-hidden rounded-[1.6rem] shadow-[var(--shadow-soft)]">
                <SafeImage
                  src={item.image}
                  alt={item.name}
                  className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
                />
              </div>
              <span className="absolute left-5 top-5 rounded-lg bg-white/92 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-pine">
                {item.type}
              </span>
            </div>

            <div>
              <p className="section-label">Stay</p>
              <h2 className="section-title">{item.name}</h2>
              <p className="section-lead">{item.description}</p>

              <ul className="mt-6 space-y-2.5 text-[1.02rem] text-ink/85">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-pine/10 pt-5">
                <div>
                  <p className="text-sm text-muted">Capacity</p>
                  <p className="mt-1 font-semibold text-pine">{item.capacity}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-3xl text-pine-deep">{item.price}</p>
                  <p className="text-sm text-muted">{item.priceNote}</p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <button type="button" className="btn btn-primary" onClick={onBook}>
                  Book Now
                </button>
                {isPreview ? <SectionCta to="/stay">Explore Stay</SectionCta> : null}
              </div>
            </div>
          </div>
        </TrackOnce>
      </div>
    </section>
  )
}
