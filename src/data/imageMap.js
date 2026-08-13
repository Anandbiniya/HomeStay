/**
 * Real uploaded images from src/Images/ (restored from origin/cursor/hd-gallery-6c93).
 * Web-safe formats only (jpg/jpeg/png/webp). No generated/stock/remote images.
 *
 * For a few Drive photos that exist in src/Images only as HEIC, the already-committed
 * web JPG under src/assets/images/uploads/ (same photo, same Git repo) is used.
 */

/* —— Hostillam home / property —— */
import hostillamHomeSign from '../Images/WhatsApp Image 2026-08-11 at 9.33.07 PM.jpeg'
import hostillamTerraceView from '../Images/IMG_1521.JPG.jpeg'
import hostillamGardenView from '../Images/IMG_1526.JPG.jpeg'
import hostillamStoneHouse from '../Images/IMG_1528.JPG.jpeg'
import hostillamDriveway from '../Images/IMG_1529.JPG.jpeg'
import hostillamStonePath from '../Images/IMG_1530.JPG.jpeg'
import hostillamLivingRoom from '../Images/IMG_1524.JPG.jpeg'
import hostillamGuestRoom from '../Images/IMG_1525.JPG.jpeg'
import hostillamVeeduCottage from '../Images/IMG_4181.JPG'
import hostillamMuralPath from '../Images/IMG_9585.JPG.jpeg'
import hostillamApproachPath from '../Images/IMG_4184.JPG'
import hostillamFlowerValley from '../Images/WhatsApp Image 2026-08-11 at 9.33.04 PM.jpeg'

/* —— Nature / walks —— */
import natureForestWalk from '../Images/IMG_4179.JPG'
import natureMountainViewpoint from '../Images/IMG_4183.JPG'
import natureMistyRoad from '../Images/IMG_9481.JPG.jpeg'
import natureForestPath from '../Images/WhatsApp Image 2026-08-11 at 9.33.09 PM.jpeg'
import natureCanopy from '../Images/IMG_9644.JPG.jpeg'

/* —— Camping / My Magik Place (from src/Images) —— */
import campingAerial from '../Images/IMG_5492.JPEG'
import campingAerialAlt from '../Images/c730d7c2-d48c-4fbc-8693-bc92216ae1b7.jpg'
import campingNightVehicles from '../Images/IMG_5629.JPG.jpeg'
import campingRooftopTent from '../Images/IMG_8024.JPG.jpeg'
import campingRooftopLadder from '../Images/IMG_8023.JPG.jpeg'
import campingCampfireGroup from '../Images/IMG_8025.JPG.jpeg'
import campingFriendsStream from '../Images/IMG_8026.JPG.jpeg'
import campingValleyFire from '../Images/IMG_8027.JPG.jpeg'
import campingBlueTentView from '../Images/WhatsApp Image 2026-08-11 at 9.33.15 PM.jpeg'
import campingFoodShare from '../Images/b8325758-9892-44b0-a008-aa02384acd72.jpg'

/* —— Same Drive photos as HEIC in src/Images; web JPG already in this repo —— */
import campingTentAtv from '../assets/images/uploads/camping/tent-atv.jpg' // IMG_4202
import campingCampsiteFriends from '../assets/images/uploads/camping/campsite-friends.jpg' // IMG_4278
import campingTentView from '../assets/images/uploads/camping/tent-view.jpg' // IMG_4287
import campingCampfireNight from '../assets/images/uploads/camping/campfire-night.jpg' // IMG_4355
import hostillamValleyView from '../assets/images/uploads/hostillam/valley-view.jpg' // IMG_4151
import hostillamOutdoorTumbler from '../assets/images/uploads/hostillam/outdoor-view.jpg' // IMG_3664
import kodaiStreamCrossing from '../assets/images/uploads/kodai/stream-crossing.jpg' // IMG_4318
import kodaiTrailWalk from '../assets/images/uploads/kodai/trail-walk.jpg' // IMG_4186

/** Section → real local image */
export const images = {
  homeHero: hostillamTerraceView,
  about: hostillamHomeSign,
  location: hostillamFlowerValley,
  volunteer: natureForestWalk,
  stayVeedu: hostillamVeeduCottage,
  stayStoneHouse: hostillamStoneHouse,
  stayLiving: hostillamLivingRoom,
  stayGuestRoom: hostillamGuestRoom,
  stayApproach: hostillamApproachPath,
  stayDriveway: hostillamDriveway,
  stayGarden: hostillamGardenView,
  stayMural: hostillamMuralPath,
  stayPath: hostillamStonePath,
  campingHero: campingTentAtv,
  dayCamping: campingCampsiteFriends,
  tentStay: campingTentAtv,
  makeYourOwnPitch: campingBlueTentView,
  campingAerial,
  campingAerialAlt,
  campingNightVehicles,
  campingRooftopTent,
  campingRooftopLadder,
  campingFriendsStream,
  campingValleyFire,
  campfire: campingCampfireGroup,
  campfireNight: campingCampfireNight,
  natureWalks: natureForestWalk,
  outdoorEscapes: natureMountainViewpoint,
  mistyRoad: natureMistyRoad,
  forestPath: natureForestPath,
  canopy: natureCanopy,
  streamCrossing: kodaiStreamCrossing,
  trailWalk: kodaiTrailWalk,
  valleyView: hostillamValleyView,
  food: campingFoodShare,
  community: campingFriendsStream,
  relax: hostillamOutdoorTumbler,
  // Games: no clear uploaded match in src/Images — left unset intentionally
  games: null,
}

export const IMAGE_PATHS = {
  homeHero: 'src/Images/IMG_1521.JPG.jpeg',
  about: 'src/Images/WhatsApp Image 2026-08-11 at 9.33.07 PM.jpeg',
  location: 'src/Images/WhatsApp Image 2026-08-11 at 9.33.04 PM.jpeg',
  volunteer: 'src/Images/IMG_4179.JPG',
  stayVeedu: 'src/Images/IMG_4181.JPG',
  campingHero: 'src/assets/images/uploads/camping/tent-atv.jpg (web copy of src/Images/IMG_4202.HEIC)',
  dayCamping: 'src/assets/images/uploads/camping/campsite-friends.jpg (web copy of Drive IMG_4278)',
  tentStay: 'src/assets/images/uploads/camping/tent-atv.jpg (web copy of src/Images/IMG_4202.HEIC)',
  makeYourOwnPitch: 'src/Images/WhatsApp Image 2026-08-11 at 9.33.15 PM.jpeg',
  campfire: 'src/Images/IMG_8025.JPG.jpeg',
  natureWalks: 'src/Images/IMG_4179.JPG',
  outdoorEscapes: 'src/Images/IMG_4183.JPG',
  food: 'src/Images/b8325758-9892-44b0-a008-aa02384acd72.jpg',
  community: 'src/Images/IMG_8026.JPG.jpeg',
  relax: 'src/assets/images/uploads/hostillam/outdoor-view.jpg (web copy of Drive IMG_3664)',
  games: null,
}
