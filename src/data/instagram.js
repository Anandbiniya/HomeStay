/**
 * Instagram settings for Hostillam and My Magic Place.
 * Reels are loaded automatically via the backend API.
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

/** My Magic Place camping Instagram — used on the Camping page. */
export const myMagicPlaceInstagram = {
  handle: 'mymagikplace',
  profileUrl: 'https://www.instagram.com/mymagikplace/',
  title: 'See My Magic Place',
  lead: 'Reels from @mymagikplace — the Hostillam camping experience.',
  visibleCount: 6,
}

export default instagramConfig
