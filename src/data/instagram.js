/**
 * Instagram settings for Hostillam and My Magik Place.
 * Reels are loaded automatically via the backend API where reliable.
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

/**
 * Official My Magik Place Instagram — camping social proof.
 * Do not invent reel URLs; direct visitors to the official profile.
 */
export const myMagikPlaceInstagram = {
  handle: 'mymagikplace',
  profileUrl: 'https://www.instagram.com/mymagikplace/',
  title: 'My Magik Place — Reels',
  lead: 'Watch the latest camping reels from the official My Magik Place Instagram.',
}

/** @deprecated Use myMagikPlaceInstagram */
export const myMagicPlaceInstagram = myMagikPlaceInstagram

export default instagramConfig
