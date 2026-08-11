import { galleryImages } from '../data/content'
import { useReveal } from '../hooks/useReveal'
import TrackOnce from './TrackOnce'
import { Events } from '../services/trackingService'
import SectionCta from './SectionCta'

export default function Gallery({ variant = 'full', limit, pagePath = '/gallery' }) {
  const ref = useReveal()
  const isPreview = variant === 'preview'
  const images =
    typeof limit === 'number'
      ? galleryImages.slice(0, limit)
      : isPreview
        ? galleryImages.slice(0, 4)
        : galleryImages

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
            <h2 className="section-title !text-white">A glimpse of Hostillam</h2>
            <p className="section-lead !text-white/75">
              Soft light, open skies, forest paths, and the quiet beauty of days spent outdoors.
            </p>
          </div>
          {isPreview ? (
            <SectionCta to="/gallery" className="btn btn-secondary">
              View all photos
            </SectionCta>
          ) : null}
        </div>

        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {images.map((image) => (
            <figure
              key={image.id}
              className="mb-4 break-inside-avoid overflow-hidden rounded-[1.2rem]"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full object-cover transition duration-500 hover:scale-[1.03]"
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </div>
    </TrackOnce>
  )
}
