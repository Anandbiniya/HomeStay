/**
 * Curated Google reviews for Hostillam (Kodaikanal).
 * Source: Google reviews linked from Google Travel / Maps.
 * The UI shows 5 reviews at a time and rotates the set each calendar month.
 */

export const googleReviewsMeta = {
  rating: 4.9,
  totalCount: 221,
  sourceLabel: 'Google reviews',
  sourceUrl:
    'https://www.google.com/travel/search?ts=CAEaKwopEicyJTB4M2IwNzY3ZDkyMTEyZTQ1NzoweDk0YjY1ZTljNGUzZjRiM2Y&qs=CAEyFENnc0l2NWI5OGNUVGw5dVVBUkFCOAI&utm_campaign=sharing&utm_medium=link_btn&utm_source=htls',
}

export const googleReviews = [
  {
    id: 'mujahid-bin-fr',
    author: 'Mujahid Bin FR',
    rating: 5,
    text: 'At Hostillam the experience I had was very great indeed and the scenery was wonderful. The Hostillam owner Mr Savad and his family provided us with hygienic and well prepared dishes. We enjoyed the camping and the campfire. Overall the experience was wonderful.',
  },
  {
    id: 'susheel-krishna',
    author: 'Susheel Krishna',
    rating: 5,
    text: 'We welcomed our New Year at Hostillam, and it couldn’t have been a better choice. The property is beautiful, clean, and very well maintained, with stunning views and a location so calm that there’s absolutely no city noise. Savad is a genuinely warm and caring host.',
  },
  {
    id: 'krithik-kumar',
    author: 'Krithik Kumar',
    rating: 5,
    text: 'Here’s to the best host in the town. You will feel home with amazing food, a compact & cozy stay place with the view of the mountains around. Hop into forest trek and camping sessions and explore the untouched parts of Kodai.',
  },
  {
    id: 'parvez-jamal',
    author: 'Parvez Jamal',
    rating: 5,
    text: 'We stayed in the rooms at Hostillam and had an amazing experience! The rooms were clean, comfortable and well maintained. What made our stay truly special was the owner Sawad — he personally took us to the top of the hill and guided us on a beautiful forest trek.',
  },
  {
    id: 'rohith-virinchi',
    author: 'Rohith Virinchi',
    rating: 5,
    text: 'Beautiful stay with one of the best hosts. Saavad maintained the place very well and took care of all our needs. The stay is at a perfect location, a bit away from the city but also easily accessible. Do consider booking with family or friends.',
  },
  {
    id: 'sagar-das',
    author: 'Sagar Das',
    rating: 5,
    text: 'I had an amazing stay at this beautiful homestay in Kodaikanal! The place is peaceful, clean, and surrounded by stunning views. The rooms were comfortable and gave a warm, homely feeling. The hosts were incredibly friendly and helpful.',
  },
  {
    id: 'sakshi-hemant',
    author: 'Sakshi Hemant',
    rating: 5,
    text: 'We had a wonderful stay at the most amazing location. The view, the campfire, the barbeque, and the homely atmosphere — everything added onto Hostillam being the best stay and giving us great memories. Thanks to the host for making it all beautiful.',
  },
  {
    id: 'sandeep-v',
    author: 'Sandeep V',
    rating: 5,
    text: 'Our experience at Hostillam was nothing short of wonderful. The food was absolutely delightful — simple, homely, and prepared with so much love. The camping site is serene and picturesque, and the trekking left us energised and inspired.',
  },
  {
    id: 'vishnu-kunnath',
    author: 'Vishnu Kunnath',
    rating: 5,
    text: 'An awesome getaway! From start to finish, the customer service was exceptional — they supported us at every step. Perfect spot for anyone needing a chill break from life. Highly recommended.',
  },
  {
    id: 'sagi-snehit',
    author: 'Sagi Snehit',
    rating: 5,
    text: 'The perfect stay away from the main city. The property is well maintained and clean. The host literally took care of anything and everything. Absolutely enjoyed the dinners and the bonfire barbecue. Highly recommend to get closer to nature.',
  },
  {
    id: 'nidhun-krishna',
    author: 'Nidhun Krishna',
    rating: 5,
    text: 'The food served was homely and tasted awesome.. kudos to the hosts!',
  },
  {
    id: 'thoufeeq-maheen',
    author: 'Thoufeeq Maheen',
    rating: 5,
    text: 'Excellent service and wonderful room and location.',
  },
]

const VISIBLE_COUNT = 5

/**
 * Deterministically pick a rotating set of reviews for the current calendar month.
 * Changes automatically when the month changes; stable within the same month.
 */
export function getMonthlyGoogleReviews(date = new Date(), count = VISIBLE_COUNT) {
  const pool = googleReviews
  if (!pool.length) return []

  const monthIndex = date.getFullYear() * 12 + date.getMonth()
  const offset = (monthIndex * count) % pool.length

  return Array.from({ length: Math.min(count, pool.length) }, (_, index) => {
    return pool[(offset + index) % pool.length]
  })
}

export function getReviewsMonthLabel(date = new Date()) {
  return date.toLocaleString('en-IN', { month: 'long', year: 'numeric' })
}
