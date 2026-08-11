import { Link, Navigate, useParams } from 'react-router-dom'
import PageShell from '../components/PageShell'
import Booking from '../components/Booking'
import { usePageMeta } from '../hooks/usePageMeta'
import { getCampingOptionBySlug, getGalleryByIds } from '../data/content'
import { useLead } from '../context/LeadContext'
import { useReveal } from '../hooks/useReveal'
import { Events } from '../services/trackingService'

export default function CampingDetailPage() {
  const { slug } = useParams()
  const option = getCampingOptionBySlug(slug)
  usePageMeta(option ? option.name : 'Camping')
  const ref = useReveal()
  const { requestBookNow, trackEvent } = useLead()

  if (!option) return <Navigate to="/camping" replace />

  const photos = getGalleryByIds(option.galleryIds)

  const book = (source) => {
    trackEvent(Events.BOOK_NOW_CLICKED, {
      page: `/camping/${option.slug}`,
      accommodation: option.name,
      data: { source },
    })
    requestBookNow({ accommodation: option.name, source })
  }

  return (
    <PageShell>
      <section className="relative min-h-[68svh] overflow-hidden md:min-h-[74svh]">
        <div className="hero-media absolute inset-0">
          <img src={option.image} alt={option.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(19_40_33_/_0.5)_0%,rgb(19_40_33_/_0.28)_42%,rgb(19_40_33_/_0.8)_100%)]" />
        </div>
        <div className="container-site relative flex min-h-[68svh] items-end pb-14 pt-28 md:min-h-[74svh] md:pb-20">
          <div className="hero-copy max-w-3xl text-white">
            <p className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white/80">
              {option.siteLabel} · {option.type}
            </p>
            <h1 className="font-display text-[clamp(2.4rem,6.5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              {option.name}
            </h1>
            <p className="mt-4 max-w-2xl text-[1.08rem] leading-relaxed text-white/88">{option.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" className="btn btn-primary" onClick={() => book('camping_detail_hero')}>
                Book Now
              </button>
              <Link to="/camping" className="btn btn-secondary">
                All camping options
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div ref={ref} className="container-site reveal">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="section-label">What is included</p>
              <h2 className="section-title">{option.name}</h2>
              <p className="section-lead">{option.description}</p>
              <ul className="mt-6 space-y-2.5">
                {option.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[1.02rem] text-ink/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-surface p-6 sm:p-8">
              {option.capacity ? (
                <div className="mb-5">
                  <p className="text-sm text-muted">Capacity</p>
                  <p className="mt-1 font-display text-3xl text-pine-deep">{option.capacity}</p>
                </div>
              ) : null}
              <div>
                <p className="text-sm text-muted">Price</p>
                {option.price ? (
                  <>
                    <p className="mt-1 font-display text-4xl text-pine-deep">{option.price}</p>
                    <p className="text-sm text-muted">{option.priceNote}</p>
                  </>
                ) : (
                  <p className="mt-1 font-semibold text-pine">{option.priceLabel || 'Ask host for rates'}</p>
                )}
              </div>
              <button
                type="button"
                className="btn btn-whatsapp mt-6 w-full"
                onClick={() => book('camping_detail_card')}
              >
                Book Now
              </button>
            </div>
          </div>

          <div className="mt-14">
            <p className="section-label">Photos</p>
            <h3 className="section-title">A closer look</h3>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <figure className="overflow-hidden rounded-[1.25rem] sm:col-span-2">
                <img src={option.image} alt={option.name} className="aspect-[16/10] w-full object-cover" />
              </figure>
              {photos.map((image) => (
                <figure key={image.id} className="overflow-hidden rounded-[1.25rem]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Booking
        lockedAccommodation={option.name}
        options={[option]}
        accommodationLabel="Camping option"
        title={`Book ${option.name}`}
        lead={`${option.name} is already selected. Share your details and we open WhatsApp with the host.`}
      />
    </PageShell>
  )
}
