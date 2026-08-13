import stayCottage from '../assets/images/stay-cottage.jpg'
import stayTent from '../assets/images/stay-tent.jpg'
import stayRoom from '../assets/images/stay-room.jpg'
import expCampfire from '../assets/images/exp-campfire.jpg'
import expNature from '../assets/images/exp-nature.jpg'
import expFood from '../assets/images/exp-food.jpg'
import expCommunity from '../assets/images/exp-community.jpg'
import expGames from '../assets/images/exp-games.jpg'
import expRelax from '../assets/images/exp-relax.jpg'
import expOutdoor from '../assets/images/exp-outdoor.jpg'
import gallery1 from '../assets/images/gallery-1.jpg'
import gallery2 from '../assets/images/gallery-2.jpg'
import gallery3 from '../assets/images/gallery-3.jpg'
import gallery4 from '../assets/images/gallery-4.jpg'
import gallery5 from '../assets/images/gallery-5.jpg'
import gallery6 from '../assets/images/gallery-6.jpg'
import gallery7 from '../assets/images/gallery-7.jpg'
import gallery8 from '../assets/images/gallery-8.jpg'
import aboutImage from '../assets/images/about.jpg'
import heroImage from '../assets/images/hero.jpg'
import hdHostSolo from '../assets/images/gallery-hd/hd-host-solo-trip-DblDkDSgWkF.jpg'
import hdMagikFriends from '../assets/images/gallery-hd/hd-magik-friends-nature-Dar8y0JkUUa.jpg'
import hdHostMorning from '../assets/images/gallery-hd/hd-host-morning-tent-DbcQ-WXgyeH.jpg'
import hdMagikTreeTent from '../assets/images/gallery-hd/hd-magik-tree-tent-Cnqr7EDAOLU.jpg'
import hdHostKalyani from '../assets/images/gallery-hd/hd-host-kalyani-DbTWFbng1UW.jpg'
import hdMagikHidden from '../assets/images/gallery-hd/hd-magik-hidden-spots-DbiZEgmgMZQ.jpg'
import hdMagikAtv from '../assets/images/gallery-hd/hd-magik-atv-DbvUqVVATqi.jpg'
/** Official @mymagikplace camping stills (see data/magikMedia.js + camping/SOURCES.json). */
import { magikProductImages, magikGalleryExtras } from './magikMedia'

// magik-5.jpg is a Magik Place logo graphic — kept in assets, not used as a product photo.
const magikCampingHero = magikProductImages.tentStay
const magikFriendsNature = magikProductImages.makeYourOwnPitch
const magikNatureWalk = magikProductImages.dayCamping
const magikTentMorning = magikGalleryExtras.morningTent
const magikAtvNature = magikGalleryExtras.outdoorAdventure

/**
 * Public gallery — Hostillam website photos + HD My Magik Place / Hostillam Instagram stills.
 * Only higher-quality assets are included (prefer 1080px+ / larger file sizes).
 */
