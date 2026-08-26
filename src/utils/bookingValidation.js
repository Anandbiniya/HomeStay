/**
 * Booking form validation helpers.
 * Used before moving from the details step to the review step.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function normalizePhoneDigits(phone) {
  return String(phone || '').replace(/\D/g, '')
}

export function isValidPhone(phone) {
  const digits = normalizePhoneDigits(phone)
  // Allow local 10-digit and international numbers with country code.
  return digits.length >= 10 && digits.length <= 15
}

export function isValidEmail(email) {
  const value = String(email || '').trim()
  if (!value) return true
  return EMAIL_RE.test(value)
}

export function formatDisplayDate(isoDate) {
  if (!isoDate) return '—'
  const date = new Date(`${isoDate}T12:00:00`)
  if (Number.isNaN(date.getTime())) return isoDate
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * @returns {{ ok: true } | { ok: false, errors: Record<string, string>, message: string }}
 */
export function validateBookingForm(form) {
  const errors = {}
  const name = String(form.name || '').trim()
  const phone = String(form.phone || '').trim()
  const email = String(form.email || '').trim()
  const guests = String(form.guests || '').trim()
  const accommodation = String(form.accommodation || '').trim()
  const checkIn = String(form.checkIn || '').trim()
  const checkOut = String(form.checkOut || '').trim()

  if (!name) errors.name = 'Please enter your full name.'
  if (!phone) errors.phone = 'Please enter your phone / WhatsApp number.'
  else if (!isValidPhone(phone)) errors.phone = 'Please enter a valid phone number (at least 10 digits).'
  if (email && !isValidEmail(email)) errors.email = 'Please enter a valid email address, or leave it blank.'
  if (!guests || Number(guests) < 1) errors.guests = 'Please select the number of guests.'
  if (!accommodation) errors.accommodation = 'Please select a stay or camping option.'
  if (!checkIn) errors.checkIn = 'Please select a check-in date.'
  if (!checkOut) errors.checkOut = 'Please select a check-out date.'
  if (checkIn && checkOut && checkOut < checkIn) {
    errors.checkOut = 'Check-out must be on or after check-in.'
  }

  const keys = Object.keys(errors)
  if (!keys.length) return { ok: true }

  return {
    ok: false,
    errors,
    message: errors[keys[0]],
  }
}

export default {
  validateBookingForm,
  formatDisplayDate,
  isValidPhone,
  isValidEmail,
}
