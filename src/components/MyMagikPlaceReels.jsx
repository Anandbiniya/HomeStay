import InstagramReels from './InstagramReels'
import { myMagikPlaceInstagram } from '../data/instagram'

/**
 * My Magik Place Instagram reels for the Camping page.
 * Uses the official @mymagikplace account. Never invents reel URLs.
 *
 * Instagram CDN video URLs often return 403, so we prefer authentic stills
 * (proxied thumbnails) plus a clear View on Instagram CTA — never blank embeds
 * or fake reel cards.
 */
export default function MyMagikPlaceReels() {
  return (
    <InstagramReels
      variant="preview"
      limit={3}
      username={myMagikPlaceInstagram.handle}
      preferStills
      sectionLabel="My Magik Place"
      title="My Magik Place — Reels"
      lead="See the camping experience, life around the campsite, nature and moments from My Magik Place."
      fallbackLead="See the camping experience, life around the campsite, nature and moments from My Magik Place."
      viewAllTo={myMagikPlaceInstagram.profileUrl}
    />
  )
}
