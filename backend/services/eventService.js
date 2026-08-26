import { randomUUID } from 'crypto'
import { updateDb, readDb } from '../store.js'

export async function recordEvent(payload) {
  const event = {
    id: `evt_${randomUUID()}`,
    visitorId: payload.visitorId,
    event: payload.event,
    page: payload.page || '/',
    accommodation: payload.accommodation || null,
    timestamp: payload.timestamp || new Date().toISOString(),
    data: payload.data || {},
  }

  await updateDb((db) => {
    db.events.push(event)
    if (!db.visitors[event.visitorId]) {
      db.visitors[event.visitorId] = {
        visitorId: event.visitorId,
        firstSeenAt: event.timestamp,
        lastSeenAt: event.timestamp,
        eventCount: 0,
      }
    }
    db.visitors[event.visitorId].lastSeenAt = event.timestamp
    db.visitors[event.visitorId].eventCount += 1
    return db
  })

  return event
}

export async function getEventsForVisitor(visitorId, limit = 50) {
  const db = await readDb()
  return db.events
    .filter((item) => item.visitorId === visitorId)
    .sort((a, b) => String(b.timestamp).localeCompare(String(a.timestamp)))
    .slice(0, limit)
}

export function summarizeActivity(events) {
  const lines = []
  const seen = new Set()

  for (const item of [...events].reverse()) {
    let line = null
    switch (item.event) {
      case 'PAGE_VIEWED':
        line = `Viewed ${item.page || 'page'}`
        break
      case 'ACCOMMODATION_VIEWED':
      case 'ACCOMMODATION_DETAIL_OPENED':
        line = `Viewed accommodation${item.accommodation ? `: ${item.accommodation}` : ''}`
        break
      case 'GALLERY_OPENED':
        line = 'Viewed gallery'
        break
      case 'BOOK_NOW_CLICKED':
        line = 'Clicked Book Now'
        break
      case 'WHATSAPP_CLICKED':
        line = 'Clicked WhatsApp CTA'
        break
      case 'CONTACT_CLICKED':
        line = 'Clicked Contact'
        break
      case 'ENQUIRE_CLICKED':
        line = 'Clicked Enquire'
        break
      case 'AVAILABILITY_REQUESTED':
        line = 'Requested availability'
        break
      case 'LOCATION_CLICKED':
        line = 'Clicked location / maps'
        break
      case 'BOOKING_FORM_OPENED':
        line = 'Opened booking form'
        break
      case 'BOOKING_FORM_SUBMITTED':
        line = 'Submitted booking form'
        break
      case 'BOOKING_ENQUIRY_STARTED':
        line = 'Started booking enquiry'
        break
      case 'BOOKING_ENQUIRY_COMPLETED':
        line = 'Completed booking enquiry'
        break
      default:
        line = item.event
    }

    if (item.data?.guests) line += ` · ${item.data.guests} guests`
    if (item.data?.checkIn) line += ` · check-in ${item.data.checkIn}`
    if (item.data?.checkOut) line += ` · check-out ${item.data.checkOut}`

    if (line && !seen.has(line)) {
      seen.add(line)
      lines.push(line)
    }
  }

  return lines.slice(-12)
}
