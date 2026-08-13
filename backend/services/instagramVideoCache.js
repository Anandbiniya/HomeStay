import fs from 'fs/promises'
import path from 'path'
import { backendConfig } from '../config.js'

const videoDir = () => path.join(backendConfig.dataDir, 'instagram-videos')

const warming = new Set()

export function cachedVideoFile(shortcode) {
  const safe = String(shortcode || '').replace(/[^a-zA-Z0-9_-]/g, '')
  if (!safe) return null
  return path.join(videoDir(), `${safe}.mp4`)
}

export async function hasCachedVideo(shortcode) {
  const file = cachedVideoFile(shortcode)
  if (!file) return false
  try {
    const stat = await fs.stat(file)
    return stat.isFile() && stat.size > 1000
  } catch {
    return false
  }
}

export function toCachedVideoUrl(shortcode) {
  const safe = String(shortcode || '').replace(/[^a-zA-Z0-9_-]/g, '')
  if (!safe) return null
  return `/api/instagram/video/${safe}`
}

async function downloadUrlToFile(url, file) {
  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'video/mp4,video/*,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      Referer: 'https://www.instagram.com/',
      Origin: 'https://www.instagram.com',
    },
    redirect: 'follow',
  })
  if (!response.ok) {
    const error = new Error(`Video download failed (${response.status})`)
    error.status = response.status
    throw error
  }
  const buffer = Buffer.from(await response.arrayBuffer())
  if (buffer.length < 1000) {
    throw new Error('Video download too small')
  }
  await fs.mkdir(path.dirname(file), { recursive: true })
  const tmp = `${file}.tmp`
  await fs.writeFile(tmp, buffer)
  await fs.rename(tmp, file)
  return file
}

async function extractVideoUrlViaChrome(shortcode) {
  const chromePath = process.env.CHROME_PATH || '/usr/local/bin/google-chrome'
  let puppeteer
  try {
    puppeteer = await import('puppeteer-core')
  } catch {
    return null
  }

  const browser = await puppeteer.default.launch({
    executablePath: chromePath,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--autoplay-policy=no-user-gesture-required',
    ],
  })

  try {
    const page = await browser.newPage()
    page.setDefaultTimeout(35000)
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    )
    await page.goto(`https://www.instagram.com/reel/${encodeURIComponent(shortcode)}/embed/`, {
      waitUntil: 'networkidle2',
      timeout: 35000,
    })
    await page.waitForSelector('video', { timeout: 25000 }).catch(() => null)
    const src = await page.evaluate(async () => {
      const deadline = Date.now() + 12000
      while (Date.now() < deadline) {
        const video = document.querySelector('video')
        const value = video?.currentSrc || video?.src || ''
        if (value && value.startsWith('http')) return value
        await new Promise((resolve) => setTimeout(resolve, 250))
      }
      return ''
    })
    return src && src.startsWith('http') ? src : null
  } finally {
    await browser.close().catch(() => {})
  }
}

/**
 * Ensure a reel mp4 is cached on disk for reliable muted autoplay.
 * Tries the CDN URL first, then refreshes via Instagram embed + Chrome.
 */
export async function ensureVideoCached(shortcode, cdnUrl) {
  const safe = String(shortcode || '').replace(/[^a-zA-Z0-9_-]/g, '')
  if (!safe) return null
  const file = cachedVideoFile(safe)
  if (await hasCachedVideo(safe)) return file

  if (warming.has(safe)) return null
  warming.add(safe)
  try {
    if (cdnUrl && /^https:\/\//.test(cdnUrl)) {
      try {
        return await downloadUrlToFile(cdnUrl, file)
      } catch (error) {
        console.warn('[instagram-video] CDN download failed', safe, error.message)
      }
    }

    const freshUrl = await extractVideoUrlViaChrome(safe)
    if (!freshUrl) {
      console.warn('[instagram-video] Could not extract embed video URL', safe)
      return null
    }
    return await downloadUrlToFile(freshUrl, file)
  } catch (error) {
    console.warn('[instagram-video] cache failed', safe, error.message)
    return null
  } finally {
    warming.delete(safe)
  }
}

/** Warm a list of reels in the background (limited concurrency). */
export function warmReelVideos(reels = [], { limit = 6 } = {}) {
  const targets = (reels || []).filter((reel) => reel?.shortcode).slice(0, limit)
  ;(async () => {
    for (const reel of targets) {
      const already = await hasCachedVideo(reel.shortcode)
      if (already) continue
      // Prefer unproxied absolute CDN URL if present.
      const cdnUrl =
        typeof reel.videoUrl === 'string' && reel.videoUrl.startsWith('https://')
          ? reel.videoUrl
          : null
      await ensureVideoCached(reel.shortcode, cdnUrl)
    }
  })().catch((error) => {
    console.warn('[instagram-video] warm queue failed', error.message)
  })
}

/** Rewrite feed video URLs to local cached endpoints when available. */
export async function withCachedVideoUrls(feed) {
  if (!feed?.reels?.length) return feed
  const reels = await Promise.all(
    feed.reels.map(async (reel) => {
      if (!reel?.shortcode) return reel
      if (await hasCachedVideo(reel.shortcode)) {
        return {
          ...reel,
          videoUrl: toCachedVideoUrl(reel.shortcode),
          videoCached: true,
        }
      }
      return reel
    }),
  )
  // Prefer locally cached (autoplayable) reels first so previews actually play.
  reels.sort((a, b) => Number(Boolean(b.videoCached)) - Number(Boolean(a.videoCached)))
  return { ...feed, reels }
}
