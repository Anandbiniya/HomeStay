import PageShell from '../components/PageShell'
import Reviews from '../components/Reviews'
import Booking from '../components/Booking'
import { usePageMeta } from '../hooks/usePageMeta'

export default function ReviewsPage() {
  usePageMeta('Reviews')

  return (
    <PageShell>
      <div className="bg-pine-deep pt-24 text-white sm:pt-28">
        <div className="container-site pb-4">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-amber-soft">Reviews</p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-[-0.02em]">
            Guest experiences
          </h1>
          <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-white/75">
            All featured Google reviews for Hostillam — placed here to help you decide with confidence.
          </p>
        </div>
      </div>
      <Reviews variant="all" />
      <Booking />
    </PageShell>
  )
}
