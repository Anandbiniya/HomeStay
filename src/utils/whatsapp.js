import { siteConfig } from '../config/site'

/**
 * Build a WhatsApp chat URL with an optional pre-filled message.
 * Host number always comes from central siteConfig — never hard-code.
 */
export function getWhatsAppUrl(message = '') {
  const number = siteConfig.whatsapp.number.replace(/\D/g, '')
  const base = `https://wa.me/${number}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

/**
 * Standard Hostillam booking request WhatsApp message.
 * Opens in WhatsApp for the guest to press Send — the frontend cannot silently deliver.
 */
export function buildBookingMessage({
  name,
  phone,
  email,
  guests,
  accommodation,
  checkIn,
  checkOut,
  message,
}) {
  return [
    '🏕️ HOSTILLAM BOOKING REQUEST',
    '',
    'Hello Hostillam,',
    '',
    'I would like to enquire about a booking.',
    '',
    'Stay / Camping:',
    accommodation || '—',
    '',
    'Name:',
    name || '—',
    '',
    'Phone:',
    phone || '—',
    '',
    'Email:',
    email || '—',
    '',
    'Guests:',
    String(guests || '—'),
    '',
    'Check-in:',
    checkIn || '—',
    '',
    'Check-out:',
    checkOut || '—',
    '',
    'Message:',
    message?.trim() || '—',
    '',
    'Please confirm availability and booking.',
    '',
    'Thank you.',
  ].join('\n')
}

export function openWhatsAppBooking(formData) {
  const text = buildBookingMessage(formData)
  const url = getWhatsAppUrl(text)
  window.open(url, '_blank', 'noopener,noreferrer')
  return url
}

export function openWhatsAppQuick(accommodationName) {
  const text = [
    '🏕️ HOSTILLAM BOOKING REQUEST',
    '',
    'Hello Hostillam,',
    '',
    `I would like to enquire about booking${accommodationName ? `: ${accommodationName}` : ''}.`,
    '',
    'Please confirm availability and booking.',
    '',
    'Thank you.',
  ].join('\n')
  window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer')
}

/**
 * Build a simple volunteer application WhatsApp message.
 */
export function buildVolunteerMessage({ name, phone, email, helpWith, preferredDates }) {
  return [
    '🌿 HOSTILLAM VOLUNTEER APPLICATION',
    '',
    `Name: ${name}`,
    '',
    `Phone: ${phone}`,
    '',
    `Email: ${email || '—'}`,
    '',
    'I can help with:',
    helpWith,
    '',
    "I'd like to come:",
    preferredDates,
    '',
    "I'm interested in volunteering with Hostillam and would like to know more about the opportunity.",
  ].join('\n')
}

export function openWhatsAppVolunteer(formData) {
  const text = buildVolunteerMessage(formData)
  const url = getWhatsAppUrl(text)
  window.open(url, '_blank', 'noopener,noreferrer')
  return url
}
