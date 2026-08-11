import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell'
import Reviews from '../components/Reviews'
import Booking from '../components/Booking'
import InstagramReels from '../components/InstagramReels'
import { usePageMeta } from '../hooks/usePageMeta'
import { campingOptions } from '../data/content'
import { myMagicPlaceInstagram } from '../data/instagram'
import { useLead } from '../context/LeadContext'
import { useReveal } from '../hooks/useReveal'
import { Events } from '../services/trackingService'

function priceDisplay(option) {
  if (option.price) {
    return (
      <>
        <p className="font-display text-2xl text-pine-deep">{option.price}</p>
        {option.priceNote ? <p className="text-xs text-muted">{option.priceNote}</p> : null}
      </>
    )
  }
  return <p className="text-sm font-semibold text-moss">{option.priceLabel || 'Ask host for rates'}</p>
}

export default function CampingPage() {
  usePageMeta('Camping')
  const ref = useReveal()
  const { requestBookNow, trackEvent } = useLead()

  const bookOption = (option, event) => {
    event.preventDefault()
    event.stopPropagation()
    trackEvent(Events.BOOK_NOW_CLICKED, {
      page: '/camping',
      accommodation: option.name,
      data: { source: 'camping_card' },
    })
    requestBookNow({ accommodation: option.name, source: 'camping_card' })
  }

  return (
    <PageShell>
      <div className="bg-pine-deep pt-24 text-white sm:pt-28">
        <div className="container-site pb-10">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-amber-soft">
            Camping · My Magic Place
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-[-0.02em]">
            Camping at My Magic Place
          </h1>
          <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-white/75">
            Day camping, tent stay, and make-your-own-pitch options — a separate Hostillam camping experience
            from the Veedu homestay.
          </p>
        </div>
      </div>

      <section id="camping" className="section">
        <div ref={ref} className="container-site reveal">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {campingOptions.map((option) => (
              <Link
                key={option.id}
                to={`/camping/${option.slug}`}
                className="card-surface group flex flex-col transition hover:-translate-y-0.5"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={option.image}
                    alt={option.name}
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 rounded-lg bg-white/92 px-3 py-1 text-xs font-bold uppercase tracking-[0.08em] text-pine">
                    {option.siteLabel}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h2 className="font-display text-[1.7rem] leading-tight text-pine-deep">{option.name}</h2>
                  <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-muted">{option.description}</p>

                  <ul className="mt-4 space-y-1.5 text-sm text-ink/80">
                    {option.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-pine/8 pt-4">
                    <div>
                      {option.capacity ? (
                        <>
                          <p className="text-sm text-muted">Capacity</p>
                          <p className="font-semibold text-pine">{option.capacity}</p>
                        </>
                      ) : (
                        <p className="text-sm text-muted">{option.type}</p>
                      )}
                    </div>
                    <div className="text-right">{priceDisplay(option)}</div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-whatsapp mt-5 w-full"
                    onClick={(event) => bookOption(option, event)}
                  >
                    Book Now
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InstagramReels
        variant="preview"
        username={myMagicPlaceInstagram.handle}
        sectionLabel="My Magic Place Reels"
        title={myMagicPlaceInstagram.title}
        lead={myMagicPlaceInstagram.lead}
        viewAllTo={`https://www.instagram.com/${myMagicPlaceInstagram.handle}/reels/`}
      />

      <Reviews
        variant="monthly"
        context="camping"
        sectionLabel="My Magic Place Reviews"
        title="Reviews for the camping experience"
        lead="Guest words that mention camping, campfires, and the Hostillam / My Magic Place outdoor stay."
      />

      <Booking
        options={campingOptions}
        accommodationLabel="Camping option"
        title="Book a camping experience"
        lead="Choose Day Camping, Tent Stay, or Make Your Own Pitch Tent — or tap Book Now on a card to pre-select it."
      />
    </PageShell>
  )
}