export const galleryImages = [
  // Hostillam website gallery (already high-resolution site photos)
  { id: 1, src: gallery1, alt: 'Tent camping under open sky at Hostillam', span: 'wide', source: 'hostillam' },
  { id: 2, src: gallery2, alt: 'Morning light through the trees at Hostillam', span: 'wide', source: 'hostillam' },
  { id: 3, src: gallery3, alt: 'Campfire glow at dusk', span: 'tall', source: 'hostillam' },
  { id: 4, src: gallery4, alt: 'Misty mountain landscape near Hostillam', span: 'wide', source: 'hostillam' },
  { id: 5, src: gallery5, alt: 'Camping under the stars', span: 'tall', source: 'hostillam' },
  { id: 6, src: gallery6, alt: 'Hiking through forest trails', span: 'wide', source: 'hostillam' },
  { id: 7, src: gallery7, alt: 'Quiet woodland path', span: 'wide', source: 'hostillam' },
  { id: 8, src: gallery8, alt: 'Waterfall in the hills', span: 'tall', source: 'hostillam' },
  { id: 9, src: heroImage, alt: 'Looking out from a Hostillam tent into the forest', span: 'wide', source: 'hostillam' },
  { id: 10, src: aboutImage, alt: 'Soft hills around Hostillam', span: 'wide', source: 'hostillam' },
  { id: 11, src: stayCottage, alt: 'Hostillam Veedu cottage', span: 'wide', source: 'hostillam' },
  { id: 12, src: expCampfire, alt: 'Campfire evening at Hostillam', span: 'tall', source: 'hostillam' },
  { id: 13, src: expNature, alt: 'Nature around Hostillam', span: 'wide', source: 'hostillam' },
  { id: 14, src: expOutdoor, alt: 'Outdoor day at Hostillam', span: 'wide', source: 'hostillam' },
  { id: 15, src: hdHostSolo, alt: 'Guest moments from @host.illam', span: 'tall', source: 'hostillam' },
  { id: 16, src: hdHostMorning, alt: 'Morning tent stay from @host.illam', span: 'tall', source: 'hostillam' },
  { id: 17, src: hdHostKalyani, alt: 'Work-from-mountain stay with Hostillam', span: 'tall', source: 'hostillam' },

  // My Magik Place HD Instagram stills (authentic campsite photos only — no logos)
  { id: 101, src: hdMagikTreeTent, alt: 'Tree tent at My Magik Place', span: 'tall', source: 'mymagikplace' },
  { id: 102, src: hdMagikFriends, alt: 'Friends and nature at My Magik Place', span: 'tall', source: 'mymagikplace' },
  { id: 103, src: magikTentMorning, alt: 'Morning inside a tent at My Magik Place', span: 'tall', source: 'mymagikplace' },
  { id: 104, src: hdMagikHidden, alt: 'Hidden spots and river walks at My Magik Place', span: 'tall', source: 'mymagikplace' },
  { id: 106, src: hdMagikAtv, alt: 'Outdoor adventure at My Magik Place', span: 'tall', source: 'mymagikplace' },
  { id: 107, src: magikNatureWalk, alt: 'Nature walk / day at My Magik Place', span: 'tall', source: 'mymagikplace' },
  { id: 108, src: magikAtvNature, alt: 'Campsite outdoor moments at My Magik Place', span: 'tall', source: 'mymagikplace' },
  { id: 109, src: magikCampingHero, alt: 'Tree tent campsite at My Magik Place', span: 'tall', source: 'mymagikplace' },
]

/** Primary camping hero image from @mymagikplace Instagram. */
export const campingHeroImage = magikCampingHero

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
    image: stayCottage,
    features: ['Home-cooked meals on request', 'Garden & outdoor spaces', 'Family-friendly'],
    // Hostillam Veedu only — cottage + official @host.illam stills (no Magik camping)
    galleryIds: [11, 15, 17, 16, 10, 9],
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
    image: stayTent,
    features: ['Campfire evenings', 'Nature immersion', 'Shared wash facilities'],
    galleryIds: [1, 3, 5],
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
    image: stayRoom,
    features: ['Private space', 'Ideal for couples', 'Breakfast available'],
    galleryIds: [2, 7],
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
    // Day outdoors / nature walk — not overnight tent or Veedu rooms
    image: magikNatureWalk,
    features: ['Day visit at the campsite', 'Nature immersion', 'Outdoor activities'],
    galleryIds: [107, 104, 106],
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
    // Tree tent / campsite overnight — Magik Place, not Hostillam Veedu
    image: magikCampingHero,
    features: [...starlitTent.features],
    // Tree tent heroes + outdoor Magik still (avoid Hostillam Veedu room shots)
    galleryIds: [109, 101, 108],
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
    // Campsite / pitch atmosphere — Magik Place, not Veedu rooms
    image: magikFriendsNature,
    features: ['Bring your own tent', 'Campsite pitch', 'Nature immersion'],
    galleryIds: [102, 108, 104],
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
    image: expCampfire,
  },
  {
    id: 'nature',
    title: 'Nature Walks',
    description: 'Wander through misty trails, quiet forests, and the soft rhythm of mountain mornings.',
    image: expNature,
  },
  {
    id: 'food',
    title: 'Home-Cooked Food',
    description: 'Warm local meals made with care — simple flavours that feel like home.',
    image: expFood,
  },
  {
    id: 'community',
    title: 'Community',
    description: 'Meet fellow travellers, slow down together, and leave feeling a little more connected.',
    image: expCommunity,
  },
  {
    id: 'games',
    title: 'Games & Laughter',
    description: 'Board games, badminton, and easy outdoor play for unhurried afternoons.',
    image: expGames,
  },
  {
    id: 'relax',
    title: 'Deep Relaxation',
    description: 'Read, meditate, or simply sit still in green outdoor spaces made for pausing.',
    image: expRelax,
  },
  {
    id: 'outdoor',
    title: 'Outdoor Escapes',
    description: 'Rivers, viewpoints, and scenic day trips — adventure when you want it, calm when you don’t.',
    image: expOutdoor,
  },
]

export const aboutHighlights = [
  { label: 'Nature first', text: 'Surrounded by greenery, trails, and mountain air.' },
  { label: 'Warm hospitality', text: 'A home that welcomes you like family.' },
  { label: 'Slow living', text: 'Space to rest, reconnect, and simply be.' },
]
