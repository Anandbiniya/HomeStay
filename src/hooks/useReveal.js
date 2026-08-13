import { useEffect, useRef } from 'react'

/**
 * Fade-in on scroll. Always falls back to visible so sections (e.g. Reels)
 * cannot stay stuck at opacity:0 if IntersectionObserver never fires.
 */
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const show = () => node.classList.add('is-visible')

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      show()
      return undefined
    }

    // Safety: never leave content invisible indefinitely.
    const fallback = window.setTimeout(show, 1800)

    if (typeof IntersectionObserver === 'undefined') {
      show()
      window.clearTimeout(fallback)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show()
          observer.unobserve(node)
          window.clearTimeout(fallback)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [])

  return ref
}
