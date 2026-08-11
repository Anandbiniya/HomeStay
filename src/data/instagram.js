/**
 * Instagram settings for the Hostillam website.
 * Reels are loaded automatically from @host.illam via the backend API.
 */

export const instagramConfig = {
  handle: 'host.illam',
  profileUrl: 'https://www.instagram.com/host.illam/',
  title: 'Hostillam on Instagram',
  lead: 'Latest reels from @host.illam — updated automatically when new videos are posted.',
  /** How many reels to show on the page */
  visibleCount: 6,
  /** Frontend refresh interval while the page stays open */
  refreshIntervalMs: 15 * 60 * 1000,
}

export default instagramConfig
