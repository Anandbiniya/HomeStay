import PageShell from '../components/PageShell'
import Experience from '../components/Experience'
import InstagramReels from '../components/InstagramReels'
import { usePageMeta } from '../hooks/usePageMeta'

export default function ExperiencePage() {
  usePageMeta('Experience')

  return (
    <PageShell>
      <div className="bg-pine-deep pt-24 text-white sm:pt-28">
        <div className="container-site pb-10">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-amber-soft">
            Experience
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-[-0.02em]">
            Moments that stay with you
          </h1>
          <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-white/75">
            From quiet mornings to campfire evenings — every Hostillam experience, in one place.
          </p>
        </div>
      </div>
      <Experience variant="full" />
      <InstagramReels
        variant="preview"
        title="Experience Hostillam on Instagram"
        lead="Watch reels that show the real Hostillam experience — then explore the full feed."
      />
    </PageShell>
  )
}
