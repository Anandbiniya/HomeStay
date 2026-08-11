import { useEffect } from 'react'
import { siteConfig } from '../config/site'

/** Sets document title and scrolls to top for dedicated pages. */
export function usePageMeta(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${siteConfig.brand}` : siteConfig.brand
    window.scrollTo(0, 0)
    return () => {
      document.title = `${siteConfig.brand} | ${siteConfig.tagline}`
    }
  }, [title])
}
