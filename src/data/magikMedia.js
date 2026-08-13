/**
 * Authentic My Magik Place local stills for Camping media.
 * Sourced from files already in src/assets/images/camping/ (see SOURCES.json).
 * Never invent Instagram CDN URLs here.
 */
import magikCampingHero from '../assets/images/camping/magik-1.jpg'
import magikFriendsNature from '../assets/images/camping/magik-2.jpg'
import magikTentMorning from '../assets/images/camping/magik-3.jpg'
import magikNatureWalk from '../assets/images/camping/magik-4.jpg'
import magikAtvNature from '../assets/images/camping/magik-6.jpg'

export const MY_MAGIK_PLACE_INSTAGRAM_URL = 'https://www.instagram.com/mymagikplace/'

/** Product heroes — mapped 1:1 to camping options. */
export const magikProductImages = {
  dayCamping: magikNatureWalk,
  tentStay: magikCampingHero,
  makeYourOwnPitch: magikFriendsNature,
}

/**
 * Local stills for the Camping “My Magik Place — Reels” section.
 * These are real campsite photos, not fake reel embeds or invented thumbnails.
 */
export const magikLocalReelsStills = [
  {
    id: 'magik-tree-tent',
    src: magikCampingHero,
    alt: 'Tree tent at My Magik Place campsite',
    caption: 'Tent stay under the trees at My Magik Place.',
  },
  {
    id: 'magik-campsite-pitch',
    src: magikFriendsNature,
    alt: 'Campsite pitch and fire circle at My Magik Place',
    caption: 'Campsite life — pitch, fire circle, and outdoor space.',
  },
  {
    id: 'magik-nature-day',
    src: magikNatureWalk,
    alt: 'Nature day at My Magik Place',
    caption: 'Day camping and nature moments around the campsite.',
  },
]

/** Extra Magik stills available for galleries (logo graphic magik-5 excluded). */
export const magikGalleryExtras = {
  morningTent: magikTentMorning,
  outdoorAdventure: magikAtvNature,
}
