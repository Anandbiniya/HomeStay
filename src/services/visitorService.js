const VISITOR_KEY = 'hostillam_visitor_id'
const LEAD_KEY = 'hostillam_lead_contact'

function createVisitorId() {
  const random =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID().replace(/-/g, '')
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`
  return `visitor_${random.slice(0, 16)}`
}

export function getVisitorId() {
  if (typeof window === 'undefined') return null
  let id = window.localStorage.getItem(VISITOR_KEY)
  if (!id) {
    id = createVisitorId()
    window.localStorage.setItem(VISITOR_KEY, id)
  }
  return id
}

export function getStoredLeadContact() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(LEAD_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.phone) return null
    return {
      name: parsed.name || '',
      phone: parsed.phone || '',
      email: parsed.email || '',
      leadId: parsed.leadId || null,
      capturedAt: parsed.capturedAt || null,
    }
  } catch {
    return null
  }
}

export function storeLeadContact(contact) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(
    LEAD_KEY,
    JSON.stringify({
      name: contact.name || '',
      phone: contact.phone || '',
      email: contact.email || '',
      leadId: contact.leadId || null,
      capturedAt: contact.capturedAt || new Date().toISOString(),
    }),
  )
}

export function hasLeadContact() {
  return Boolean(getStoredLeadContact()?.phone)
}
