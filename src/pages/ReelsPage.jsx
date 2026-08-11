import PageShell from '../components/PageShell'
import InstagramReels from '../components/InstagramReels'
import { usePageMeta } from '../hooks/usePageMeta'
import { instagramConfig } from '../data/instagram'

export default function ReelsPage() {
  usePageMeta('Reels')

  return (
    <PageShell>
      <div className="bg-pine-deep pt-24 text-white sm:pt-28">
        <div className="container-site pb-4">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-amber-soft">Reels</p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-[-0.02em]">
            {instagramConfig.title}
          </h1>
          <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-white/75">
            {instagramConfig.lead}
          </p>
        </div>
      </div>
      <InstagramReels variant="full" />
    </PageShell>
  )
}
