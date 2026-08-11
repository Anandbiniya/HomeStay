import PageShell from '../components/PageShell'
import Location from '../components/Location'
import Booking from '../components/Booking'
import { PageNavHeader } from '../components/PageNav'
import { usePageMeta } from '../hooks/usePageMeta'

export default function LocationPage() {
  usePageMeta('Location')

  return (
    <PageShell>
      <PageNavHeader
        eyebrow="Location"
        title="Find your way to Hostillam"
        lead="Vilpatti Road, Kodaikanal — close to nature, trails, and quiet hill air."
        backTo="/"
        backLabel="Back to Home"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Location' },
        ]}
      />
      <Location />
      <Booking />
    </PageShell>
  )
}
