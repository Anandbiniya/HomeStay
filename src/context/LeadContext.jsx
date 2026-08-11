import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import LeadCaptureModal from '../components/LeadCaptureModal'
import { Events, trackEvent } from '../services/trackingService'
import { notifyHostFromLeadCapture } from '../services/notificationService'
import { getStoredLeadContact, getVisitorId, hasLeadContact } from '../services/visitorService'
import { getWhatsAppUrl } from '../utils/whatsapp'

const LeadContext = createContext(null)

export function LeadProvider({ children }) {
  const [contact, setContact] = useState(() => getStoredLeadContact())
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMeta, setModalMeta] = useState({})
  const [bookingPrefill, setBookingPrefill] = useState(null)
  const resolverRef = useRef(null)

  useEffect(() => {
    getVisitorId()
    const key = 'hostillam_page_view_sent'
    if (sessionStorage.getItem(key)) return undefined
    sessionStorage.setItem(key, '1')
    const timer = window.setTimeout(() => {
      trackEvent(Events.PAGE_VIEWED, {
        page: '/',
        data: { section: 'home' },
      })
    }, 50)
    return () => window.clearTimeout(timer)
  }, [])

  const closeModal = useCallback((result = null) => {
    setModalOpen(false)
    const resolve = resolverRef.current
    resolverRef.current = null
    if (resolve) resolve(result)
  }, [])

  const ensureContact = useCallback(
    ({ sourceEvent, accommodation, intent, title } = {}) =>
      new Promise((resolve) => {
        const existing = getStoredLeadContact()
        if (existing?.phone) {
          setContact(existing)
          resolve(existing)
          return
        }

        resolverRef.current = resolve
        setModalMeta({
          sourceEvent: sourceEvent || Events.LEAD_CAPTURED,
          accommodation: accommodation || null,
          intent: intent || 'CONTACT',
          title: title || 'Before we connect you with the host',
        })
        setModalOpen(true)
      }),
    [],
  )

  const handleLeadSubmit = useCallback(
    async ({ name, phone, email }) => {
      const result = await notifyHostFromLeadCapture({
        name,
        phone,
        email,
        accommodation: modalMeta.accommodation,
        sourceEvent: modalMeta.sourceEvent || Events.LEAD_CAPTURED,
        intent: modalMeta.intent || 'CONTACT',
      })

      await trackEvent(Events.LEAD_CAPTURED, {
        accommodation: modalMeta.accommodation,
        data: { leadId: result.lead?.id },
      })

      const nextContact = {
        name: result.lead.name,
        phone: result.lead.phone,
        email: result.lead.email || '',
        leadId: result.lead.id,
        capturedAt: result.lead.updatedAt,
      }
      setContact(nextContact)
      closeModal(nextContact)
      return nextContact
    },
    [closeModal, modalMeta],
  )

  const openBooking = useCallback((prefill = {}) => {
    setBookingPrefill({
      accommodation: prefill.accommodation || '',
      guests: prefill.guests || '2',
      ...prefill,
      nonce: Date.now(),
    })
    trackEvent(Events.BOOKING_FORM_OPENED, {
      page: '/#booking',
      accommodation: prefill.accommodation || null,
    })
    const target = document.getElementById('booking')
    if (target) {
      window.location.hash = 'booking'
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  const requestBookNow = useCallback(
    async ({ accommodation, source = 'book_now' } = {}) => {
      await trackEvent(Events.BOOK_NOW_CLICKED, {
        page: '/#booking',
        accommodation: accommodation || null,
        data: { source },
      })
      await trackEvent(Events.BOOKING_ENQUIRY_STARTED, {
        accommodation: accommodation || null,
      })

      const lead = await ensureContact({
        sourceEvent: Events.BOOK_NOW_CLICKED,
        accommodation,
        intent: 'BOOKING_ENQUIRY',
        title: 'Before we connect you with the host',
      })

      if (!lead) return null
      openBooking({ accommodation: accommodation || '' })
      return lead
    },
    [ensureContact, openBooking],
  )

  const requestWhatsAppContact = useCallback(
    async ({ accommodation, message, source = 'whatsapp' } = {}) => {
      await trackEvent(Events.WHATSAPP_CLICKED, {
        accommodation: accommodation || null,
        data: { source },
      })

      const lead = await ensureContact({
        sourceEvent: Events.WHATSAPP_CLICKED,
        accommodation,
        intent: 'WHATSAPP_CONTACT',
        title: 'Before we connect you with the host',
      })

      if (!lead) return null

      const text = [
        'Hello Hostillam,',
        '',
        message || 'I would like to enquire about a booking.',
        '',
        `Name: ${lead.name || '—'}`,
        `Phone: ${lead.phone}`,
        lead.email ? `Email: ${lead.email}` : null,
        accommodation ? `Accommodation: ${accommodation}` : null,
        '',
        'Please let me know about availability.',
        '',
        'Thank you.',
      ]
        .filter(Boolean)
        .join('\n')

      window.open(getWhatsAppUrl(text), '_blank', 'noopener,noreferrer')
      return lead
    },
    [ensureContact],
  )

  const requestContactHost = useCallback(
    async ({ accommodation } = {}) => {
      await trackEvent(Events.CONTACT_CLICKED, {
        accommodation: accommodation || null,
      })
      return requestWhatsAppContact({
        accommodation,
        source: 'contact',
        message: 'I would like to get in touch about Hostillam.',
      })
    },
    [requestWhatsAppContact],
  )

  const value = useMemo(
    () => ({
      visitorId: getVisitorId(),
      contact,
      hasContact: Boolean(contact?.phone || hasLeadContact()),
      bookingPrefill,
      setBookingPrefill,
      ensureContact,
      openBooking,
      requestBookNow,
      requestWhatsAppContact,
      requestContactHost,
      trackEvent,
      Events,
    }),
    [
      contact,
      bookingPrefill,
      ensureContact,
      openBooking,
      requestBookNow,
      requestWhatsAppContact,
      requestContactHost,
    ],
  )

  return (
    <LeadContext.Provider value={value}>
      {children}
      <LeadCaptureModal
        open={modalOpen}
        title={modalMeta.title}
        onClose={() => closeModal(null)}
        onSubmit={handleLeadSubmit}
      />
    </LeadContext.Provider>
  )
}

export function useLead() {
  const ctx = useContext(LeadContext)
  if (!ctx) throw new Error('useLead must be used within LeadProvider')
  return ctx
}
