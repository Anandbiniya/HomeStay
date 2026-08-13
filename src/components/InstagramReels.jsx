import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { instagramConfig } from '../data/instagram'
import SectionCta from './SectionCta'
import SafeImage from './SafeImage'

const API_BASE = import.meta.env.VITE_API_BASE || '/api'

async function fetchReelsFeed(username) {
  const query = username ? `?username=${encodeURIComponent(username)}` : ''
  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), 8000)
  try {
    const response = await fetch(`${API_BASE}/instagram/reels${query}`, {
      signal: controller.signal,
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      throw new Error(data.error || 'Failed to load Instagram reels')
    }
    return data
  } catch (err) {
    if (err?.name === 'AbortError') {
      throw new Error('Instagram feed timed out')
    }
    throw err
  } finally {
    window.clearTimeout(timeout)
  }
}

/**
 * Instagram reels section.
 * Instagram CDN video URLs often fail (403). When video cannot play, we show the
 * official thumbnail + Open on Instagram — never fake reels or blank embeds.
 * When the feed cannot load at all, a polished View on Instagram CTA remains visible.
 */
export default function InstagramReels({
  variant = 'full',
  limit,
  username,
  title = instagramConfig.title,
  lead = instagramConfig.lead,
  sectionLabel = 'From Hostillam',
  viewAllTo = '/reels',
  fallbackLead,
  /** Skip video playback attempts (use when CDN video is known unreliable). */
  preferStills = false,
}) {
  const ref = useReveal()
  const sectionRef = useRef(null)
  const videoRefs = useRef(new Map())
  const [feed, setFeed] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [sectionVisible, setSectionVisible] = useState(false)
  const [failedVideos, setFailedVideos] = useState(() => new Set())
  const [failedThumbs, setFailedThumbs] = useState(() => new Set())

  const isPreview = variant === 'preview'
  const visibleLimit =
    typeof limit === 'number' ? limit : isPreview ? 3 : instagramConfig.visibleCount
  const feedUsername = username || instagramConfig.handle

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const timer = window.setTimeout(() => node.classList.add('is-visible'), 80)
    return () => window.clearTimeout(timer)
  }, [ref])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const data = await fetchReelsFeed(feedUsername)
        if (cancelled) return
        setFeed(data)
        setError('')
        setActiveIndex(0)
        setFailedVideos(new Set())
        setFailedThumbs(new Set())
      } catch (err) {
        if (cancelled) return
        setError(err.message || 'Could not load reels')
        setFeed(null)
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
  }, [feedUsername])

  const reels = (feed?.reels || []).slice(0, visibleLimit)
  const profileUrl = feed?.profileUrl || `https://www.instagram.com/${feedUsername}/`
  const handle = feed?.username || feedUsername
  const externalView = typeof viewAllTo === 'string' && viewAllTo.startsWith('http')

  const usableReels = reels.filter((reel, index) => {
    if (failedThumbs.has(index) && (preferStills || failedVideos.has(index) || !reel.videoUrl)) {
      return false
    }
    return Boolean(reel.thumbnailUrl || (!preferStills && reel.videoUrl))
  })

  const showFeed = !loading && usableReels.length > 0
  const showCtaFallback = !loading && !showFeed

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setSectionVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [loading, reels.length])

  useEffect(() => {
    if (preferStills || !reels.length) return undefined

    const syncPlayback = async () => {
      const entries = [...videoRefs.current.entries()]
      await Promise.all(
        entries.map(async ([index, video]) => {
          if (!video) return
          const shouldPlay = sectionVisible && index === activeIndex && !failedVideos.has(index)
          if (!shouldPlay) {
            video.pause()
            try {
              video.currentTime = 0
            } catch {
              // ignore
            }
            return
          }
          try {
            video.muted = true
            await video.play()
          } catch {
            // Autoplay can be blocked; thumbnail fallback remains.
          }
        }),
      )
    }

    syncPlayback()
    return undefined
  }, [activeIndex, reels, sectionVisible, failedVideos, preferStills])

  const markVideoFailed = (index) => {
    setFailedVideos((prev) => {
      if (prev.has(index)) return prev
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }

  const markThumbFailed = (index) => {
    setFailedThumbs((prev) => {
      if (prev.has(index)) return prev
      const next = new Set(prev)
      next.add(index)
      return next
    })
  }

  const advance = () => {
    if (reels.length < 2) return
    setActiveIndex((current) => (current + 1) % reels.length)
  }

  const fallbackText =
    fallbackLead ||
    `See the camping experience, life around the campsite, nature and moments from @${handle}.`

  return (
    <section id="reels" className="section bg-[rgb(231_235_228_/_0.4)]" ref={sectionRef}>
      <div ref={ref} className="container-site reveal is-visible">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-label">{sectionLabel}</p>
            <h2 className="section-title">{title}</h2>
            <p className="section-lead">{lead}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {isPreview ? (
              externalView ? (
                <a href={viewAllTo} target="_blank" rel="noreferrer" className="btn btn-primary">
                  View on Instagram
                </a>
              ) : (
                <SectionCta to={viewAllTo}>Watch all reels</SectionCta>
              )
            ) : (
              <a href={profileUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                View on Instagram
              </a>
            )}
            <a href={profileUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
              @{handle}
            </a>
          </div>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: Math.min(3, visibleLimit) }).map((_, index) => (
              <div key={index} className="card-surface aspect-[9/14] animate-pulse bg-white/70" />
            ))}
          </div>
        ) : null}

        {showCtaFallback ? (
          <div className="card-surface mt-10 p-6 sm:p-8">
            <h3 className="font-display text-2xl text-pine-deep">
              {feedUsername === 'mymagikplace'
                ? 'View My Magik Place on Instagram'
                : `View @${handle} on Instagram`}
            </h3>
            <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
              {fallbackText}
            </p>
            <p className="mt-3 text-sm text-muted">
              {error
                ? 'Live Instagram embeds are limited right now, so we send you to the official account instead of showing a broken player.'
                : 'Open the official Instagram account to watch the latest reels.'}
            </p>
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary mt-6"
            >
              View on Instagram
            </a>
          </div>
        ) : null}

        {showFeed ? (
          <>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {reels.map((reel, index) => {
                if (failedThumbs.has(index) && (preferStills || failedVideos.has(index) || !reel.videoUrl)) {
                  return null
                }
                const isActive = index === activeIndex
                const videoBroken =
                  preferStills || failedVideos.has(index) || !reel.videoUrl
                return (
                  <article
                    key={reel.id}
                    className={`card-surface overflow-hidden transition ${
                      isActive ? 'ring-2 ring-pine/35' : 'opacity-95'
                    }`}
                  >
                    <div className="relative aspect-[9/14] overflow-hidden bg-[linear-gradient(160deg,#d7e0d4_0%,#b7c7b2_55%,#8fa88a_100%)]">
                      {!videoBroken ? (
                        <video
                          ref={(node) => {
                            if (node) videoRefs.current.set(index, node)
                            else videoRefs.current.delete(index)
                          }}
                          className="h-full w-full object-cover"
                          src={reel.videoUrl}
                          poster={reel.thumbnailUrl || undefined}
                          muted
                          playsInline
                          preload={isActive ? 'auto' : 'metadata'}
                          onEnded={advance}
                          onClick={() => setActiveIndex(index)}
                          onError={() => markVideoFailed(index)}
                          aria-label={reel.caption?.slice(0, 80) || `Instagram reel by @${handle}`}
                        />
                      ) : (
                        <a
                          href={reel.permalink || profileUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="block h-full w-full"
                          onClick={() => setActiveIndex(index)}
                        >
                          <SafeImage
                            src={reel.thumbnailUrl}
                            alt={reel.caption?.slice(0, 80) || `Instagram still by @${handle}`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            onLoad={undefined}
                            onError={() => markThumbFailed(index)}
                          />
                          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pine-deep/70 to-transparent px-4 py-5 text-sm font-semibold text-white">
                            Open on Instagram
                          </span>
                        </a>
                      )}
                    </div>

                    <div className="p-4 sm:p-5">
                      <p className="line-clamp-3 text-sm leading-relaxed text-muted">
                        {reel.caption || `Watch this @${handle} reel on Instagram.`}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <a
                          href={reel.permalink || profileUrl}
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
              <a href={profileUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                View on Instagram
              </a>
              <a
                href={`${profileUrl}reels/`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                See all reels on Instagram
              </a>
              <p className="text-sm text-muted">
                Official Instagram: @{handle}.
                {feed?.cached ? ' Showing the latest saved feed.' : ''}
                {preferStills || failedVideos.size
                  ? ' Open Instagram to watch the full reels.'
                  : ''}
              </p>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}
