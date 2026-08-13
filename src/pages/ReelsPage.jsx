import PageShell from '../components/PageShell'
import InstagramReels from '../components/InstagramReels'
import { PageNavHeader } from '../components/PageNav'
import { usePageMeta } from '../hooks/usePageMeta'
import { instagramConfig } from '../data/instagram'

export default function ReelsPage() {
  usePageMeta('Reels')

  return (
    <PageShell>
      <PageNavHeader
        eyebrow="Reels"
        title={instagramConfig.title}
        lead={instagramConfig.lead}
        backTo="/"
        backLabel="Back to Home"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Reels' },
        ]}
      />
      <InstagramReels variant="full" preferStills />
    </PageShell>
  )
}
