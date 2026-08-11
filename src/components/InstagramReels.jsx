import { useEffect, useRef, useState } from 'react'
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
  const sectionRef = useRef(null)
  const videoRefs = useRef(new Map())
  const [feed, setFeed] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [sectionVisible, setSectionVisible] = useState(false)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await fetchReelsFeed()
        if (cancelled) return
        setFeed(data)
        setError('')
        setActiveIndex(0)
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

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setSectionVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.35 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [loading, reels.length])

  useEffect(() => {
    if (!reels.length) return undefined

    let cancelled = false

    const syncPlayback = async () => {
      const entries = [...videoRefs.current.entries()]
      await Promise.all(
        entries.map(async ([index, video]) => {
          if (!video) return
          const shouldPlay = sectionVisible && index === activeIndex
          if (!shouldPlay) {
            video.pause()
            video.currentTime = 0
            return
          }
          try {
            video.muted = true
            await video.play()
          } catch {
            // Autoplay can be blocked until the section is interacted with.
          }
        }),
      )
    }

    syncPlayback()
    return () => {
      cancelled = true
      void cancelled
    }
  }, [activeIndex, reels, sectionVisible])

  const advance = () => {
    if (reels.length < 2) return
    setActiveIndex((current) => (current + 1) % reels.length)
  }

  return (
    <section id="reels" className="section bg-[rgb(231_235_228_/_0.4)]" ref={sectionRef}>
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
              {reels.map((reel, index) => {
                const isActive = index === activeIndex
                return (
                  <article
                    key={reel.id}
                    className={`card-surface overflow-hidden transition ${
                      isActive ? 'ring-2 ring-pine/35' : 'opacity-95'
                    }`}
                  >
                    <div className="relative aspect-[9/14] overflow-hidden bg-[linear-gradient(160deg,#d7e0d4_0%,#b7c7b2_55%,#8fa88a_100%)]">
                      {reel.videoUrl ? (
                        <video
                          ref={(node) => {
                            if (node) videoRefs.current.set(index, node)
                            else videoRefs.current.delete(index)
                          }}
                          className="h-full w-full object-cover"
                          src={reel.videoUrl}
                          poster={reel.thumbnailUrl}
                          muted
                          playsInline
                          preload={isActive ? 'auto' : 'metadata'}
                          onEnded={advance}
                          onClick={() => setActiveIndex(index)}
                          aria-label={reel.caption?.slice(0, 80) || `Instagram reel by @${handle}`}
                        />
                      ) : (
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
                Reels play one at a time automatically from @{handle}.
                {feed?.cached ? ' Showing the latest saved feed.' : ''}
              </p>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
