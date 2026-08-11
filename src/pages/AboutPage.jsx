import PageShell from '../components/PageShell'
import About from '../components/About'
import { usePageMeta } from '../hooks/usePageMeta'

export default function AboutPage() {
  usePageMeta('About')

  return (
    <PageShell>
      <div className="bg-pine-deep pt-24 text-white sm:pt-28">
        <div className="container-site pb-10">
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-amber-soft">About</p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-[-0.02em]">
            The Hostillam story
          </h1>
          <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-white/75">
            Hosting beautiful minds in the hills of Kodaikanal — a peaceful home for slow days and starlit
            nights.
          </p>
        </div>
      </div>
      <About variant="full" />
    </PageShell>
  )
}
