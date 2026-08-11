import { getVisitorId, storeLeadContact } from './visitorService'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

async function post(path, body) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`)
  }
  return data
}

/**
 * Frontend lead API client.
 * Talks to the backend Lead API — never sends WhatsApp secrets from the browser.
 */
export async function captureLead({ name, phone, email, accommodation, sourceEvent, intent }) {
  const visitorId = getVisitorId()
  const result = await post('/leads/capture', {
    visitorId,
    name,
    phone,
    email,
    accommodation,
    sourceEvent,
    intent,
  })

  if (result.lead) {
    storeLeadContact({
      name: result.lead.name,
      phone: result.lead.phone,
      email: result.lead.email,
      leadId: result.lead.id,
      capturedAt: result.lead.updatedAt || result.lead.createdAt,
    })
  }

  return result
}

export async function submitBookingEnquiry(payload) {
  const visitorId = getVisitorId()
  const result = await post('/leads/enquiry', {
    visitorId,
    ...payload,
  })

  if (result.lead) {
    storeLeadContact({
      name: result.lead.name,
      phone: result.lead.phone,
      email: result.lead.email,
      leadId: result.lead.id,
      capturedAt: result.lead.updatedAt || result.lead.createdAt,
    })
  }

  return result
}

export async function fetchLeadForVisitor() {
  const visitorId = getVisitorId()
  try {
    const response = await fetch(`${API_BASE}/leads/visitor/${encodeURIComponent(visitorId)}`)
    if (!response.ok) return null
    const data = await response.json()
    return data.lead || null
  } catch {
    return null
  }
}

export default {
  captureLead,
  submitBookingEnquiry,
  fetchLeadForVisitor,
}
