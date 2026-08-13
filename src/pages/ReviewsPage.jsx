import PageShell from '../components/PageShell'
import Reviews from '../components/Reviews'
import Booking from '../components/Booking'
import { PageNavHeader } from '../components/PageNav'
import { usePageMeta } from '../hooks/usePageMeta'

export default function ReviewsPage() {
  usePageMeta('Reviews')

  return (
    <PageShell>
      <PageNavHeader
        eyebrow="Reviews"
        title="Guest experiences"
        lead="All featured Google reviews for Hostillam — placed here to help you decide with confidence."
        backTo="/"
        backLabel="Back to Home"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Reviews' },
        ]}
      />
      <Reviews variant="all" />
      <Booking />
    </PageShell>
  )
}
