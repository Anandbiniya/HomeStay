import { useEffect, useMemo, useState } from 'react'
import { accommodations, bookableOptions } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import { siteConfig } from '../config/site'
import { useLead } from '../context/LeadContext'
import { Events } from '../services/trackingService'
import { notifyHostFromBookingEnquiry } from '../services/notificationService'
import { openWhatsAppBooking } from '../utils/whatsapp'
import { formatDisplayDate, validateBookingForm } from '../utils/bookingValidation'
import { storeLeadContact } from '../services/visitorService'
import { BackLink } from './PageNav'

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

/** Booking UI steps — host is only notified on explicit "Send Booking Request". */
const STEPS = {
  DETAILS: 'details',
  REVIEW: 'review',
  SUCCESS: 'success',
}

export default function Booking({
  lockedAccommodation = '',
  options,
  accommodationLabel = 'Stay / Camping Option',
  title,
  lead,
  returnTo,
  returnLabel,
}) {
  const ref = useReveal()
  const { contact, bookingPrefill, setBookingPrefill, trackEvent } = useLead()
  const selectableOptions = options || bookableOptions || accommodations
  const [form, setForm] = useState({
    ...initialForm,
    accommodation: lockedAccommodation || selectableOptions[0]?.name || '',
  })
  const [step, setStep] = useState(STEPS.DETAILS)
  const [fieldErrors, setFieldErrors] = useState({})
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [delivery, setDelivery] = useState({ whatsappOpened: false, email: null, backend: null })

  const today = useMemo(() => new Date().toISOString().split('T')[0], [])
  const accommodationLocked = Boolean(lockedAccommodation)
  const backTo = returnTo || bookingPrefill?.returnTo || ''
  const backLabel = returnLabel || 'Back to previous page'

  useEffect(() => {
    if (!lockedAccommodation) return
    setForm((prev) => ({ ...prev, accommodation: lockedAccommodation }))
  }, [lockedAccommodation])

  useEffect(() => {
    if (!contact) return
    setForm((prev) => ({
      ...prev,
      name: prev.name || contact.name || '',
      phone: prev.phone || contact.phone || '',
      email: prev.email || contact.email || '',
    }))
  }, [contact])

  useEffect(() => {
    if (!bookingPrefill) return
    setStep(STEPS.DETAILS)
    setError('')
    setFieldErrors({})
    setForm((prev) => ({
      ...prev,
      accommodation: accommodationLocked
        ? lockedAccommodation
        : bookingPrefill.accommodation || prev.accommodation,
      guests: bookingPrefill.guests || prev.guests,
      name: bookingPrefill.name || contact?.name || prev.name,
      phone: bookingPrefill.phone || contact?.phone || prev.phone,
      email: bookingPrefill.email || contact?.email || prev.email,
    }))
  }, [bookingPrefill, contact, accommodationLocked, lockedAccommodation])

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setError('')
    setFieldErrors((prev) => {
      if (!prev[name]) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const goToReview = (event) => {
    event.preventDefault()
    setError('')

    const result = validateBookingForm(form)
    if (!result.ok) {
      setFieldErrors(result.errors)
      setError(result.message)
      return
    }

    // Persist contact locally for convenience only — does NOT notify the host.
    storeLeadContact({
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      leadId: contact?.leadId || null,
      capturedAt: new Date().toISOString(),
    })

    trackEvent(Events.BOOKING_FORM_SUBMITTED, {
      page: window.location.pathname || '/#booking',
      accommodation: form.accommodation,
      data: {
        step: 'review',
        guests: form.guests,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
      },
    })

    setStep(STEPS.REVIEW)
  }

  const sendBookingRequest = async () => {
    setError('')
    const result = validateBookingForm(form)
    if (!result.ok) {
      setFieldErrors(result.errors)
      setError(result.message)
      setStep(STEPS.DETAILS)
      return
    }

    setSubmitting(true)

    const bookingPayload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      guests: form.guests,
      accommodation: form.accommodation,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      message: form.message.trim(),
      status: 'REQUESTED',
      sourceEvent: Events.BOOKING_ENQUIRY_COMPLETED,
    }

    // Guest must explicitly send in WhatsApp — frontend cannot deliver silently.
    openWhatsAppBooking(bookingPayload)

    let backendResult = null
    let emailChannel = null
    try {
      backendResult = await notifyHostFromBookingEnquiry(bookingPayload)
      const channels = backendResult?.notification?.channels || []
      emailChannel = channels.find((item) => item.channel === 'EMAIL') || null
      trackEvent(Events.BOOKING_ENQUIRY_COMPLETED, {
        accommodation: form.accommodation,
        data: {
          leadId: backendResult.lead?.id,
          status: backendResult.lead?.status || 'REQUESTED',
          guests: form.guests,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
        },
      })
    } catch (err) {
      console.warn('[booking] backend enquiry failed', err.message)
    }

    setDelivery({
      whatsappOpened: true,
      email: emailChannel,
      backend: backendResult,
    })
    setSubmitting(false)
    setStep(STEPS.SUCCESS)
    if (typeof setBookingPrefill === 'function') {
      setBookingPrefill(null)
    }
  }

  const startNewRequest = () => {
    setStep(STEPS.DETAILS)
    setError('')
    setFieldErrors({})
    setDelivery({ whatsappOpened: false, email: null, backend: null })
    setForm((prev) => ({
      ...initialForm,
      accommodation: lockedAccommodation || selectableOptions[0]?.name || prev.accommodation,
      name: prev.name,
      phone: prev.phone,
      email: prev.email,
    }))
  }

  const emailActuallySent =
    delivery.email?.status === 'sent' || delivery.email?.status === 'queued'

  return (
    <section id="booking" className="section">
      <div ref={ref} className="container-site reveal">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <div>
            {backTo ? (
              <div className="mb-4">
                <BackLink to={backTo}>{backLabel}</BackLink>
              </div>
            ) : null}
            <p className="section-label">Booking</p>
            <h2 className="section-title">{title || 'Book your Hostillam stay'}</h2>
            <p className="section-lead">
              {lead ||
                'No login required. Fill in your details, review the request, then send it to the host. Availability is confirmed only after the host replies.'}
            </p>

            <div className="mt-8 space-y-4 rounded-[1.4rem] border border-pine/10 bg-white p-6 shadow-[var(--shadow-card)]">
              <ol className="space-y-3 text-sm leading-relaxed text-muted">
                <li className={step === STEPS.DETAILS ? 'font-semibold text-pine' : undefined}>
                  1. Enter your booking details
                </li>
                <li className={step === STEPS.REVIEW ? 'font-semibold text-pine' : undefined}>
                  2. Review your booking request
                </li>
                <li className={step === STEPS.SUCCESS ? 'font-semibold text-pine' : undefined}>
                  3. Send booking request to the host
                </li>
              </ol>
              <div className="rounded-xl bg-mist px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-moss">Host WhatsApp</p>
                <p className="mt-1 font-semibold text-pine">{siteConfig.whatsapp.display}</p>
              </div>
              <p className="text-sm text-muted">
                Nothing is sent to the host until you click <strong>Send Booking Request</strong>.
              </p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-pine/10 bg-white p-5 shadow-[var(--shadow-soft)] sm:p-7">
            {step === STEPS.DETAILS ? (
              <form onSubmit={goToReview} noValidate>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-moss">
                  Your details
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name *" htmlFor="booking-name" error={fieldErrors.name}>
                    <input
                      id="booking-name"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      className="field-input"
                      placeholder="Your full name"
                      autoComplete="name"
                    />
                  </Field>

                  <Field
                    label="Phone / WhatsApp Number *"
                    htmlFor="booking-phone"
                    error={fieldErrors.phone}
                  >
                    <input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={onChange}
                      className="field-input"
                      placeholder="+91 ..."
                      autoComplete="tel"
                    />
                  </Field>

                  <Field
                    label="Email Address"
                    htmlFor="booking-email"
                    className="sm:col-span-2"
                    error={fieldErrors.email}
                  >
                    <input
                      id="booking-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={onChange}
                      className="field-input"
                      placeholder="you@email.com"
                      autoComplete="email"
                    />
                  </Field>

                  <Field label="Number of Guests *" htmlFor="booking-guests" error={fieldErrors.guests}>
                    <select
                      id="booking-guests"
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

                  <Field
                    label={`${accommodationLabel} *`}
                    htmlFor="booking-accommodation"
                    error={fieldErrors.accommodation}
                  >
                    {accommodationLocked ? (
                      <input
                        id="booking-accommodation"
                        name="accommodation"
                        value={form.accommodation}
                        className="field-input"
                        readOnly
                      />
                    ) : (
                      <select
                        id="booking-accommodation"
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

                  <Field label="Check-in Date *" htmlFor="booking-checkin" error={fieldErrors.checkIn}>
                    <input
                      id="booking-checkin"
                      name="checkIn"
                      type="date"
                      min={today}
                      value={form.checkIn}
                      onChange={onChange}
                      className="field-input"
                    />
                  </Field>

                  <Field
                    label="Check-out Date *"
                    htmlFor="booking-checkout"
                    error={fieldErrors.checkOut}
                  >
                    <input
                      id="booking-checkout"
                      name="checkOut"
                      type="date"
                      min={form.checkIn || today}
                      value={form.checkOut}
                      onChange={onChange}
                      className="field-input"
                    />
                  </Field>
                </div>

                <Field label="Message / Special Request" htmlFor="booking-message" className="mt-4">
                  <textarea
                    id="booking-message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={onChange}
                    className="field-input resize-y"
                    placeholder="Any preferences, arrival time, or questions..."
                  />
                </Field>

                <p className="mt-3 text-xs leading-relaxed text-muted">
                  No account is created. Your details are used only for this Hostillam booking enquiry.
                </p>

                {error ? <p className="mt-3 text-sm font-medium text-red-700">{error}</p> : null}

                <button type="submit" className="btn btn-primary mt-5 w-full sm:w-auto">
                  Review booking request
                </button>
              </form>
            ) : null}

            {step === STEPS.REVIEW ? (
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-moss">
                  Your booking request
                </p>
                <h3 className="font-display text-2xl text-pine-deep">{form.accommodation}</h3>
                <p className="mt-1 text-sm text-muted">
                  {form.guests} {Number(form.guests) === 1 ? 'Guest' : 'Guests'} · Status: REQUESTED
                  (pending host confirmation)
                </p>

                <dl className="mt-6 space-y-3 rounded-[1.1rem] border border-pine/10 bg-mist/60 p-4 text-sm sm:p-5">
                  <SummaryRow label="Check-in" value={formatDisplayDate(form.checkIn)} />
                  <SummaryRow label="Check-out" value={formatDisplayDate(form.checkOut)} />
                  <SummaryRow label="Name" value={form.name.trim()} />
                  <SummaryRow label="Phone" value={form.phone.trim()} />
                  <SummaryRow label="Email" value={form.email.trim() || '—'} />
                  <SummaryRow label="Message" value={form.message.trim() || '—'} />
                </dl>

                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Clicking the button below prepares the request for the host and opens WhatsApp with a
                  pre-filled message. You still need to press Send in WhatsApp. This does not confirm your
                  booking.
                </p>

                {error ? <p className="mt-3 text-sm font-medium text-red-700">{error}</p> : null}

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="btn btn-whatsapp w-full sm:w-auto"
                    onClick={sendBookingRequest}
                    disabled={submitting}
                  >
                    {submitting ? 'Preparing request…' : 'Send Booking Request'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setStep(STEPS.DETAILS)}
                    disabled={submitting}
                  >
                    Edit details
                  </button>
                </div>
              </div>
            ) : null}

            {step === STEPS.SUCCESS ? (
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.12em] text-moss">
                  Status: REQUESTED
                </p>
                <h3 className="font-display text-2xl text-pine-deep">Booking request ready</h3>
                <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">
                  Your booking details have been prepared for the Hostillam host. Please send the WhatsApp
                  message to complete the enquiry.
                </p>

                <div className="mt-5 space-y-2 rounded-[1.1rem] border border-pine/10 bg-mist/60 p-4 text-sm text-muted">
                  <p>
                    WhatsApp: opened with your booking request to{' '}
                    <strong className="text-pine">{siteConfig.whatsapp.display}</strong>. Press Send in
                    WhatsApp if it is not sent yet.
                  </p>
                  {emailActuallySent ? (
                    <p>
                      Email: booking request was also prepared for the host via the Hostillam email
                      service.
                    </p>
                  ) : (
                    <p>
                      Email: automatic host email is not fully configured yet — WhatsApp is the primary
                      enquiry path for now.
                    </p>
                  )}
                  <p className="font-semibold text-pine">
                    Booking is not confirmed yet. Only the host can confirm availability.
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="btn btn-whatsapp"
                    onClick={() => openWhatsAppBooking({
                      name: form.name.trim(),
                      phone: form.phone.trim(),
                      email: form.email.trim(),
                      guests: form.guests,
                      accommodation: form.accommodation,
                      checkIn: form.checkIn,
                      checkOut: form.checkOut,
                      message: form.message.trim(),
                    })}
                  >
                    Open WhatsApp again
                  </button>
                  <button type="button" className="btn btn-outline" onClick={startNewRequest}>
                    Make another request
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, htmlFor, children, className = '', error }) {
  return (
    <label className={`block ${className}`} htmlFor={htmlFor}>
      <span className="mb-1.5 block text-sm font-semibold text-pine">{label}</span>
      {children}
      {error ? <span className="mt-1 block text-xs font-medium text-red-700">{error}</span> : null}
    </label>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-3">
      <dt className="font-semibold text-pine">{label}</dt>
      <dd className="whitespace-pre-wrap text-ink/85">{value}</dd>
    </div>
  )
}
