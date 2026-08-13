import InstagramReels from './InstagramReels'
import { myMagikPlaceInstagram } from '../data/instagram'

/**
 * My Magik Place Instagram reels for the Camping page.
 * Fetches the official @mymagikplace feed and autoplays muted reels when visible.
 */
export default function MyMagikPlaceReels() {
  return (
    <InstagramReels
      variant="preview"
      limit={3}
      username={myMagikPlaceInstagram.handle}
      sectionId="my-magik-place-reels"
      sectionLabel="My Magik Place"
      title="My Magik Place — Reels"
      lead="See the camping experience, life around the campsite, nature and moments from My Magik Place."
      fallbackLead="See the camping experience, life around the campsite, nature and moments from My Magik Place."
      viewAllTo={myMagikPlaceInstagram.profileUrl}
    />
  )
}
