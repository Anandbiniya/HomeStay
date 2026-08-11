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
  },
]

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

export const galleryImages = [
  { id: 1, src: gallery1, alt: 'Tent camping under open sky', span: 'tall' },
  { id: 2, src: gallery2, alt: 'Morning light through the trees', span: 'wide' },
  { id: 3, src: gallery3, alt: 'Campfire glow at dusk', span: 'tall' },
  { id: 4, src: gallery4, alt: 'Misty mountain landscape', span: 'normal' },
  { id: 5, src: gallery5, alt: 'Camping under the stars', span: 'tall' },
  { id: 6, src: gallery6, alt: 'Hiking through forest trails', span: 'wide' },
  { id: 7, src: gallery7, alt: 'Quiet woodland path', span: 'normal' },
  { id: 8, src: gallery8, alt: 'Waterfall in the hills', span: 'tall' },
]

export const aboutHighlights = [
  { label: 'Nature first', text: 'Surrounded by greenery, trails, and mountain air.' },
  { label: 'Warm hospitality', text: 'A home that welcomes you like family.' },
  { label: 'Slow living', text: 'Space to rest, reconnect, and simply be.' },
]
