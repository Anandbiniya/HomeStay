import { useMemo } from 'react'
import { useReveal } from '../hooks/useReveal'
import {
  getReviewsByContext,
  myMagikPlaceGoogleReviews,
} from '../data/reviews'

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

/**
 * My Magik Place camping reviews — separate from Hostillam Veedu reviews.
 * Shows existing camping-context Google review text when available, plus the
 * official Google Maps listing CTA (no invented reviews).
 */
export default function MyMagikPlaceReviews() {
  const ref = useReveal()
  const campingReviews = useMemo(() => getReviewsByContext('camping').slice(0, 3), [])

  return (
    <section id="my-magik-place-reviews" className="section">
      <div ref={ref} className="container-site reveal">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-label">Google Reviews</p>
            <h2 className="section-title">{myMagikPlaceGoogleReviews.label}</h2>
            <p className="section-lead">{myMagikPlaceGoogleReviews.lead}</p>
          </div>
          <a
            href={myMagikPlaceGoogleReviews.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Read Google Reviews
          </a>
        </div>

        {campingReviews.length ? (
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {campingReviews.map((review) => (
              <article key={review.id} className="card-surface flex h-full flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <div
                    className="flex items-center gap-1 text-amber"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
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
                  <p className="text-xs text-muted">Camping / My Magik Place experience</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="card-surface mt-10 p-6 sm:p-8">
            <h3 className="font-display text-2xl text-pine-deep">
              {myMagikPlaceGoogleReviews.lead}
            </h3>
            <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
              Guest experiences for the Hostillam campsite / My Magik Place are on Google Maps. Open the
              official listing to read the latest reviews.
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={myMagikPlaceGoogleReviews.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            Read Google Reviews
          </a>
          <p className="text-sm text-muted">
            Opens the official My Magik Place Google Maps listing in a new tab.
          </p>
        </div>
      </div>
    </section>
  )
}
