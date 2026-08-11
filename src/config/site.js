/**
 * Central Hostillam site configuration.
 * Update WhatsApp, contact, location, and socials here only.
 */

export const siteConfig = {
  name: 'Hostillam',
  /** Primary brand mark — use uppercase in main branding. */
  brand: 'HOSTILLAM',
  tagline: 'Hosting Beautiful Minds',
  description:
    'Experience soulful stays and serene camping amidst nature, in the warmth of a home that welcomes everyone.',

  whatsapp: {
    /** Digits only, with country code. Used for wa.me links. */
    number: '919747232233',
    /** Display format for UI */
    display: '+91 97472 32233',
  },

  phone: {
    number: '+919747232233',
    display: '+91 97472 32233',
  },

  email: 'hello@hostillam.com',

  location: {
    label: 'Vilpatti Road, Kodaikanal',
    address: 'Vilpatti Road, Kodaikānāl, Tamil Nadu 624102, India',
    short: 'Kodaikanal, Tamil Nadu',
    mapEmbedUrl:
      'https://www.google.com/maps?q=Vilpatti+Road,+Kodaikanal,+Tamil+Nadu+624102&output=embed',
    mapLink:
      'https://www.google.com/maps/search/?api=1&query=Vilpatti+Road+Kodaikanal+Tamil+Nadu+624102',
  },

  social: {
    instagram: 'https://www.instagram.com/host.illam/',
    facebook: '',
  },

  /** Minimal primary navbar destinations. */
  primaryNav: [
    { label: 'Stay', href: '/stay' },
    { label: 'Experience', href: '/experience' },
    { label: 'Volunteer', href: '/volunteer' },
    { label: 'About', href: '/about' },
  ],

  /** Footer Explore column. */
  footerExplore: [
    { label: 'Stay', href: '/stay' },
    { label: 'Experience', href: '/experience' },
    { label: 'Volunteer', href: '/volunteer' },
    { label: 'About', href: '/about' },
  ],

  /** Footer Discover column — secondary but still fully accessible. */
  footerDiscover: [
    { label: 'Gallery', href: '/gallery' },
    { label: 'Reels', href: '/reels' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Location', href: '/location' },
  ],

  /**
   * @deprecated Prefer primaryNav / footerExplore / footerDiscover.
   * Kept as a combined list for any leftover consumers.
   */
  get nav() {
    return [...this.primaryNav, ...this.footerDiscover]
  },
}

export default siteConfig
