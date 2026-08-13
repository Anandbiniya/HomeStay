import PageShell from '../components/PageShell'
import Experience from '../components/Experience'
import InstagramReels from '../components/InstagramReels'
import { PageNavHeader } from '../components/PageNav'
import { usePageMeta } from '../hooks/usePageMeta'

export default function ExperiencePage() {
  usePageMeta('Experience')

  return (
    <PageShell>
      <PageNavHeader
        eyebrow="Experience"
        title="Moments that stay with you"
        lead="From quiet mornings to campfire evenings — every Hostillam experience, in one place."
        backTo="/"
        backLabel="Back to Home"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'Experience' },
        ]}
      />
      <Experience variant="full" />
      <InstagramReels
        variant="preview"
        username="host.illam"
        title="Experience Hostillam on Instagram"
        lead="Watch reels that show the real Hostillam experience — then explore the full feed."
      />
    </PageShell>
  )
}
