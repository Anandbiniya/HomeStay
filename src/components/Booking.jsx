import { useEffect, useMemo, useState } from 'react'
import { accommodations, bookableOptions } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { siteConfig } from '../config/site'
import { useLead } from '../context/LeadContext'
import { Events } from '../services/trackingService'
import { notifyHostFromBookingEnquiry } from '../services/notificationService'
import { openWhatsAppBooking } from '../utils/whatsapp'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  guests: '2',
  accommodation: '',
  checkIn: '',
  checkOut: '',
  message: '',
}

export default function Booking({
  lockedAccommodation = '',
  options,
  accommodationLabel = 'Accommodation',
  title,
  lead,
}) {
  const ref = useReveal()
  const { contact, bookingPrefill, ensureContact, trackEvent } = useLead()
  const selectableOptions = options || bookableOptions || accommodations
  const [form, setForm] = useState({
    ...initialForm,
    accommodation: lockedAccommodation || selectableOptions[0]?.name || '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [statusNote, setStatusNote] = useState('')

  const today = useMemo(() => new Date().toISOString().split('T')[0], [])
  const accommodationLocked = Boolean(lockedAccommodation)

  useEffect(() => {
    if (!lockedAccommodation) return
    setForm((prev) => ({ ...prev, accommodation: lockedAccommodation }))
  }, [lockedAccommodation])

  useEffect(() => {
    if (!contact) return
    setForm((prev) => ({
      ...prev,
      name: contact.name || prev.name,
      phone: contact.phone || prev.phone,
      email: contact.email || prev.email,
    }))
  }, [contact])

  useEffect(() => {
    if (!bookingPrefill) return
    setForm((prev) => ({
      ...prev,
      accommodation: accommodationLocked
        ? lockedAccommodation
        : bookingPrefill.accommodation || prev.accommodation,
      guests: bookingPrefill.guests || prev.guests,
      name: contact?.name || prev.name,
      phone: contact?.phone || prev.phone,
      email: contact?.email || prev.email,
    }))
  }, [bookingPrefill, contact, accommodationLocked, lockedAccommodation])

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    setStatusNote('')

    trackEvent(Events.BOOKING_FORM_SUBMITTED, {
      page: '/#booking',
      accommodation: form.accommodation,
      data: {
        guests: form.guests,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
      },
    })

    let leadContact = contact
    if (!leadContact?.phone) {
      leadContact = await ensureContact({
        sourceEvent: Events.BOOKING_FORM_SUBMITTED,
        accommodation: form.accommodation,
        intent: 'BOOKING_ENQUIRY',
      })
      if (!leadContact) return
    }

    const name = (form.name || leadContact.name || '').trim()
    const phone = (form.phone || leadContact.phone || '').trim()
    const email = (form.email || leadContact.email || '').trim()

    if (!phone) {
      setError('Please share your phone number so the host can reply.')
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

    setSubmitting(true)
    setError('')

    const bookingPayload = {
      name,
      phone,
      guests: form.guests,
      accommodation: form.accommodation,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      message: form.message.trim(),
    }

    // Open WhatsApp immediately — don't make the guest wait on backend notifications.
    openWhatsAppBooking(bookingPayload)
    setStatusNote(
      'WhatsApp is opening with your enquiry. We are also notifying the host in the background. Booking is confirmed only after the host replies.',
    )
    setSubmitting(false)

    trackEvent(Events.BOOKING_ENQUIRY_STARTED, {
      accommodation: form.accommodation,
      data: { guests: form.guests, checkIn: form.checkIn, checkOut: form.checkOut },
    })

    notifyHostFromBookingEnquiry({
      ...bookingPayload,
      email,
      sourceEvent: Events.BOOKING_ENQUIRY_COMPLETED,
    })
      .then((result) => {
        trackEvent(Events.BOOKING_ENQUIRY_COMPLETED, {
          accommodation: form.accommodation,
          data: {
            leadId: result.lead?.id,
            guests: form.guests,
            checkIn: form.checkIn,
            checkOut: form.checkOut,
          },
        })
      })
      .catch((err) => {
        console.warn('[booking] background notify failed', err.message)
        setStatusNote(
          'WhatsApp opened with your enquiry. Host notification is still syncing — if needed, send the WhatsApp message to complete your request.',
        )
      })
  }

  return (
    <section id="booking" className="section">
      <div ref={ref} className="container-site reveal">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            <p className="section-label">Booking</p>
            <h2 className="section-title">
              {title || 'Reserve your stay through WhatsApp'}
            </h2>
            <p className="section-lead">
              {lead ||
                'There is no online payment here. Share your details, and we notify the host securely, then open WhatsApp so you can continue the conversation.'}
            </p>

            <div className="mt-8 space-y-4 rounded-[1.4rem] border border-pine/10 bg-white p-6 shadow-[var(--shadow-card)]">
              <p className="text-sm leading-relaxed text-muted">
                Your request is sent to the host through our notification service. Booking is confirmed
                only after the host responds and confirms availability.
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
                  autoComplete="name"
                />
              </Field>

              <Field label="Phone number *" htmlFor="phone">
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

              <Field label="Email (optional)" htmlFor="email" className="sm:col-span-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  className="field-input"
                  placeholder="you@email.com"
                  autoComplete="email"
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

              <Field label={`${accommodationLabel}${accommodationLocked ? '' : ''}`} htmlFor="accommodation">
                {accommodationLocked ? (
                  <input
                    id="accommodation"
                    name="accommodation"
                    value={form.accommodation}
                    className="field-input"
                    readOnly
                  />
                ) : (
                  <select
                    id="accommodation"
                    name="accommodation"
                    value={form.accommodation}
                    onChange={onChange}
                    className="field-input"
                  >
                    {selectableOptions.map((item) => (
                      <option key={item.id || item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                )}
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

            <p className="mt-3 text-xs leading-relaxed text-muted">
              Your contact details are used only to respond to your Hostillam enquiry.
            </p>

            {error ? <p className="mt-3 text-sm font-medium text-red-700">{error}</p> : null}
            {statusNote ? <p className="mt-3 text-sm font-medium text-pine">{statusNote}</p> : null}

            <button type="submit" className="btn btn-whatsapp mt-5 w-full sm:w-auto" disabled={submitting}>
              {submitting ? 'Sending enquiry…' : 'Send enquiry on WhatsApp'}
            </button>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Submitting notifies the host and opens WhatsApp with your details. No payment is collected on
              this website.
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
