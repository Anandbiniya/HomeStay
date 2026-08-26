import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { BackLink, Breadcrumbs } from '../components/PageNav'
import { useReveal } from '../hooks/useReveal'
import { usePageMeta } from '../hooks/usePageMeta'
import { volunteerContent } from '../data/volunteer'
import { siteConfig } from '../config/site'
import { openWhatsAppVolunteer } from '../utils/whatsapp'
import { images } from '../data/imageMap'
import SafeImage from '../components/SafeImage'

const volunteerHero = images.volunteer

const initialForm = {
  name: '',
  phone: '',
  email: '',
  helpWith: '',
  preferredDates: '',
}

function ListCard({ title, items, delayClass = '' }) {
  const ref = useReveal()
  return (
    <div ref={ref} className={`card-surface reveal p-6 sm:p-7 ${delayClass}`}>
      <h2 className="font-display text-2xl text-pine-deep sm:text-[1.75rem]">{title}</h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[1.02rem] leading-relaxed text-muted">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Field({ label, htmlFor, children, className = '' }) {
  return (
    <label className={`block ${className}`} htmlFor={htmlFor}>
      <span className="mb-2 block text-[0.95rem] font-semibold text-pine">{label}</span>
      {children}
    </label>
  )
}

export default function VolunteerPage() {
  const formReveal = useReveal()
  const location = useLocation()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [readyNote, setReadyNote] = useState('')

  usePageMeta('Volunteer')

  useEffect(() => {
    if (location.hash !== '#volunteer-apply') return undefined
    const timer = window.setTimeout(() => {
      const target = document.getElementById('volunteer-apply')
      if (!target) return
      const headerOffset = 88
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset
      window.scrollTo(0, Math.max(0, top))
    }, 80)
    return () => window.clearTimeout(timer)
  }, [location.hash])

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
    setReadyNote('')
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setReadyNote('')

    const name = form.name.trim()
    const phone = form.phone.trim()
    const email = form.email.trim()
    const helpWith = form.helpWith.trim()
    const preferredDates = form.preferredDates.trim()

    if (!name || !phone || !helpWith || !preferredDates) {
      setError('Please fill in name, phone / WhatsApp, what you can help with, and when you’d like to come.')
      return
    }

    openWhatsAppVolunteer({
      name,
      phone,
      email,
      helpWith,
      preferredDates,
    })

    setReadyNote(volunteerContent.application.successNote)
  }

  return (
    <PageShell>
      <section className="relative min-h-[72svh] overflow-hidden md:min-h-[78svh]">
        <div className="hero-media absolute inset-0">
          <SafeImage
            src={volunteerHero}
            alt="Trail walk near Hostillam in Kodaikanal"
            className="h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(19_40_33_/_0.55)_0%,rgb(19_40_33_/_0.3)_45%,rgb(19_40_33_/_0.78)_100%)]" />
        </div>

        <div className="container-site relative flex min-h-[72svh] items-end pb-14 pt-28 md:min-h-[78svh] md:items-center md:pb-20 md:pt-24">
          <div className="hero-copy max-w-3xl text-white">
            <div className="mb-4">
              <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Volunteer' }]} />
            </div>
            <div className="mb-5">
              <BackLink to="/" className="text-white/90 hover:text-white">
                Back to Home
              </BackLink>
            </div>
            <p className="mb-4 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-white/80">
              {volunteerContent.hero.label}
            </p>
            <h1 className="font-display text-[clamp(2.4rem,6.5vw,4.2rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
              {volunteerContent.hero.heading}
            </h1>
            <p className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-white/88 md:text-[1.16rem]">
              {volunteerContent.hero.text}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#volunteer-apply" className="btn btn-primary">
                Apply via WhatsApp
              </a>
              <Link to="/stay" className="btn btn-secondary">
                Explore Stay
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <div className="max-w-2xl">
            <p className="section-label">Volunteer opportunity</p>
            <h2 className="section-title">Learn camp life while helping Hostillam grow</h2>
            <p className="section-lead">
              Join hands-on work around the campsite, share your skills, and experience rural hill living
              with a small host community in Kodaikanal.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <ListCard title={volunteerContent.helpWith.title} items={volunteerContent.helpWith.items} />
            <ListCard
              title={volunteerContent.lookingFor.title}
              items={volunteerContent.lookingFor.items}
              delayClass="reveal-delay-1"
            />
            <ListCard
              title={volunteerContent.provide.title}
              items={volunteerContent.provide.items}
              delayClass="reveal-delay-2"
            />
          </div>
        </div>
      </section>

      <section id="volunteer-apply" className="section bg-[rgb(231_235_228_/_0.4)]">
        <div ref={formReveal} className="container-site reveal">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
            <div>
              <p className="section-label">Application</p>
              <h2 className="section-title">{volunteerContent.application.title}</h2>
              <p className="section-lead">{volunteerContent.application.lead}</p>

              <div className="mt-8 space-y-4 rounded-[1.4rem] border border-pine/10 bg-white p-6 shadow-[var(--shadow-card)]">
                <p className="text-sm leading-relaxed text-muted">
                  No login, no resume upload, no long questionnaire — just a short WhatsApp message to the
                  host.
                </p>
                <div className="rounded-xl bg-mist px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-moss">WhatsApp</p>
                  <p className="mt-1 font-semibold text-pine">{siteConfig.whatsapp.display}</p>
                </div>
              </div>
            </div>

            <form
              onSubmit={onSubmit}
              className="rounded-[1.5rem] border border-pine/10 bg-white p-5 shadow-[var(--shadow-soft)] sm:p-8"
            >
              <div className="grid gap-5">
                <Field label="Name *" htmlFor="volunteer-name">
                  <input
                    id="volunteer-name"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    className="field-input !min-h-12 !text-base"
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                  />
                </Field>

                <Field label="Phone / WhatsApp Number *" htmlFor="volunteer-phone">
                  <input
                    id="volunteer-phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={onChange}
                    className="field-input !min-h-12 !text-base"
                    placeholder="+91 ..."
                    autoComplete="tel"
                    required
                  />
                </Field>

                <Field label="Email" htmlFor="volunteer-email">
                  <input
                    id="volunteer-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    className="field-input !min-h-12 !text-base"
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
                </Field>

                <Field label="What can you help with? *" htmlFor="volunteer-help">
                  <textarea
                    id="volunteer-help"
                    name="helpWith"
                    rows={4}
                    value={form.helpWith}
                    onChange={onChange}
                    className="field-input resize-y !min-h-[8rem] !text-base"
                    placeholder="Bamboo & wooden structures, art, campsite work, outdoor activities…"
                    required
                  />
                </Field>

                <Field label="When would you like to come? *" htmlFor="volunteer-dates">
                  <input
                    id="volunteer-dates"
                    name="preferredDates"
                    value={form.preferredDates}
                    onChange={onChange}
                    className="field-input !min-h-12 !text-base"
                    placeholder="e.g. April 2026 for 2–3 weeks"
                    required
                  />
                </Field>
              </div>

              {error ? <p className="mt-4 text-sm font-medium text-red-700">{error}</p> : null}
              {readyNote ? <p className="mt-4 text-sm font-medium text-pine">{readyNote}</p> : null}

              <button type="submit" className="btn btn-whatsapp mt-6 w-full !min-h-12 !text-base">
                Apply via WhatsApp
              </button>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                WhatsApp will open with your application ready. You still need to press Send to complete it.
              </p>
            </form>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
