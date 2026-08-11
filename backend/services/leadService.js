import { randomUUID } from 'crypto'
import { readDb, updateDb } from '../store.js'
import { getEventsForVisitor, summarizeActivity } from './eventService.js'
import { notifyHostOfLead } from './notificationService.js'

export const LEAD_STATUSES = [
  'NEW',
  'CONTACTED',
  'BOOKING_ENQUIRY',
  'CONFIRMED',
  'CANCELLED',
]

function normalizePhone(phone) {
  return String(phone || '').trim()
}

export async function upsertLead({
  visitorId,
  name,
  phone,
  email,
  status,
  accommodation,
  intent,
  booking,
  sourceEvent,
}) {
  if (!visitorId) throw new Error('visitorId is required')
  if (!normalizePhone(phone)) throw new Error('Phone number is required')

  const now = new Date().toISOString()
  let lead

  await updateDb((db) => {
    const existing = db.leads.find((item) => item.visitorId === visitorId)
    if (existing) {
      existing.name = name?.trim() || existing.name || ''
      existing.phone = normalizePhone(phone)
      existing.email = email?.trim() || existing.email || ''
      existing.updatedAt = now
      if (status && LEAD_STATUSES.includes(status)) existing.status = status
      if (accommodation) existing.accommodation = accommodation
      if (intent) existing.intent = intent
      if (booking) existing.booking = { ...(existing.booking || {}), ...booking }
      if (sourceEvent) existing.lastSourceEvent = sourceEvent
      lead = existing
    } else {
      lead = {
        id: `lead_${randomUUID()}`,
        visitorId,
        name: name?.trim() || '',
        phone: normalizePhone(phone),
        email: email?.trim() || '',
        status: status && LEAD_STATUSES.includes(status) ? status : 'NEW',
        intent: intent || 'CONTACT',
        accommodation: accommodation || null,
        booking: booking || null,
        lastSourceEvent: sourceEvent || null,
        createdAt: now,
        updatedAt: now,
        notifications: [],
      }
      db.leads.push(lead)
    }
    return db
  })

  return lead
}

export async function createBookingEnquiry({
  visitorId,
  name,
  phone,
  email,
  accommodation,
  guests,
  checkIn,
  checkOut,
  message,
  sourceEvent = 'BOOKING_ENQUIRY_COMPLETED',
}) {
  const lead = await upsertLead({
    visitorId,
    name,
    phone,
    email,
    status: 'BOOKING_ENQUIRY',
    accommodation,
    intent: 'BOOKING_ENQUIRY',
    sourceEvent,
    booking: {
      guests,
      checkIn,
      checkOut,
      message: message || '',
      submittedAt: new Date().toISOString(),
    },
  })

  const events = await getEventsForVisitor(visitorId, 40)
  const activity = summarizeActivity(events)

  const notification = await notifyHostOfLead({
    lead,
    activity,
    action: sourceEvent,
  })

  await updateDb((db) => {
    const target = db.leads.find((item) => item.id === lead.id)
    if (target) {
      target.notifications = target.notifications || []
      target.notifications.push({
        id: notification.id,
        channels: notification.channels,
        createdAt: notification.createdAt,
      })
      target.updatedAt = new Date().toISOString()
    }
    return db
  })

  return {
    lead,
    activity,
    notification,
  }
}

export async function captureLeadContact(payload) {
  const lead = await upsertLead({
    ...payload,
    status: payload.status || 'NEW',
    intent: payload.intent || payload.sourceEvent || 'LEAD_CAPTURE',
  })

  const events = await getEventsForVisitor(payload.visitorId, 40)
  const activity = summarizeActivity(events)

  const notification = await notifyHostOfLead({
    lead,
    activity,
    action: payload.sourceEvent || 'LEAD_CAPTURED',
  })

  await updateDb((db) => {
    const target = db.leads.find((item) => item.id === lead.id)
    if (target) {
      target.notifications = target.notifications || []
      target.notifications.push({
        id: notification.id,
        channels: notification.channels,
        createdAt: notification.createdAt,
      })
    }
    return db
  })

  return { lead, activity, notification }
}

export async function getLeadByVisitor(visitorId) {
  const db = await readDb()
  return db.leads.find((item) => item.visitorId === visitorId) || null
}

export async function listLeads() {
  const db = await readDb()
  return [...db.leads].sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
}
