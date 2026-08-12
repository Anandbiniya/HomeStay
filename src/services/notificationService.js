import { captureLead, submitBookingEnquiry } from './leadService'

/**
 * Frontend notification abstraction.
 * Host notifications are created server-side only.
 * This module routes high-intent lead actions through the Lead API,
 * which triggers WhatsApp / email notification services on the backend.
 */
export async function notifyHostFromLeadCapture(payload) {
  return captureLead(payload)
}

export async function notifyHostFromBookingEnquiry(payload) {
  return submitBookingEnquiry(payload)
}

export default {
  notifyHostFromLeadCapture,
  notifyHostFromBookingEnquiry,
}
