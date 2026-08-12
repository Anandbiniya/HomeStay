import { useEffect, useId, useState } from 'react'

export default function LeadCaptureModal({ open, title, onClose, onSubmit }) {
  const titleId = useId()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return undefined
    setError('')
    setSubmitting(false)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  if (!open) return null

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!phone.trim()) {
      setError('Phone number is required so the host can reach you.')
      return
    }

    setSubmitting(true)
    setError('')
    try {
      await onSubmit({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
      })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button
        type="button"
        className="absolute inset-0 bg-pine-deep/55 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-[1.4rem] border border-pine/10 bg-white p-5 shadow-[var(--shadow-soft)] sm:p-6">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-pine/10 text-pine"
          aria-label="Close form"
        >
          ×
        </button>

        <p className="section-label !mt-0">Enquiry</p>
        <h2 id={titleId} className="mt-2 font-display text-[1.75rem] leading-tight text-pine-deep">
          {title || 'Before we connect you with the host'}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Share your contact details so we can respond to your Hostillam enquiry. No account is created.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <label className="block" htmlFor="lead-name">
            <span className="mb-1.5 block text-sm font-semibold text-pine">Name</span>
            <input
              id="lead-name"
              className="field-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </label>

          <label className="block" htmlFor="lead-phone">
            <span className="mb-1.5 block text-sm font-semibold text-pine">Phone Number *</span>
            <input
              id="lead-phone"
              className="field-input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 ..."
              required
              autoComplete="tel"
            />
          </label>

          <label className="block" htmlFor="lead-email">
            <span className="mb-1.5 block text-sm font-semibold text-pine">Email (optional)</span>
            <input
              id="lead-email"
              className="field-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              autoComplete="email"
            />
          </label>

          <p className="text-xs leading-relaxed text-muted">
            Your contact details are used only to respond to your Hostillam enquiry.
          </p>

          {error ? <p className="text-sm font-medium text-red-700">{error}</p> : null}

          <button type="submit" className="btn btn-primary w-full" disabled={submitting}>
            {submitting ? 'Continuing…' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}
