import PageShell from '../components/PageShell'
import Stay from '../components/Stay'
import Reviews from '../components/Reviews'
import Booking from '../components/Booking'
import { usePageMeta } from '../hooks/usePageMeta'

export default function StayPage() {
  usePageMeta('Stay')

  return (
    <PageShell>
      <div className="bg-pine-deep pt-24 text-white sm:pt-28">
        <div className="container-site pb-10">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-amber-soft">Stay</p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-[-0.02em]">
            Accommodation at Hostillam
          </h1>
          <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-white/75">
            Hostillam Veedu, Starlit Tent Stay, and Garden Room — every option with capacity, features, and
            WhatsApp booking.
          </p>
        </div>
      </div>
      <Stay variant="full" pagePath="/stay" />
      <Reviews variant="preview" limit={3} />
      <Booking />
    </PageShell>
  )
}
