/**
 * Site content — images come only from real Git uploads (see imageMap.js / src/Images/).
 */
import { images } from './imageMap'

const {
  homeHero,
  about,
  stayVeedu,
  stayStoneHouse,
  stayLiving,
  stayGuestRoom,
  stayApproach,
  stayDriveway,
  stayGarden,
  stayMural,
  stayPath,
  campingHero,
  dayCamping,
  tentStay,
  makeYourOwnPitch,
  campingAerial,
  campingAerialAlt,
  campingNightVehicles,
  campingRooftopTent,
  campingRooftopLadder,
  campingFriendsStream,
  campingValleyFire,
  campfire,
  campfireNight,
  natureWalks,
  outdoorEscapes,
  mistyRoad,
  forestPath,
  canopy,
  streamCrossing,
  trailWalk,
  valleyView,
  food,
  community,
  relax,
  games,
  location,
  volunteer,
} = images

/**
 * Public gallery — Hostillam + camping photos from src/Images (and web copies of HEIC uploads).
 */
export const galleryImages = [
  // Hostillam Veedu / home
  { id: 1, src: stayVeedu, alt: 'Hostillam Veedu cottage with mural', span: 'wide', source: 'hostillam' },
  { id: 2, src: stayStoneHouse, alt: 'Stone house at Hostillam', span: 'wide', source: 'hostillam' },
  { id: 3, src: stayGarden, alt: 'Garden and valley view from Hostillam', span: 'tall', source: 'hostillam' },
  { id: 4, src: stayLiving, alt: 'Living space inside Hostillam Veedu', span: 'wide', source: 'hostillam' },
  { id: 5, src: stayGuestRoom, alt: 'Guest room at Hostillam Veedu', span: 'tall', source: 'hostillam' },
  { id: 6, src: stayDriveway, alt: 'Driveway approach to Hostillam', span: 'wide', source: 'hostillam' },
  { id: 7, src: stayPath, alt: 'Stone path beside Hostillam Veedu', span: 'wide', source: 'hostillam' },
  { id: 8, src: stayApproach, alt: 'Forest approach path to Hostillam', span: 'tall', source: 'hostillam' },
  { id: 9, src: homeHero, alt: 'Terrace view over Hostillam gardens', span: 'wide', source: 'hostillam' },
  { id: 10, src: about, alt: 'HOSTILLAM HOME entrance sign', span: 'tall', source: 'hostillam' },
  { id: 11, src: stayVeedu, alt: 'Hostillam Veedu cottage nestled in greenery', span: 'wide', source: 'hostillam' },
  { id: 12, src: campfire, alt: 'Campfire evening with guests', span: 'tall', source: 'hostillam' },
  { id: 13, src: natureWalks, alt: 'Nature walk near Hostillam', span: 'wide', source: 'hostillam' },
  { id: 14, src: outdoorEscapes, alt: 'Mountain viewpoint near Kodaikanal', span: 'wide', source: 'hostillam' },
  { id: 15, src: stayMural, alt: 'Mural path at Hostillam', span: 'tall', source: 'hostillam' },
  { id: 16, src: mistyRoad, alt: 'Misty forest road near Hostillam', span: 'tall', source: 'hostillam' },
  { id: 17, src: stayLiving, alt: 'Shared living space at Hostillam', span: 'tall', source: 'hostillam' },
  { id: 18, src: stayApproach, alt: 'Path through greenery toward Hostillam', span: 'tall', source: 'hostillam' },
  { id: 19, src: valleyView, alt: 'Valley and hills around Hostillam, Kodaikanal', span: 'wide', source: 'hostillam' },
  { id: 20, src: relax, alt: 'Outdoor tea with valley view at Hostillam', span: 'tall', source: 'hostillam' },
  { id: 21, src: natureWalks, alt: 'Forest nature walk near Kodaikanal', span: 'tall', source: 'hostillam' },
  { id: 22, src: outdoorEscapes, alt: 'Mountain viewpoint on a Kodaikanal nature walk', span: 'tall', source: 'hostillam' },
  { id: 23, src: trailWalk, alt: 'Trail walk through Kodaikanal forest', span: 'tall', source: 'hostillam' },
  { id: 24, src: streamCrossing, alt: 'Stream crossing on a Kodaikanal nature trail', span: 'wide', source: 'hostillam' },
  { id: 25, src: forestPath, alt: 'Leafy forest path near Hostillam', span: 'tall', source: 'hostillam' },
  { id: 26, src: canopy, alt: 'Looking up through the tree canopy', span: 'tall', source: 'hostillam' },
  { id: 27, src: location, alt: 'Flowers and valley view near Hostillam', span: 'wide', source: 'hostillam' },
  { id: 28, src: volunteer, alt: 'Walking into the forest near Hostillam', span: 'tall', source: 'hostillam' },

  // My Magik Place / camping
  { id: 101, src: campingRooftopTent, alt: 'Rooftop tent at the campsite', span: 'tall', source: 'mymagikplace' },
  { id: 102, src: campingFriendsStream, alt: 'Friends by the stream at camp', span: 'tall', source: 'mymagikplace' },
  { id: 103, src: campingRooftopLadder, alt: 'Climbing into a rooftop tent', span: 'tall', source: 'mymagikplace' },
  { id: 104, src: campingAerial, alt: 'Aerial view of the riverside campsite', span: 'tall', source: 'mymagikplace' },
  { id: 106, src: campingHero, alt: 'Tent stay and outdoor adventure at the campsite', span: 'tall', source: 'mymagikplace' },
  { id: 107, src: dayCamping, alt: 'Day camping at the campsite', span: 'tall', source: 'mymagikplace' },
  { id: 108, src: campingValleyFire, alt: 'Campfire in the valley', span: 'tall', source: 'mymagikplace' },
  { id: 109, src: campingAerialAlt, alt: 'Campsite overview from above', span: 'tall', source: 'mymagikplace' },
  { id: 110, src: dayCamping, alt: 'Friends at the My Magik Place campsite', span: 'wide', source: 'mymagikplace' },
  { id: 111, src: tentStay, alt: 'Tent stay and outdoor adventure at the campsite', span: 'tall', source: 'mymagikplace' },
  { id: 112, src: makeYourOwnPitch, alt: 'Blue tent pitched with mountain views', span: 'wide', source: 'mymagikplace' },
  { id: 113, src: campfireNight, alt: 'Campfire night at My Magik Place', span: 'tall', source: 'mymagikplace' },
  { id: 114, src: campingNightVehicles, alt: 'Night camping with vehicles and lights', span: 'wide', source: 'mymagikplace' },
  { id: 115, src: food, alt: 'Sharing food at the campsite', span: 'tall', source: 'mymagikplace' },
]

