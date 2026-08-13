import express from 'express'
import cors from 'cors'
import { backendConfig } from './config.js'
import { recordEvent, getEventsForVisitor } from './services/eventService.js'
import {
  captureLeadContact,
  createBookingEnquiry,
  getLeadByVisitor,
  listLeads,
  LEAD_STATUSES,
} from './services/leadService.js'
import {
  fetchInstagramMedia,
  getConfiguredInstagramUsername,
  getInstagramReelsFeed,
  withProxiedMediaUrls,
} from './services/instagramService.js'
import {
  cachedVideoFile,
  hasCachedVideo,
  warmReelVideos,
  withCachedVideoUrls,
} from './services/instagramVideoCache.js'

const app = express()
app.use(cors())
app.use(express.json({ limit: '100kb' }))

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'hostillam-lead-api',
    channels: backendConfig.notificationChannels,
    leadStatuses: LEAD_STATUSES,
    instagramUsername: getConfiguredInstagramUsername(),
  })
})

app.get('/api/instagram/reels', async (req, res) => {
  const username = String(req.query.username || getConfiguredInstagramUsername())
  try {
    const force = String(req.query.refresh || '') === '1'
    const feed = await getInstagramReelsFeed({ username, force })
    // Prefer locally cached mp4s for reliable muted autoplay; proxy remaining CDN URLs.
    const withCache = await withCachedVideoUrls(feed)
    const payload = withProxiedMediaUrls(withCache)
    // Warm missing videos in the background (does not block the response).
    warmReelVideos(feed.reels || [], { limit: 6 })
    res.set('Cache-Control', 'public, max-age=60')
    return res.json(payload)
  } catch (error) {
    console.error('[instagram]', error.message)
    return res.status(502).json({
      error: 'Could not load Instagram reels right now',
      detail: error.message,
      profileUrl: `https://www.instagram.com/${username.replace(/^@/, '')}/`,
      reels: [],
    })
  }
})

app.get('/api/instagram/video/:shortcode', async (req, res) => {
  try {
    const shortcode = String(req.params.shortcode || '').replace(/[^a-zA-Z0-9_-]/g, '')
    if (!shortcode || !(await hasCachedVideo(shortcode))) {
      return res.status(404).json({ error: 'Cached reel video not found' })
    }
    const file = cachedVideoFile(shortcode)
    res.set({
      'Content-Type': 'video/mp4',
      'Cache-Control': 'public, max-age=604800, immutable',
      'Cross-Origin-Resource-Policy': 'cross-origin',
      'Accept-Ranges': 'bytes',
    })
    return res.sendFile(file)
  } catch (error) {
    console.error('[instagram-video]', error.message)
    return res.status(502).json({ error: 'Could not load cached reel video' })
  }
})

app.get('/api/instagram/media', async (req, res) => {
  try {
    const mediaUrl = String(req.query.url || '')
    const { contentType, buffer } = await fetchInstagramMedia(mediaUrl)
    res.set({
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
      'Cross-Origin-Resource-Policy': 'cross-origin',
    })
    return res.send(buffer)
  } catch (error) {
    const status = error.status && Number.isInteger(error.status) ? error.status : 502
    console.error('[instagram-media]', error.message)
    return res.status(status).json({ error: 'Could not load Instagram media' })
  }
})

app.post('/api/events', async (req, res) => {
  try {
    const { visitorId, event } = req.body || {}
    if (!visitorId || !event) {
      return res.status(400).json({ error: 'visitorId and event are required' })
    }
    const saved = await recordEvent(req.body)
    return res.status(201).json({ event: saved })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to record event' })
  }
})

app.get('/api/events/:visitorId', async (req, res) => {
  try {
    const events = await getEventsForVisitor(req.params.visitorId)
    return res.json({ events })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to load events' })
  }
})

app.post('/api/leads/capture', async (req, res) => {
  try {
    const { visitorId, phone } = req.body || {}
    if (!visitorId || !phone) {
      return res.status(400).json({ error: 'visitorId and phone are required' })
    }
    const result = await captureLeadContact(req.body)
    return res.status(201).json(result)
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: error.message || 'Failed to capture lead' })
  }
})

app.post('/api/leads/enquiry', async (req, res) => {
  try {
    const { visitorId, phone, accommodation, guests, checkIn, checkOut } = req.body || {}
    if (!visitorId || !phone || !accommodation || !guests || !checkIn || !checkOut) {
      return res.status(400).json({
        error: 'visitorId, phone, accommodation, guests, checkIn, and checkOut are required',
      })
    }
    const result = await createBookingEnquiry(req.body)
    return res.status(201).json(result)
  } catch (error) {
    console.error(error)
    return res.status(400).json({ error: error.message || 'Failed to create enquiry' })
  }
})

app.get('/api/leads/visitor/:visitorId', async (req, res) => {
  try {
    const lead = await getLeadByVisitor(req.params.visitorId)
    return res.json({ lead })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to load lead' })
  }
})

app.get('/api/leads', async (_req, res) => {
  try {
    const leads = await listLeads()
    return res.json({ leads })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to list leads' })
  }
})

app.listen(backendConfig.port, () => {
  console.log(`Hostillam lead API listening on http://localhost:${backendConfig.port}`)
  // Warm a few autoplayable reel videos for Hostillam + My Magik Place in the background.
  ;(async () => {
    for (const username of ['host.illam', 'mymagikplace']) {
      try {
        const feed = await getInstagramReelsFeed({ username })
        warmReelVideos(feed.reels || [], { limit: 6 })
      } catch (error) {
        console.warn('[instagram-video] startup warm failed', username, error.message)
      }
    }
  })()
})
