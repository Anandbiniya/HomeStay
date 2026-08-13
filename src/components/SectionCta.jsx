import { Link } from 'react-router-dom'

/**
 * Consistent secondary CTA used on home previews.
 */
export default function SectionCta({ to, children, className = 'btn btn-outline' }) {
  if (!to) return null
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}
