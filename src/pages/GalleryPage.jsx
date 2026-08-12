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
        title="All Hostillam photos"
        lead="Soft light, open skies, forest paths, and the quiet beauty of days spent outdoors."
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
