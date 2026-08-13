import { galleryImages, getGalleryBySource } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import TrackOnce from './TrackOnce'
import { Events } from '../services/trackingService'
import SectionCta from './SectionCta'
import SafeImage from './SafeImage'

function GalleryGrid({ images, priorityCount = 0 }) {
  return (
    <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
      {images.map((image, index) => (
        <figure
          key={image.id}
          className="mb-4 break-inside-avoid overflow-hidden rounded-[1.2rem] bg-white/5"
        >
          <SafeImage
            src={image.src}
            alt={image.alt}
            className="h-auto w-full object-cover transition duration-500 hover:scale-[1.02]"
            loading={index < priorityCount ? 'eager' : 'lazy'}
            fetchPriority={index < 2 ? 'high' : 'auto'}
          />
        </figure>
      ))}
    </div>
  )
}

export default function Gallery({ variant = 'full', limit, pagePath = '/gallery' }) {
  const ref = useReveal()
  const isPreview = variant === 'preview'
  const hostillam = getGalleryBySource('hostillam')
  const magik = getGalleryBySource('mymagikplace')

  if (isPreview || typeof limit === 'number') {
    const preview = galleryImages.slice(0, typeof limit === 'number' ? limit : 6)
    return (
      <TrackOnce
        as="section"
        id="gallery"
        className="section bg-pine-deep text-white"
        event={Events.GALLERY_OPENED}
        page={pagePath}
      >
        <div ref={ref} className="container-site reveal">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="gallery-label">Gallery</p>
              <h2 className="section-title !text-white">Hostillam & My Magik Place</h2>
              <p className="section-lead !text-white/75">
                High-quality photos from Hostillam and the official My Magik Place campsite.
              </p>
            </div>
            <SectionCta to="/gallery" className="btn btn-secondary">
              View all photos
            </SectionCta>
          </div>
          <GalleryGrid images={preview} priorityCount={2} />
        </div>
      </TrackOnce>
    )
  }

  return (
    <TrackOnce
      as="section"
      id="gallery"
      className="section bg-pine-deep text-white"
      event={Events.GALLERY_OPENED}
      page={pagePath}
    >
      <div ref={ref} className="container-site reveal">
        <div className="max-w-2xl">
          <p className="gallery-label">Gallery</p>
          <h2 className="section-title !text-white">Hostillam & My Magik Place</h2>
          <p className="section-lead !text-white/75">
            A curated photo set from Hostillam Veedu (home) and My Magik Place (camping) —
            kept in separate sections.
          </p>
        </div>

        <div className="mt-12">
          <h3 className="font-display text-2xl text-white sm:text-3xl">Hostillam</h3>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Homestay, forest light, and quiet days around Hostillam Veedu.
          </p>
          <GalleryGrid images={hostillam} priorityCount={3} />
        </div>

        <div className="mt-14">
          <h3 className="font-display text-2xl text-white sm:text-3xl">My Magik Place</h3>
          <p className="mt-2 max-w-2xl text-sm text-white/70">
            Camping photos from the official My Magik Place Instagram.
          </p>
          <GalleryGrid images={magik} priorityCount={2} />
        </div>
      </div>
    </TrackOnce>
  )
}
