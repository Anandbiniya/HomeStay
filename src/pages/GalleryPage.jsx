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
        lead="Real Hostillam Veedu home photos and My Magik Place camping photos, shown in separate sections."
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
