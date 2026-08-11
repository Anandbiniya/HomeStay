import { Link } from 'react-router-dom'

/**
 * In-site back control so visitors are never stuck relying on the browser only.
 */
export function BackLink({ to, children, className = 'text-pine hover:text-pine-deep' }) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 text-sm font-semibold transition ${className}`}
    >
      <span aria-hidden="true">←</span>
      <span>{children}</span>
    </Link>
  )
}

/**
 * Minimal breadcrumb trail for multi-level pages.
 */
export function Breadcrumbs({ items = [] }) {
  if (!items.length) return null

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-white/70">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true" className="text-white/40">/</span> : null}
              {isLast || !item.to ? (
                <span className={isLast ? 'font-semibold text-white' : undefined}>{item.label}</span>
              ) : (
                <Link to={item.to} className="hover:text-white">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/**
 * Dark page hero header strip with breadcrumb + back link.
 */
export function PageNavHeader({
  eyebrow,
  title,
  lead,
  backTo,
  backLabel,
  crumbs = [],
  children,
}) {
  return (
    <div className="bg-pine-deep pt-24 text-white sm:pt-28">
      <div className="container-site pb-10">
        {crumbs.length ? (
          <div className="mb-4">
            <Breadcrumbs items={crumbs} />
          </div>
        ) : null}
        {backTo ? (
          <div className="mb-5">
            <BackLink to={backTo} className="text-amber-soft hover:text-white">
              {backLabel}
            </BackLink>
          </div>
        ) : null}
        {eyebrow ? (
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-amber-soft">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-semibold tracking-[-0.02em]">
            {title}
          </h1>
        ) : null}
        {lead ? (
          <p className="mt-3 max-w-2xl text-[1.05rem] leading-relaxed text-white/75">{lead}</p>
        ) : null}
        {children}
      </div>
    </div>
  )
}
