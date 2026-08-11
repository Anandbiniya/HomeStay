import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { instagramConfig } from '../data/instagram'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

async function fetchReelsFeed() {
  const response = await fetch(`${API_BASE}/instagram/reels`)
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.error || 'Failed to load Instagram reels')
  }
  return data
}

export default function InstagramReels() {
  const ref = useReveal()
  const [feed, setFeed] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await fetchReelsFeed()
        if (cancelled) return
        setFeed(data)
        setError('')
      } catch (err) {
        if (cancelled) return
        setError(err.message || 'Could not load reels')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    const timer = window.setInterval(load, instagramConfig.refreshIntervalMs)
    return () => {
      cancelled = true
      window.clearInterval(timer)
    }
  }, [])

  const reels = (feed?.reels || []).slice(0, instagramConfig.visibleCount)
  const profileUrl = feed?.profileUrl || instagramConfig.profileUrl
  const handle = feed?.username || instagramConfig.handle

  return (
    <section id="reels" className="section bg-[rgb(231_235_228_/_0.4)]">
      <div ref={ref} className="container-site reveal">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-label">Instagram</p>
            <h2 className="section-title">{instagramConfig.title}</h2>
            <p className="section-lead">{instagramConfig.lead}</p>
          </div>

          <a href={profileUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
            @{handle}
          </a>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="card-surface aspect-[9/14] animate-pulse bg-white/70" />
            ))}
          </div>
        ) : null}

        {!loading && error && !reels.length ? (
          <div className="card-surface mt-10 p-6 sm:p-8">
            <h3 className="font-display text-2xl text-pine-deep">Instagram is warming up</h3>
            <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
              We couldn’t load the latest reels right now. You can still watch everything on Instagram.
            </p>
            <a href={profileUrl} target="_blank" rel="noreferrer" className="btn btn-primary mt-6">
              Open @{handle}
            </a>
          </div>
        ) : null}

        {!loading && reels.length ? (
          <>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {reels.map((reel) => {
                const playing = activeId === reel.id
                return (
                  <article key={reel.id} className="card-surface overflow-hidden">
                    <div className="relative aspect-[9/14] overflow-hidden bg-[linear-gradient(160deg,#d7e0d4_0%,#b7c7b2_55%,#8fa88a_100%)]">
                      {playing && reel.videoUrl ? (
                        <video
                          className="h-full w-full object-cover"
                          src={reel.videoUrl}
                          poster={reel.thumbnailUrl}
                          controls
                          autoPlay
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <>
                          <img
                            src={reel.thumbnailUrl}
                            alt={reel.caption?.slice(0, 80) || `Instagram reel by @${handle}`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            onError={(event) => {
                              event.currentTarget.style.opacity = '0'
                            }}
                          />
                          <button
                            type="button"
                            className="absolute inset-0 flex items-center justify-center bg-black/15 transition hover:bg-black/25"
                            onClick={() => {
                              if (reel.videoUrl) setActiveId(reel.id)
                              else window.open(reel.permalink, '_blank', 'noopener,noreferrer')
                            }}
                            aria-label="Play reel"
                          >
                            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-pine shadow-[var(--shadow-card)]">
                              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M8 5.5v13l11-6.5L8 5.5z" />
                              </svg>
                            </span>
                          </button>
                        </>
                      )}
                    </div>

                    <div className="p-4 sm:p-5">
                      <p className="line-clamp-3 text-sm leading-relaxed text-muted">
                        {reel.caption || 'Watch this Hostillam reel on Instagram.'}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <a
                          href={reel.permalink}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-outline !min-h-10 !px-4 !text-sm"
                        >
                          Open on Instagram
                        </a>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`${profileUrl}reels/`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                See all reels on Instagram
              </a>
              <p className="text-sm text-muted">
                This feed updates automatically from @{handle}.
                {feed?.cached ? ' Showing the latest saved feed.' : ''}
              </p>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
