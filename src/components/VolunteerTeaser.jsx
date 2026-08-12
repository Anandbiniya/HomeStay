import { Link } from 'react-router-dom'
import { volunteerContent } from '../data/volunteer'
import { useReveal } from '../hooks/useReveal'
import SectionCta from './SectionCta'

/** Home preview for the full Volunteer page — existing volunteer copy only. */
export default function VolunteerTeaser() {
  const ref = useReveal()

  return (
    <section id="volunteer" className="section">
      <div ref={ref} className="container-site reveal">
        <div className="grid gap-8 overflow-hidden rounded-[1.6rem] border border-pine/10 bg-white shadow-[var(--shadow-card)] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="section-label">{volunteerContent.hero.label}</p>
            <h2 className="section-title">{volunteerContent.hero.heading}</h2>
            <p className="section-lead">{volunteerContent.hero.text}</p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {volunteerContent.helpWith.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <SectionCta to="/volunteer" className="btn btn-primary">
                Volunteer With Us
              </SectionCta>
              <Link to="/volunteer#volunteer-apply" className="btn btn-outline">
                Apply via WhatsApp
              </Link>
            </div>
          </div>

          <div className="border-t border-pine/8 bg-mist p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
            <h3 className="font-display text-2xl text-pine-deep">{volunteerContent.provide.title}</h3>
            <ul className="mt-5 space-y-3">
              {volunteerContent.provide.items.map((item) => (
                <li key={item} className="flex gap-3 text-[1.02rem] leading-relaxed text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
