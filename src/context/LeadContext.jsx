import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import LeadCaptureModal from '../components/LeadCaptureModal'
import { Events, trackEvent } from '../services/trackingService'
import { notifyHostFromLeadCapture } from '../services/notificationService'
import { getStoredLeadContact, getVisitorId, hasLeadContact, storeLeadContact } from '../services/visitorService'
import { getWhatsAppUrl } from '../utils/whatsapp'

const LeadContext = createContext(null)

const BOOKING_PREFILL_KEY = 'hostillam_booking_prefill'

function persistBookingPrefill(prefill) {
  try {
    sessionStorage.setItem(
      BOOKING_PREFILL_KEY,
      JSON.stringify({
        accommodation: prefill?.accommodation || '',
        guests: prefill?.guests || '2',
        returnTo: prefill?.returnTo || '',
        nonce: Date.now(),
      }),
    )
  } catch {
    // Ignore storage failures (private mode, etc.)
  }
}

export function consumeStoredBookingPrefill() {
  try {
    const raw = sessionStorage.getItem(BOOKING_PREFILL_KEY)
    if (!raw) return null
    sessionStorage.removeItem(BOOKING_PREFILL_KEY)
    return JSON.parse(raw)
  } catch {
    return null
  }
}

function scrollToBookingSection(prefill = null) {
  document.body.style.overflow = ''
  const target = document.getElementById('booking')
  if (!target) {
    // Book Now from pages without a booking section should land on home booking,
    // preserving the selected option across the navigation.
    if (prefill) persistBookingPrefill(prefill)
    window.location.assign('/#booking')
    return false
  }

  // Make sure reveal animation is not leaving the section visually unset.
  target.querySelectorAll('.reveal').forEach((node) => node.classList.add('is-visible'))
  target.classList.add('is-visible')

  const headerOffset = 88
  const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset
  window.scrollTo(0, Math.max(0, top))

  if (window.location.hash !== '#booking') {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#booking`)
  }
  return true
}

function ensureBookingInView(attempt = 0) {
  scrollToBookingSection()
  const target = document.getElementById('booking')
  if (!target) return
  const top = target.getBoundingClientRect().top
  // Keep correcting while images above finish loading and push the section down.
  if ((top < 40 || top > 160) && attempt < 12) {
    window.setTimeout(() => ensureBookingInView(attempt + 1), 80)
  }
}

export function LeadProvider({ children }) {
  const [contact, setContact] = useState(() => getStoredLeadContact())
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMeta, setModalMeta] = useState({})
  const [bookingPrefill, setBookingPrefill] = useState(null)
  const resolverRef = useRef(null)

  useEffect(() => {
    getVisitorId()
    const storedPrefill = consumeStoredBookingPrefill()
    if (storedPrefill) {
      setBookingPrefill(storedPrefill)
      window.setTimeout(() => ensureBookingInView(0), 80)
    }
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
    document.body.style.overflow = ''
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

  const openBooking = useCallback((prefill = {}) => {
    const nextPrefill = {
      accommodation: prefill.accommodation || '',
      guests: prefill.guests || '2',
      returnTo: prefill.returnTo || '',
      ...prefill,
      nonce: Date.now(),
    }
    setBookingPrefill(nextPrefill)
    trackEvent(Events.BOOKING_FORM_OPENED, {
      page: window.location.pathname || '/#booking',
      accommodation: nextPrefill.accommodation || null,
    })

    scrollToBookingSection(nextPrefill)
    ensureBookingInView(0)
  }, [])

  const handleLeadSubmit = useCallback(
    async ({ name, phone, email }) => {
      const nextContact = {
        name: name || '',
        phone: phone || '',
        email: email || '',
        leadId: null,
        capturedAt: new Date().toISOString(),
      }

      storeLeadContact(nextContact)
      setContact(nextContact)
      document.body.style.overflow = ''
      setModalOpen(false)

      const shouldOpenBooking =
        modalMeta.intent === 'BOOKING_ENQUIRY' ||
        modalMeta.sourceEvent === Events.BOOK_NOW_CLICKED ||
        modalMeta.sourceEvent === Events.BOOKING_FORM_SUBMITTED

      const resolve = resolverRef.current
      resolverRef.current = null
      if (resolve) resolve(nextContact)

      if (shouldOpenBooking) {
        openBooking({
          accommodation: modalMeta.accommodation || '',
          returnTo:
            window.location.pathname.startsWith('/camping')
              ? '/camping'
              : window.location.pathname.startsWith('/stay')
                ? '/stay'
                : '',
        })
      }

      // Only notify the host for non-booking contact intents.
      // Booking notifications are sent exclusively after "Send Booking Request".
      const isBookingIntent =
        modalMeta.intent === 'BOOKING_ENQUIRY' ||
        modalMeta.sourceEvent === Events.BOOK_NOW_CLICKED ||
        modalMeta.sourceEvent === Events.BOOKING_FORM_SUBMITTED

      if (!isBookingIntent) {
        notifyHostFromLeadCapture({
          name,
          phone,
          email,
          accommodation: modalMeta.accommodation,
          sourceEvent: modalMeta.sourceEvent || Events.LEAD_CAPTURED,
          intent: modalMeta.intent || 'CONTACT',
        })
          .then((result) => {
            if (!result?.lead) return
            const synced = {
              name: result.lead.name,
              phone: result.lead.phone,
              email: result.lead.email || '',
              leadId: result.lead.id,
              capturedAt: result.lead.updatedAt,
            }
            storeLeadContact(synced)
            setContact(synced)
            trackEvent(Events.LEAD_CAPTURED, {
              accommodation: modalMeta.accommodation,
              data: { leadId: result.lead.id },
            })
          })
          .catch((error) => {
            console.warn('[lead] background notify failed', error.message)
          })
      } else {
        storeLeadContact(nextContact)
      }

      return nextContact
    },
    [modalMeta, openBooking],
  )

  const requestBookNow = useCallback(
    ({ accommodation, source = 'book_now', returnTo } = {}) => {
      // Book Now only opens the booking form. Nothing is sent to the host here.
      trackEvent(Events.BOOK_NOW_CLICKED, {
        page: window.location.pathname || '/#booking',
        accommodation: accommodation || null,
        data: { source },
      })

      const prefill = {
        accommodation: accommodation || '',
        returnTo:
          returnTo ||
          (window.location.pathname.startsWith('/camping')
            ? '/camping'
            : window.location.pathname.startsWith('/stay')
              ? '/stay'
              : ''),
      }

      openBooking(prefill)
      return Promise.resolve(getStoredLeadContact())
    },
    [openBooking],
  )

  const requestWhatsAppContact = useCallback(
    ({ accommodation, message, source = 'whatsapp' } = {}) => {
      trackEvent(Events.WHATSAPP_CLICKED, {
        accommodation: accommodation || null,
        data: { source },
      })

      const openChat = (lead) => {
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
      }

      const existing = getStoredLeadContact()
      if (existing?.phone) {
        setContact(existing)
        return Promise.resolve(openChat(existing))
      }

      return ensureContact({
        sourceEvent: Events.WHATSAPP_CLICKED,
        accommodation,
        intent: 'WHATSAPP_CONTACT',
        title: 'Before we connect you with the host',
      }).then(openChat)
    },
    [ensureContact],
  )

  const requestContactHost = useCallback(
    ({ accommodation } = {}) => {
      trackEvent(Events.CONTACT_CLICKED, {
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
