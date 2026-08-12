import { useEffect, useRef } from 'react'
import { Events, trackEvent } from '../services/trackingService'

/**
 * Fires a tracking event once when the wrapped element enters the viewport.
 */
export default function TrackOnce({
  event,
  accommodation,
  page,
  data,
  children,
  className = '',
  as: Tag = 'div',
  ...rest
}) {
  const ref = useRef(null)
  const sent = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node || sent.current) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sent.current) {
          sent.current = true
          trackEvent(event || Events.PAGE_VIEWED, { accommodation, page, data })
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [event, accommodation, page, data])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
