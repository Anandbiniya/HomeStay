import PageShell from '../components/PageShell'
import Reviews from '../components/Reviews'
import Booking from '../components/Booking'
import InstagramReels from '../components/InstagramReels'
import SafeImage from '../components/SafeImage'
import { BackLink, Breadcrumbs } from '../components/PageNav'
import { usePageMeta } from '../hooks/usePageMeta'
import { hostillamVeedu, getGalleryByIds } from '../data/content'
import { useLead } from '../context/LeadContext'
import { useReveal } from '../hooks/useReveal'
import { Events } from '../services/trackingService'

export default function StayPage() {
  usePageMeta('Stay')
  const ref = useReveal()
  const { requestBookNow, trackEvent } = useLead()
  const veedu = hostillamVeedu
  const photos = getGalleryByIds(veedu.galleryIds).filter((image) => image.src !== veedu.image)

  const bookVeedu = (source) => {
    trackEvent(Events.BOOK_NOW_CLICKED, {
      page: '/stay',
      accommodation: veedu.name,
      data: { source },
    })
    requestBookNow({ accommodation: veedu.name, source })
  }

  return (
    <PageShell>
      <section className="relative min-h-[70svh] overflow-hidden md:min-h-[78svh]">
        <div className="hero-media absolute inset-0">
          <SafeImage
            src={veedu.image}
            alt={veedu.name}
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(19_40_33_/_0.5)_0%,rgb(19_40_33_/_0.25)_40%,rgb(19_40_33_/_0.78)_100%)]" />
        </div>
        <div className="container-site relative flex min-h-[70svh] items-end pb-14 pt-28 md:min-h-[78svh] md:pb-20">
          <div className="hero-copy max-w-3xl text-white">
            <div className="mb-4">
              <Breadcrumbs
                items={[
                  { label: 'Home', to: '/' },
                  { label: 'Stay' },
                  { label: 'Hostillam Veedu' },
                ]}
              />
            </div>
            <div className="mb-5">
              <BackLink to="/" className="text-white/90 hover:text-white">
                Back to Home
              </BackLink>
            </div>
            <p className="mb-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white/80">
              Stay · {veedu.type}
            </p>
            <h1 className="font-display text-[clamp(2.6rem,7vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              {veedu.name}
            </h1>
            <p className="mt-4 max-w-2xl text-[1.08rem] leading-relaxed text-white/88">
              {veedu.description}
            </p>
            <button
              type="button"
              className="btn btn-primary mt-8"
              onClick={() => bookVeedu('stay_hero')}
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      <section id="stay" className="section">
        <div ref={ref} className="container-site reveal">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <p className="section-label">Hostillam Veedu</p>
              <h2 className="section-title">{veedu.name}</h2>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-moss">
                {veedu.type}
              </p>
              <p className="section-lead">{veedu.description}</p>

              <h3 className="mt-8 font-display text-2xl text-pine-deep">Features & amenities</h3>
              <ul className="mt-4 space-y-2.5">
                {veedu.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[1.02rem] text-ink/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-surface p-6 sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-muted">Capacity</p>
                  <p className="mt-1 font-display text-3xl text-pine-deep">{veedu.capacity}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-4xl text-pine-deep">{veedu.price}</p>
                  <p className="text-sm text-muted">{veedu.priceNote}</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted">
                Homestay booking at Hostillam Veedu. No online payment — confirm directly with the host on
                WhatsApp.
              </p>
              <button
                type="button"
                className="btn btn-whatsapp mt-6 w-full"
                onClick={() => bookVeedu('stay_details')}
              >
                Book Now
              </button>
            </div>
          </div>

          <div className="mt-14">
            <p className="section-label">Photos</p>
            <h3 className="section-title">Hostillam Veedu gallery</h3>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <figure className="overflow-hidden rounded-[1.25rem] sm:col-span-2 lg:col-span-2">
                <SafeImage
                  src={veedu.image}
                  alt={veedu.name}
                  className="aspect-[16/10] w-full object-cover"
                />
              </figure>
              {photos.map((image) => (
                <figure key={image.id} className="overflow-hidden rounded-[1.25rem]">
                  <SafeImage
                    src={image.src}
                    alt={image.alt}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <button type="button" className="btn btn-primary" onClick={() => bookVeedu('stay_gallery')}>
              Book Now
            </button>
            <a href="#booking" className="btn btn-outline">
              Open booking form
            </a>
          </div>
        </div>
      </section>

      <Reviews
        variant="monthly"
        context="stay"
        sectionLabel="Google Reviews"
        title="Google reviews for Hostillam"
        lead="Guest experiences related to Hostillam Veedu and the Hostillam home stay."
      />

      <InstagramReels
        variant="preview"
        username="host.illam"
        sectionLabel="Hostillam on Instagram"
        title="Hostillam Instagram social proof"
        lead="Moments from @host.illam — a closer look at life at Hostillam Veedu."
        viewAllTo="/reels"
      />

      <Booking
        lockedAccommodation={veedu.name}
        options={[veedu]}
        accommodationLabel="Accommodation"
        title="Book Hostillam Veedu"
        lead="Hostillam Veedu is already selected. Enter your details, review the request, then send it to the host. No login required."
        returnTo="/stay"
        returnLabel="Back to Stay"
      />
    </PageShell>
  )
}
