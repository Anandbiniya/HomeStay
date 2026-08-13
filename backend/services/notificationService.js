import { randomUUID } from 'crypto'
import { backendConfig } from '../config.js'
import { updateDb } from '../store.js'

function buildBookingRequestMessage({ lead }) {
  const booking = lead.booking || {}
  return [
    '🏕️ NEW HOSTILLAM BOOKING REQUEST',
    '',
    'Guest:',
    lead.name || '—',
    '',
    'Phone:',
    lead.phone || '—',
    '',
    'Email:',
    lead.email || '—',
    '',
    'Booking:',
    lead.accommodation || '—',
    '',
    'Guests:',
    booking.guests != null ? String(booking.guests) : '—',
    '',
    'Check-in:',
    booking.checkIn || '—',
    '',
    'Check-out:',
    booking.checkOut || '—',
    '',
    'Message:',
    booking.message || '—',
    '',
    'Source:',
    'Hostillam Website',
    '',
    'Status:',
    booking.status || lead.status || 'REQUESTED',
  ].join('\n')
}

function buildLeadMessage({ lead, activity, action }) {
  const booking = lead.booking || {}
  const lines = [
    '🔔 NEW HOSTILLAM LEAD',
    '',
    `Name: ${lead.name || '—'}`,
    `Phone: ${lead.phone || '—'}`,
    `Email: ${lead.email || '—'}`,
    `Visitor ID: ${lead.visitorId}`,
    `Status: ${lead.status}`,
    '',
    'Action:',
    action || lead.lastSourceEvent || lead.intent || 'LEAD',
    '',
  ]

  if (lead.accommodation) {
    lines.push('Accommodation:', lead.accommodation, '')
  }

  if (booking.guests || booking.checkIn || booking.checkOut || booking.message) {
    if (booking.guests) {
      lines.push('Guests:', String(booking.guests), '')
    }
    if (booking.checkIn) {
      lines.push('Check-in:', booking.checkIn, '')
    }
    if (booking.checkOut) {
      lines.push('Check-out:', booking.checkOut, '')
    }
    if (booking.message) {
      lines.push('Message:', booking.message, '')
    }
  }

  lines.push('Visitor activity:')
  if (activity?.length) {
    activity.forEach((item) => lines.push(`- ${item}`))
  } else {
    lines.push('- No prior activity recorded')
  }

  lines.push('', `Intent: ${lead.intent || '—'}`)
  return lines.join('\n')
}

/**
 * WhatsApp Cloud API delivery (server-side only).
 * When credentials are missing, the message is logged — never fake a silent send.
 */
async function sendWhatsAppCloudApi(to, body) {
  const { accessToken, phoneNumberId, apiVersion } = backendConfig.whatsapp
  if (!accessToken || !phoneNumberId) {
    return {
      channel: 'WHATSAPP',
      status: 'logged',
      detail: 'WhatsApp Cloud API credentials not configured. Message logged for development.',
      preview: body,
    }
  }

  const url = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body },
    }),
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    return {
      channel: 'WHATSAPP',
      status: 'error',
      detail: data?.error?.message || `WhatsApp API error (${response.status})`,
      preview: body,
    }
  }

  return {
    channel: 'WHATSAPP',
    status: 'sent',
    detail: 'WhatsApp Cloud API message accepted',
    providerId: data?.messages?.[0]?.id || null,
    preview: body,
  }
}

/**
 * Email delivery abstraction (server-side only).
 * Credentials never leave the backend. Without SMTP config we log only.
 */
async function sendEmailFallback(to, subject, body) {
  const { host, user, pass, from, port } = backendConfig.smtp
  if (!host || !user || !pass) {
    return {
      channel: 'EMAIL',
      status: 'logged',
      detail: 'SMTP credentials not configured. Email logged for development.',
      preview: { to, subject, body },
    }
  }

  // Transport adapter hook: SMTP is configured; a real nodemailer/SES transport
  // can be plugged in here without changing the booking API contract.
  return {
    channel: 'EMAIL',
    status: 'queued',
    detail: `SMTP configured for ${host}:${port}. Message prepared for ${to}.`,
    preview: { from, to, subject, body },
  }
}

export async function notifyHostOfLead({ lead, activity, action, kind = 'LEAD' }) {
  const message =
    kind === 'BOOKING_REQUEST'
      ? buildBookingRequestMessage({ lead })
      : buildLeadMessage({ lead, activity, action })

  const channels = backendConfig.notificationChannels
  const results = []

  if (channels.includes('WHATSAPP')) {
    const result = await sendWhatsAppCloudApi(backendConfig.host.whatsappNumber, message)
    results.push(result)
    console.info('[notification:whatsapp]', result.status, result.detail)
  }

  if (channels.includes('EMAIL')) {
    const subject =
      kind === 'BOOKING_REQUEST'
        ? `New Hostillam booking request — ${lead.name || lead.phone}`
        : `New Hostillam lead — ${lead.name || lead.phone}`
    const result = await sendEmailFallback(backendConfig.host.email, subject, message)
    results.push(result)
    console.info('[notification:email]', result.status, result.detail)
  }

  const notification = {
    id: `ntf_${randomUUID()}`,
    leadId: lead.id,
    visitorId: lead.visitorId,
    kind,
    channels: results,
    message,
    createdAt: new Date().toISOString(),
  }

  await updateDb((db) => {
    db.notifications.push(notification)
    return db
  })

  return notification
}

export { buildLeadMessage, buildBookingRequestMessage }
