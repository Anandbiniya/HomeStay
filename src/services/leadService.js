import { getVisitorId, storeLeadContact } from './visitorService'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

async function post(path, body, { timeoutMs = 8000 } = {}) {
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null
  const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller?.signal,
      keepalive: true,
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new Error(data.error || `Request failed (${response.status})`)
    }
    return data
  } finally {
    if (timer) clearTimeout(timer)
  }
}

function persistLead(lead) {
  if (!lead) return
  storeLeadContact({
    name: lead.name,
    phone: lead.phone,
    email: lead.email,
    leadId: lead.id,
    capturedAt: lead.updatedAt || lead.createdAt,
  })
}

/**
 * Frontend lead API client.
 * Talks to the backend Lead API — never sends WhatsApp secrets from the browser.
 */
export async function captureLead({ name, phone, email, accommodation, sourceEvent, intent }) {
  const visitorId = getVisitorId()

  // Persist locally first so the UI can continue immediately on retry/offline.
  storeLeadContact({
    name: name || '',
    phone: phone || '',
    email: email || '',
    leadId: null,
    capturedAt: new Date().toISOString(),
  })

  const result = await post('/leads/capture', {
    visitorId,
    name,
    phone,
    email,
    accommodation,
    sourceEvent,
    intent,
  })

  persistLead(result.lead)
  return result
}

export async function submitBookingEnquiry(payload) {
  const visitorId = getVisitorId()
  const result = await post(
    '/leads/enquiry',
    {
      visitorId,
      ...payload,
    },
    { timeoutMs: 10000 },
  )

  persistLead(result.lead)
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