/** Primary camping hero image — real uploaded campsite photo. */
export const campingHeroImage = campingHero

export function getGalleryBySource(source) {
  return galleryImages.filter((image) => image.source === source)
}

/**
 * All bookable accommodations preserved from the original Hostillam catalogue.
 * Stay page uses Hostillam Veedu only; Camping page uses campingOptions.
 */
export const accommodations = [
  {
    id: 'veedu',
    name: 'Hostillam Veedu',
    type: 'Cottage',
    description:
      'Our earth-toned home nestled in greenery — a peaceful retreat with warm rooms, shared living spaces, and the comfort of a true local stay.',
    capacity: 'Up to 8 guests',
    capacityValue: 8,
    price: '₹4,500',
    priceNote: 'per night',
    image: stayVeedu,
    features: ['Home-cooked meals on request', 'Garden & outdoor spaces', 'Family-friendly'],
    galleryIds: [11, 18, 19, 20, 2, 4],
  },
  {
    id: 'tent',
    name: 'Starlit Tent Stay',
    type: 'Camping',
    description:
      'Sleep under Kodaikanal skies in a comfortable tent setup. Campfires, cool mountain air, and mornings that begin with birdsong.',
    capacity: 'Up to 4 guests',
    capacityValue: 4,
    price: '₹2,200',
    priceNote: 'per night',
    image: tentStay,
    features: ['Campfire evenings', 'Nature immersion', 'Shared wash facilities'],
    galleryIds: [111, 112, 113],
  },
  {
    id: 'room',
    name: 'Garden Room',
    type: 'Private Room',
    description:
      'A quiet private room for couples or solo travellers who want rest, soft light, and easy access to gardens and trails.',
    capacity: 'Up to 2 guests',
    capacityValue: 2,
    price: '₹2,800',
    priceNote: 'per night',
    image: stayGuestRoom,
    features: ['Private space', 'Ideal for couples', 'Breakfast available'],
    galleryIds: [5, 4],
  },
]

