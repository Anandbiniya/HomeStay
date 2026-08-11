import { useMemo, useState } from 'react'
import { accommodations } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { openWhatsAppBooking } from '../utils/whatsapp'
import { siteConfig } from '../config/site'

const initialForm = {
  name: '',
  phone: '',
  guests: '2',
  accommodation: accommodations[0]?.name || '',
  checkIn: '',
  checkOut: '',
  message: '',
}

export default function Booking() {
  const ref = useReveal()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  const today = useMemo(() => new Date().toISOString().split('T')[0], [])

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if (!form.name.trim() || !form.phone.trim()) {
      setError('Please share your name and phone number so the host can reply.')
      return
    }

    if (!form.checkIn || !form.checkOut) {
      setError('Please select your check-in and check-out dates.')
      return
    }

    if (form.checkOut < form.checkIn) {
      setError('Check-out must be on or after check-in.')
      return
    }

    openWhatsAppBooking({
      name: form.name.trim(),
      phone: form.phone.trim(),
      guests: form.guests,
      accommodation: form.accommodation,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      message: form.message.trim(),
    })
  }

  return (
    <section id="booking" className="section">
      <div ref={ref} className="container-site reveal">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <p className="section-label">Booking</p>
            <h2 className="section-title">Reserve your stay through WhatsApp</h2>
            <p className="section-lead">
              There is no online payment here. Share your details, and we will open WhatsApp with a
              ready-to-send message for the host.
            </p>

            <div className="mt-8 space-y-4 rounded-[1.4rem] border border-pine/10 bg-white p-6 shadow-[var(--shadow-card)]">
              <p className="text-sm leading-relaxed text-muted">
                Your request is sent directly to the host on WhatsApp. Booking is confirmed only after the
                host responds and confirms availability.
              </p>
              <div className="rounded-xl bg-mist px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-moss">WhatsApp</p>
                <p className="mt-1 font-semibold text-pine">{siteConfig.whatsapp.display}</p>
              </div>
              <p className="text-sm text-muted">
                Please include a reachable phone number so we can confirm your stay.
              </p>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-[1.5rem] border border-pine/10 bg-white p-5 shadow-[var(--shadow-soft)] sm:p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" htmlFor="name">
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="field-input"
                  placeholder="Your full name"
                  required
                  autoComplete="name"
                />
              </Field>

              <Field label="Phone number" htmlFor="phone">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={onChange}
                  className="field-input"
                  placeholder="+91 ..."
                  required
                  autoComplete="tel"
                />
              </Field>

              <Field label="Number of guests" htmlFor="guests">
                <select
                  id="guests"
                  name="guests"
                  value={form.guests}
                  onChange={onChange}
                  className="field-input"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((count) => (
                    <option key={count} value={String(count)}>
                      {count} {count === 1 ? 'guest' : 'guests'}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Accommodation" htmlFor="accommodation">
                <select
                  id="accommodation"
                  name="accommodation"
                  value={form.accommodation}
                  onChange={onChange}
                  className="field-input"
                >
                  {accommodations.map((item) => (
                    <option key={item.id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Check-in" htmlFor="checkIn">
                <input
                  id="checkIn"
                  name="checkIn"
                  type="date"
                  min={today}
                  value={form.checkIn}
                  onChange={onChange}
                  className="field-input"
                  required
                />
              </Field>

              <Field label="Check-out" htmlFor="checkOut">
                <input
                  id="checkOut"
                  name="checkOut"
                  type="date"
                  min={form.checkIn || today}
                  value={form.checkOut}
                  onChange={onChange}
                  className="field-input"
                  required
                />
              </Field>
            </div>

            <Field label="Message" htmlFor="message" className="mt-4">
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={onChange}
                className="field-input resize-y"
                placeholder="Any preferences, arrival time, or questions..."
              />
            </Field>

            {error ? <p className="mt-3 text-sm font-medium text-red-700">{error}</p> : null}

            <button type="submit" className="btn btn-whatsapp mt-5 w-full sm:w-auto">
              Send enquiry on WhatsApp
            </button>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Submitting opens WhatsApp with your details pre-filled. No payment is collected on this
              website.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({ label, htmlFor, children, className = '' }) {
  return (
    <label className={`block ${className}`} htmlFor={htmlFor}>
      <span className="mb-1.5 block text-sm font-semibold text-pine">{label}</span>
      {children}
    </label>
  )
}
