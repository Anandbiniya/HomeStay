/**
 * Instagram Reels shown on the Hostillam website.
 *
 * Instagram does not allow a normal website to auto-read your full feed
 * without a backend or a third-party widget.
 *
 * No-backend approach used here:
 * 1. Copy a Reel link from Instagram (Share → Copy link)
 * 2. Paste it into the `reels` list below
 * 3. Save — the website embeds it with Instagram’s official embed script
 *
 * Tip: put the newest reels first. About 3–6 reels looks best.
 */

export const instagramConfig = {
  handle: 'host.illam',
  profileUrl: 'https://www.instagram.com/host.illam/',
  title: 'Hostillam on Instagram',
  lead: 'Moments from the hills — campfires, stays, and slow days at Hostillam.',

  /**
   * Paste full Instagram Reel URLs here.
   * Example format:
   * https://www.instagram.com/reel/XXXXXXXXXXX/
   */
  reels: [
    // Add your reel links below, newest first:
    // 'https://www.instagram.com/reel/REPLACE_WITH_REEL_ID/',
  ],
}

/**
 * Normalize Instagram share URLs into a clean reel/permalink URL.
 */
export function normalizeInstagramUrl(url) {
  if (!url) return null
  try {
    const parsed = new URL(url.trim())
    if (!/instagram\.com$/i.test(parsed.hostname.replace(/^www\./, '')) &&
        !/instagram\.com$/i.test(parsed.hostname)) {
      // allow www.instagram.com and instagram.com
      if (!parsed.hostname.includes('instagram.com')) return null
    }
    const match = parsed.pathname.match(/\/(reel|reels|p|tv)\/([A-Za-z0-9_-]+)/i)
    if (!match) return null
    const type = match[1].toLowerCase() === 'reels' ? 'reel' : match[1].toLowerCase()
    return `https://www.instagram.com/${type}/${match[2]}/`
  } catch {
    return null
  }
}

export function getConfiguredReels() {
  return (instagramConfig.reels || [])
    .map((url, index) => {
      const permalink = normalizeInstagramUrl(url)
      if (!permalink) return null
      return {
        id: `reel-${index}-${permalink}`,
        permalink,
      }
    })
    .filter(Boolean)
}
