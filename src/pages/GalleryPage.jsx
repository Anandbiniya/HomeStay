import PageShell from '../components/PageShell'
import Gallery from '../components/Gallery'
import { PageNavHeader } from '../components/PageNav'
import { usePageMeta } from '../hooks/usePageMeta'

export default function GalleryPage() {
  usePageMeta('Gallery')

  return (
    <PageShell>
      <PageNavHeader
        eyebrow="Gallery"
        title="Hostillam & My Magik Place"
        lead="High-quality photos from the Hostillam website gallery and official Instagram stills from @host.illam and @mymagikplace."
        backTo="/"
        backLabel="Back to Home"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Gallery' },
        ]}
      />
      <Gallery variant="full" pagePath="/gallery" />
    </PageShell>
  )
}
