import { getVisitorId } from './visitorService'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

export async function trackEvent(event, details = {}) {
  const visitorId = getVisitorId()
  if (!visitorId || !event) return null

  const payload = {
    visitorId,
    event,
    page: details.page || (typeof window !== 'undefined' ? window.location.pathname + window.location.hash : '/'),
    accommodation: details.accommodation || null,
    timestamp: new Date().toISOString(),
    data: details.data || {},
  }

  try {
    const response = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) {
      console.warn('[tracking] failed', response.status)
      return null
    }
    const data = await response.json()
    return data.event
  } catch (error) {
    console.warn('[tracking] unavailable', error.message)
    return null
  }
}

export const Events = {
  PAGE_VIEWED: 'PAGE_VIEWED',
  ACCOMMODATION_VIEWED: 'ACCOMMODATION_VIEWED',
  ACCOMMODATION_DETAIL_OPENED: 'ACCOMMODATION_DETAIL_OPENED',
  GALLERY_OPENED: 'GALLERY_OPENED',
  BOOK_NOW_CLICKED: 'BOOK_NOW_CLICKED',
  CONTACT_CLICKED: 'CONTACT_CLICKED',
  WHATSAPP_CLICKED: 'WHATSAPP_CLICKED',
  LOCATION_CLICKED: 'LOCATION_CLICKED',
  ENQUIRE_CLICKED: 'ENQUIRE_CLICKED',
  AVAILABILITY_REQUESTED: 'AVAILABILITY_REQUESTED',
  BOOKING_FORM_OPENED: 'BOOKING_FORM_OPENED',
  BOOKING_FORM_SUBMITTED: 'BOOKING_FORM_SUBMITTED',
  BOOKING_ENQUIRY_STARTED: 'BOOKING_ENQUIRY_STARTED',
  BOOKING_ENQUIRY_COMPLETED: 'BOOKING_ENQUIRY_COMPLETED',
  LEAD_CAPTURED: 'LEAD_CAPTURED',
}
