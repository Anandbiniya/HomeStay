import { useMemo } from 'react'
import { useReveal } from '../hooks/useReveal'
import {
  getMonthlyGoogleReviews,
  getReviewsMonthLabel,
  googleReviewsMeta,
} from '../data/reviews'

export default function Reviews() {
  const ref = useReveal()
  const reviews = useMemo(() => getMonthlyGoogleReviews(), [])
  const monthLabel = useMemo(() => getReviewsMonthLabel(), [])

  return (
    <section id="reviews" className="section">
      <div ref={ref} className="container-site reveal">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-label">Reviews</p>
            <h2 className="section-title">What guests say on Google</h2>
            <p className="section-lead">
              A few recent Google reviews from travellers who stayed at Hostillam. This set refreshes
              each month.
            </p>
          </div>

          <div className="rounded-[1.25rem] border border-pine/10 bg-white px-5 py-4 shadow-[var(--shadow-card)]">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} filled={i < Math.round(googleReviewsMeta.rating)} />
                ))}
              </div>
              <p className="font-display text-2xl text-pine-deep">{googleReviewsMeta.rating}</p>
            </div>
            <p className="mt-1 text-sm text-muted">
              Based on {googleReviewsMeta.totalCount}+ Google reviews
            </p>
            <p className="mt-1 text-xs text-muted">Showing reviews for {monthLabel}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={`${monthLabel}-${review.id}`}
              className="card-surface flex h-full flex-col p-5 sm:p-6"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1 text-amber" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} filled={i < review.rating} />
                  ))}
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-moss">
                  Google
                </span>
              </div>

              <p className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-ink/85">
                “{review.text}”
              </p>

              <div className="mt-5 border-t border-pine/8 pt-4">
                <p className="font-semibold text-pine-deep">{review.author}</p>
                <p className="text-xs text-muted">Google review</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={googleReviewsMeta.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            See all Google reviews
          </a>
          <p className="text-sm text-muted">
            Reviews shown here rotate monthly from Hostillam’s Google reviews.
          </p>
        </div>
      </div>
    </section>
  )
}

function Star({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <path
        d="M12 3.6l2.4 4.86 5.36.78-3.88 3.78.92 5.34L12 15.9l-4.8 2.52.92-5.34-3.88-3.78 5.36-.78L12 3.6z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  )
}
