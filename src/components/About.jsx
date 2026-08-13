import aboutImage from '../assets/images/about.jpg'
import { aboutHighlights } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import SafeImage from './SafeImage'

export default function About() {
  const ref = useReveal()

  return (
    <section id="about" className="section">
      <div ref={ref} className="container-site reveal">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="relative">
            <div className="overflow-hidden rounded-[1.6rem] shadow-[var(--shadow-soft)]">
              <SafeImage
                src={aboutImage}
                alt="Lush green hills surrounding Hostillam"
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
              />
            </div>
            <div className="absolute -bottom-5 left-5 right-5 rounded-2xl border border-pine/10 bg-white/95 p-5 shadow-[var(--shadow-card)] backdrop-blur sm:left-auto sm:right-[-1.25rem] sm:w-[17rem]">
              <p className="font-display text-2xl text-pine-deep">Come as guests,</p>
              <p className="mt-1 text-sm text-muted">leave as family.</p>
            </div>
          </div>

          <div className="pt-6 lg:pt-0">
            <p className="section-label">About Hostillam</p>
            <h2 className="section-title">A peaceful home for slow days and starlit nights</h2>
            <p className="section-lead">
              Hostillam means “hosting beautiful minds” — and that is exactly what we love to do. Nestled
              amidst lush greenery in Kodaikanal, our charming Veedu is a retreat for travellers seeking
              tranquillity, warmth, and a true local experience.
            </p>
            <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-muted">
              Whether you are here to rest, camp under the stars, share a meal, or explore quiet trails,
              Hostillam offers a simple blend of comfort and nature — personal, meaningful, and connected.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {aboutHighlights.map((item) => (
                <div key={item.label} className="rounded-2xl border border-pine/8 bg-white p-4">
                  <h3 className="font-display text-xl text-pine-deep">{item.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
