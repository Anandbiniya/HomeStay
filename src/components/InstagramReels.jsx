import { useEffect, useMemo } from 'react'
import { useReveal } from '../hooks/useReveal'
import { getConfiguredReels, instagramConfig } from '../data/instagram'

const EMBED_SCRIPT_ID = 'instagram-embed-js'
const EMBED_SCRIPT_SRC = 'https://www.instagram.com/embed.js'

function loadInstagramEmbedScript() {
  if (typeof window === 'undefined') return Promise.resolve()

  if (window.instgrm?.Embeds?.process) {
    window.instgrm.Embeds.process()
    return Promise.resolve()
  }

  const existing = document.getElementById(EMBED_SCRIPT_ID)
  if (existing) {
    return new Promise((resolve) => {
      existing.addEventListener('load', () => {
        window.instgrm?.Embeds?.process?.()
        resolve()
      })
      // Script may already be loaded.
      window.setTimeout(() => {
        window.instgrm?.Embeds?.process?.()
        resolve()
      }, 300)
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.id = EMBED_SCRIPT_ID
    script.async = true
    script.src = EMBED_SCRIPT_SRC
    script.onload = () => {
      window.instgrm?.Embeds?.process?.()
      resolve()
    }
    script.onerror = reject
    document.body.appendChild(script)
  })
}

export default function InstagramReels() {
  const ref = useReveal()
  const reels = useMemo(() => getConfiguredReels(), [])

  useEffect(() => {
    if (!reels.length) return undefined

    let cancelled = false
    loadInstagramEmbedScript()
      .then(() => {
        if (cancelled) return
        // Process again after layout paints.
        window.setTimeout(() => window.instgrm?.Embeds?.process?.(), 50)
      })
      .catch(() => {
        console.warn('[instagram] embed script failed to load')
      })

    return () => {
      cancelled = true
    }
  }, [reels])

  return (
    <section id="reels" className="section bg-[rgb(231_235_228_/_0.4)]">
      <div ref={ref} className="container-site reveal">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-label">Instagram</p>
            <h2 className="section-title">{instagramConfig.title}</h2>
            <p className="section-lead">{instagramConfig.lead}</p>
          </div>

          <a
            href={instagramConfig.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            @{instagramConfig.handle}
          </a>
        </div>

        {reels.length ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {reels.map((reel) => (
              <article
                key={reel.id}
                className="card-surface overflow-hidden p-3 sm:p-4"
              >
                <blockquote
                  className="instagram-media !m-0 !min-w-0 !max-w-full"
                  data-instgrm-permalink={reel.permalink}
                  data-instgrm-version="14"
                  style={{
                    background: '#FFF',
                    border: 0,
                    borderRadius: '12px',
                    margin: 0,
                    maxWidth: '100%',
                    minWidth: 0,
                    padding: 0,
                    width: '100%',
                  }}
                >
                  <a href={reel.permalink} target="_blank" rel="noreferrer">
                    View this reel on Instagram
                  </a>
                </blockquote>
              </article>
            ))}
          </div>
        ) : (
          <div className="card-surface mt-10 p-6 sm:p-8">
            <h3 className="font-display text-2xl text-pine-deep">Watch Hostillam on Instagram</h3>
            <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
              Reels from @{instagramConfig.handle} can appear here using Instagram’s official embed —
              no backend needed. Add reel links in{' '}
              <code className="rounded bg-mist px-1.5 py-0.5 text-sm text-pine">src/data/instagram.js</code>
              {' '}and they will show in this section.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={instagramConfig.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                Open Instagram
              </a>
              <a
                href={`${instagramConfig.profileUrl}reels/`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                Browse reels
              </a>
            </div>
          </div>
        )}

        {reels.length ? (
          <div className="mt-8">
            <a
              href={`${instagramConfig.profileUrl}reels/`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              See more reels on Instagram
            </a>
          </div>
        ) : null}
      </div>
    </section>
  )
}
