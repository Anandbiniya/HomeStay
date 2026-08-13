/**
 * Canonical image map — ONLY files that already exist under src/assets/images/.
 * There is no src/Images/ folder in this repo; all real media lives here.
 *
 * Rules:
 * - Prefer uploads/ (host Drive photos committed to Git)
 * - Then camping/magik-* and gallery-hd/* already in Git
 * - Keep original paths intact; do not invent URLs or generate images
 */

import heroFallback from '../assets/images/hero.jpg'
import aboutFallback from '../assets/images/about.jpg'
import locationFallback from '../assets/images/location.jpg'
import volunteerFallback from '../assets/images/exp-outdoor.jpg'
import stayCottageFallback from '../assets/images/stay-cottage.jpg'
import expCampfireFallback from '../assets/images/exp-campfire.jpg'
import expNatureFallback from '../assets/images/exp-nature.jpg'
import expCommunityFallback from '../assets/images/exp-community.jpg'
import expRelaxFallback from '../assets/images/exp-relax.jpg'
import expOutdoorFallback from '../assets/images/exp-outdoor.jpg'

import hostillamVeeduCottage from '../assets/images/uploads/hostillam/veedu-cottage.jpg'
import hostillamApproachPath from '../assets/images/uploads/hostillam/approach-path.jpg'
import hostillamValleyView from '../assets/images/uploads/hostillam/valley-view.jpg'
import hostillamOutdoorView from '../assets/images/uploads/hostillam/outdoor-view.jpg'
import campingCampsiteFriends from '../assets/images/uploads/camping/campsite-friends.jpg'
import campingTentAtv from '../assets/images/uploads/camping/tent-atv.jpg'
import campingTentView from '../assets/images/uploads/camping/tent-view.jpg'
import campingCampfireNight from '../assets/images/uploads/camping/campfire-night.jpg'
import kodaiForestWalk from '../assets/images/uploads/kodai/forest-walk.jpg'
import kodaiMountainViewpoint from '../assets/images/uploads/kodai/mountain-viewpoint.jpg'
import kodaiTrailWalk from '../assets/images/uploads/kodai/trail-walk.jpg'
import kodaiStreamCrossing from '../assets/images/uploads/kodai/stream-crossing.jpg'

export {
  hostillamVeeduCottage,
  hostillamApproachPath,
  hostillamValleyView,
  hostillamOutdoorView,
  campingCampsiteFriends,
  campingTentAtv,
  campingTentView,
  campingCampfireNight,
  kodaiForestWalk,
  kodaiMountainViewpoint,
  kodaiTrailWalk,
  kodaiStreamCrossing,
}

/** Resolved section images: uploaded Git photos first, existing project assets as fallback. */
export const images = {
  homeHero: hostillamValleyView || heroFallback,
  about: hostillamValleyView || aboutFallback,
  location: hostillamValleyView || locationFallback,
  volunteer: kodaiTrailWalk || volunteerFallback,
  stayVeedu: hostillamVeeduCottage || stayCottageFallback,
  campingHero: campingTentAtv,
  dayCamping: campingCampsiteFriends,
  tentStay: campingTentAtv,
  makeYourOwnPitch: campingTentView,
  campfire: campingCampfireNight || expCampfireFallback,
  natureWalks: kodaiForestWalk || expNatureFallback,
  community: campingCampsiteFriends || expCommunityFallback,
  relax: hostillamOutdoorView || expRelaxFallback,
  outdoorEscapes: kodaiMountainViewpoint || expOutdoorFallback,
  stayGallery: [
    hostillamVeeduCottage,
    hostillamApproachPath,
    hostillamValleyView,
    hostillamOutdoorView,
  ],
}

/** Relative paths under src/assets/images/ (documentation / audit). */
export const IMAGE_PATHS = {
  homeHero: 'uploads/hostillam/valley-view.jpg',
  about: 'uploads/hostillam/valley-view.jpg',
  stayVeedu: 'uploads/hostillam/veedu-cottage.jpg',
  stayGallery: [
    'uploads/hostillam/veedu-cottage.jpg',
    'uploads/hostillam/approach-path.jpg',
    'uploads/hostillam/valley-view.jpg',
    'uploads/hostillam/outdoor-view.jpg',
  ],
  campingHero: 'uploads/camping/tent-atv.jpg',
  dayCamping: 'uploads/camping/campsite-friends.jpg',
  tentStay: 'uploads/camping/tent-atv.jpg',
  makeYourOwnPitch: 'uploads/camping/tent-view.jpg',
  campfire: 'uploads/camping/campfire-night.jpg',
  natureWalks: 'uploads/kodai/forest-walk.jpg',
  outdoorEscapes: 'uploads/kodai/mountain-viewpoint.jpg',
  relax: 'uploads/hostillam/outdoor-view.jpg',
  location: 'uploads/hostillam/valley-view.jpg',
  volunteer: 'uploads/kodai/trail-walk.jpg',
}
