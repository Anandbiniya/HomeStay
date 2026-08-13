import { siteConfig } from '../config/site'

/**
 * Build a WhatsApp chat URL with an optional pre-filled message.
 */
export function getWhatsAppUrl(message = '') {
  const number = siteConfig.whatsapp.number.replace(/\D/g, '')
  const base = `https://wa.me/${number}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

/**
 * Build the standard Hostillam booking enquiry message.
 */
export function buildBookingMessage({
  name,
  phone,
  guests,
  accommodation,
  checkIn,
  checkOut,
  message,
}) {
  return [
    'Hello Hostillam,',
    '',
    'I would like to enquire about a booking.',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Guests: ${guests}`,
    `Accommodation: ${accommodation}`,
    `Check-in: ${checkIn}`,
    `Check-out: ${checkOut}`,
    `Message: ${message || '—'}`,
    '',
    'Please let me know about availability and booking confirmation.',
    '',
    'Thank you.',
  ].join('\n')
}

export function openWhatsAppBooking(formData) {
  const text = buildBookingMessage(formData)
  const url = getWhatsAppUrl(text)
  window.open(url, '_blank', 'noopener,noreferrer')
}

export function openWhatsAppQuick(accommodationName) {
  const text = [
    'Hello Hostillam,',
    '',
    `I would like to enquire about booking${accommodationName ? `: ${accommodationName}` : ''}.`,
    '',
    'Please let me know about availability.',
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
