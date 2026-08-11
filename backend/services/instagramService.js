import fs from 'fs/promises'
import path from 'path'
import { backendConfig } from '../config.js'

const DEFAULT_USERNAME = 'host.illam'
const CACHE_TTL_MS = 30 * 60 * 1000 // normal refresh window
const STALE_TTL_MS = 24 * 60 * 60 * 1000 // keep serving stale data up to 24h on errors
const CACHE_PATH = path.join(backendConfig.dataDir, 'instagram-cache.json')

let memoryCache = {
  fetchedAt: 0,
  username: '',
  payload: null,
}

async function readDiskCache() {
  try {
    const raw = await fs.readFile(CACHE_PATH, 'utf8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

async function writeDiskCache(entry) {
  await fs.mkdir(backendConfig.dataDir, { recursive: true })
  await fs.writeFile(CACHE_PATH, JSON.stringify(entry, null, 2))
}

function pickCaption(node) {
  const edges = node?.edge_media_to_caption?.edges || []
  return edges[0]?.node?.text || ''
}

function mapMedia(node) {
  const shortcode = node.shortcode
  const isReel = node.product_type === 'clips' || (node.is_video && node.__typename === 'GraphVideo')
  return {
    id: node.id || shortcode,
    shortcode,
    permalink: `https://www.instagram.com/${isReel ? 'reel' : 'p'}/${shortcode}/`,
    isVideo: Boolean(node.is_video),
    isReel,
    caption: pickCaption(node),
    thumbnailUrl: node.display_url || node.thumbnail_src || '',
    videoUrl: node.video_url || null,
    timestamp: node.taken_at_timestamp || null,
    likeCount: node.edge_liked_by?.count ?? node.edge_media_preview_like?.count ?? null,
  }
}

function buildPayloadFromProfile(user) {
  const edges = user.edge_owner_to_timeline_media?.edges || []
  const media = edges.map((edge) => mapMedia(edge.node))
  const reels = media.filter((item) => item.isReel || item.isVideo).slice(0, 9)

  return {
    username: user.username,
    fullName: user.full_name || user.username,
    biography: user.biography || '',
    profileUrl: `https://www.instagram.com/${user.username}/`,
    profilePicUrl: user.profile_pic_url_hd || user.profile_pic_url || '',
    followers: user.edge_followed_by?.count ?? null,
    reels,
    fetchedAt: new Date().toISOString(),
    source: 'instagram-web-profile',
  }
}

async function fetchInstagramProfile(username) {
  const url = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(username)}`
  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'application/json',
      'Accept-Language': 'en-US,en;q=0.9',
      Referer: `https://www.instagram.com/${username}/`,
      'X-IG-App-ID': process.env.INSTAGRAM_APP_ID || '936619743392459',
    },
  })

  if (!response.ok) {
    throw new Error(`Instagram profile fetch failed (${response.status})`)
  }

  const data = await response.json()
  const user = data?.data?.user
  if (!user) throw new Error('Instagram user not found')
  return buildPayloadFromProfile(user)
}

function cacheAge(entry) {
  return Date.now() - Number(entry?.fetchedAtMs || 0)
}

export async function getInstagramReelsFeed({ username = DEFAULT_USERNAME, force = false } = {}) {
  const handle = (username || DEFAULT_USERNAME).replace(/^@/, '')
  const disk = await readDiskCache()

  if (
    !force &&
    memoryCache.payload &&
    memoryCache.username === handle &&
    cacheAge(memoryCache) < CACHE_TTL_MS
  ) {
    return { ...memoryCache.payload, cached: true }
  }

  if (!force && disk?.username === handle && cacheAge(disk) < CACHE_TTL_MS && disk.payload) {
    memoryCache = disk
    return { ...disk.payload, cached: true }
  }

  try {
    const payload = await fetchInstagramProfile(handle)
    const entry = {
      fetchedAtMs: Date.now(),
      username: handle,
      payload,
    }
    memoryCache = entry
    await writeDiskCache(entry)
    return { ...payload, cached: false }
  } catch (error) {
    const fallback =
      (memoryCache.username === handle && memoryCache.payload && memoryCache) ||
      (disk?.username === handle && disk.payload && disk) ||
      null

    if (fallback && cacheAge(fallback) < STALE_TTL_MS) {
      return {
        ...fallback.payload,
        cached: true,
        stale: true,
        warning: error.message,
      }
    }

    throw error
  }
}

export function getConfiguredInstagramUsername() {
  return process.env.INSTAGRAM_USERNAME || backendConfig.instagramUsername || DEFAULT_USERNAME
}

const ALLOWED_MEDIA_HOST_SUFFIXES = [
  'cdninstagram.com',
  'fbcdn.net',
  'instagram.com',
]

export function isAllowedInstagramMediaUrl(rawUrl) {
  try {
    const parsed = new URL(String(rawUrl || ''))
    if (parsed.protocol !== 'https:') return false
    const host = parsed.hostname.toLowerCase()
    return ALLOWED_MEDIA_HOST_SUFFIXES.some(
      (suffix) => host === suffix || host.endsWith(`.${suffix}`),
    )
  } catch {
    return false
  }
}

/** Browser-safe URL so Instagram CDN covers are not blocked by CORP. */
export function toProxiedMediaUrl(absoluteUrl) {
  if (!absoluteUrl || !isAllowedInstagramMediaUrl(absoluteUrl)) return absoluteUrl || ''
  return `/api/instagram/media?url=${encodeURIComponent(absoluteUrl)}`
}

export function withProxiedMediaUrls(feed) {
  if (!feed) return feed
  return {
    ...feed,
    profilePicUrl: toProxiedMediaUrl(feed.profilePicUrl),
    reels: (feed.reels || []).map((reel) => ({
      ...reel,
      thumbnailUrl: toProxiedMediaUrl(reel.thumbnailUrl),
      videoUrl: reel.videoUrl ? toProxiedMediaUrl(reel.videoUrl) : null,
    })),
  }
}

export async function fetchInstagramMedia(rawUrl) {
  if (!isAllowedInstagramMediaUrl(rawUrl)) {
    const error = new Error('Unsupported media URL')
    error.status = 400
    throw error
  }

  const response = await fetch(rawUrl, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
      Referer: 'https://www.instagram.com/',
      Origin: 'https://www.instagram.com',
    },
    redirect: 'follow',
  })

  if (!response.ok) {
    const error = new Error(`Instagram media fetch failed (${response.status})`)
    error.status = response.status
    throw error
  }

  const contentType = response.headers.get('content-type') || 'application/octet-stream'
  const buffer = Buffer.from(await response.arrayBuffer())
  return { contentType, buffer }
}

/** Seed cache from a previously saved Instagram API response (useful after rate limits). */
export async function seedInstagramCacheFromRawProfile(rawJson, username = DEFAULT_USERNAME) {
  const user = rawJson?.data?.user
  if (!user) throw new Error('Invalid Instagram profile JSON')
  const payload = buildPayloadFromProfile(user)
  const entry = {
    fetchedAtMs: Date.now(),
    username: username.replace(/^@/, ''),
    payload,
  }
  memoryCache = entry
  await writeDiskCache(entry)
  return payload
}
