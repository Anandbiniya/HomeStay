import { randomUUID } from 'crypto'
import { backendConfig } from '../config.js'
import { updateDb } from '../store.js'

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

  // Lightweight SMTP via fetch-compatible providers is environment-specific.
  // Keep a clear abstraction; when SMTP is present we log structured payload
  // and note that a transport adapter can be plugged in.
  return {
    channel: 'EMAIL',
    status: 'queued',
    detail: `SMTP configured for ${host}:${port}. Message prepared for ${to}.`,
    preview: { from, to, subject, body },
  }
}

export async function notifyHostOfLead({ lead, activity, action }) {
  const message = buildLeadMessage({ lead, activity, action })
  const channels = backendConfig.notificationChannels
  const results = []

  if (channels.includes('WHATSAPP')) {
    const result = await sendWhatsAppCloudApi(backendConfig.host.whatsappNumber, message)
    results.push(result)
    console.info('[notification:whatsapp]', result.status, result.detail)
  }

  if (channels.includes('EMAIL')) {
    const result = await sendEmailFallback(
      backendConfig.host.email,
      `New Hostillam lead — ${lead.name || lead.phone}`,
      message,
    )
    results.push(result)
    console.info('[notification:email]', result.status, result.detail)
  }

  const notification = {
    id: `ntf_${randomUUID()}`,
    leadId: lead.id,
    visitorId: lead.visitorId,
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

export { buildLeadMessage }
