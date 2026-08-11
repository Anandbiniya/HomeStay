import PageShell from '../components/PageShell'
import About from '../components/About'
import { PageNavHeader } from '../components/PageNav'
import { usePageMeta } from '../hooks/usePageMeta'

export default function AboutPage() {
  usePageMeta('About')

  return (
    <PageShell>
      <PageNavHeader
        eyebrow="About"
        title="The Hostillam story"
        lead="Hosting beautiful minds in the hills of Kodaikanal — a peaceful home for slow days and starlit nights."
        backTo="/"
        backLabel="Back to Home"
        crumbs={[
          { label: 'Home', to: '/' },
          { label: 'About' },
        ]}
      />
      <About />
    </PageShell>
  )
}