/** Homestay offering — Stay page. */
export const hostillamVeedu = accommodations.find((item) => item.id === 'veedu')

const starlitTent = accommodations.find((item) => item.id === 'tent')

/**
 * My Magik Place camping offerings.
 * Tent Stay reuses existing Starlit Tent Stay data (price/features/capacity).
 * Day Camping and Make Your Own Pitch Tent are configurable — prices left unset
 * until the host confirms them (do not invent).
 */
export const campingOptions = [
  {
    id: 'day-camping',
    slug: 'day-camping',
    name: 'Day Camping',
    type: 'Camping',
    siteLabel: 'My Magik Place',
    description:
      'Spend a day at the Hostillam / My Magik Place campsite — riverside nature, outdoor space, and the rhythm of camp life without an overnight stay.',
    capacity: null,
    capacityValue: null,
    price: null,
    priceNote: null,
    priceLabel: 'Ask host for day rates',
    image: dayCamping,
    features: ['Day visit at the campsite', 'Nature immersion', 'Outdoor activities'],
    galleryIds: [110, 104, 102],
  },
  {
    id: 'tent-stay',
    slug: 'tent-stay',
    name: 'Tent Stay',
    type: 'Camping',
    siteLabel: 'My Magik Place',
    description: starlitTent.description,
    capacity: starlitTent.capacity,
    capacityValue: starlitTent.capacityValue,
    price: starlitTent.price,
    priceNote: starlitTent.priceNote,
    priceLabel: null,
    image: tentStay,
    features: [...starlitTent.features],
    galleryIds: [111, 112, 101],
    legacyAccommodationId: 'tent',
  },
  {
    id: 'make-your-own-pitch-tent',
    slug: 'make-your-own-pitch-tent',
    name: 'Make Your Own Pitch Tent',
    type: 'Camping',
    siteLabel: 'My Magik Place',
    description:
      'Bring your own tent and pitch at the My Magik Place campsite — a flexible camping option for travellers who want to stay closer to nature on their own setup.',
    capacity: null,
    capacityValue: null,
    price: null,
    priceNote: null,
    priceLabel: 'Ask host for pitch rates',
    image: makeYourOwnPitch,
    features: ['Bring your own tent', 'Campsite pitch', 'Nature immersion'],
    galleryIds: [112, 110, 113],
  },
]

export function getCampingOptionBySlug(slug) {
  return campingOptions.find((item) => item.slug === slug) || null
}

export function getGalleryByIds(ids = []) {
  const map = new Map(galleryImages.map((image) => [image.id, image]))
  return ids.map((id) => map.get(id)).filter(Boolean)
}

/** Combined list for booking dropdowns that need every option. */
export const bookableOptions = [
  hostillamVeedu,
  ...campingOptions,
].filter(Boolean)

export const experiences = [
  {
    id: 'campfire',
    title: 'Campfire Nights',
    description: 'Gather around the fire, share stories, and watch the stars settle over the hills.',
    image: campfire,
  },
  {
    id: 'nature',
    title: 'Nature Walks',
    description: 'Wander through misty trails, quiet forests, and the soft rhythm of mountain mornings.',
    image: natureWalks,
  },
  {
    id: 'food',
    title: 'Home-Cooked Food',
    description: 'Warm local meals made with care — simple flavours that feel like home.',
    image: food,
  },
  {
    id: 'community',
    title: 'Community',
    description: 'Meet fellow travellers, slow down together, and leave feeling a little more connected.',
    image: community,
  },
  {
    id: 'games',
    title: 'Games & Laughter',
    description: 'Board games, badminton, and easy outdoor play for unhurried afternoons.',
    // Missing uploaded image: Games & Laughter — no appropriate src/Images match
    image: games,
  },
  {
    id: 'relax',
    title: 'Deep Relaxation',
    description: 'Read, meditate, or simply sit still in green outdoor spaces made for pausing.',
    image: relax,
  },
  {
    id: 'outdoor',
    title: 'Outdoor Escapes',
    description: 'Rivers, viewpoints, and scenic day trips — adventure when you want it, calm when you don’t.',
    image: outdoorEscapes,
  },
]

export const aboutHighlights = [
  { label: 'Nature first', text: 'Surrounded by greenery, trails, and mountain air.' },
  { label: 'Warm hospitality', text: 'A home that welcomes you like family.' },
  { label: 'Slow living', text: 'Space to rest, reconnect, and simply be.' },
]
