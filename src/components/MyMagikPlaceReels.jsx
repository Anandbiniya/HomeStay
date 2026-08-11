import InstagramReels from './InstagramReels'
import { myMagikPlaceInstagram } from '../data/instagram'

/**
 * My Magik Place Instagram reels for the Camping page.
 * Loads real posts from @mymagikplace via the backend feed.
 * If Instagram is unavailable, InstagramReels shows a profile CTA — no invented reel URLs.
 */
export default function MyMagikPlaceReels() {
  return (
    <InstagramReels
      variant="preview"
      limit={3}
      username={myMagikPlaceInstagram.handle}
      sectionLabel="Instagram"
      title={myMagikPlaceInstagram.title}
      lead={myMagikPlaceInstagram.lead}
      viewAllTo={myMagikPlaceInstagram.profileUrl}
    />
  )
}
