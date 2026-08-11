import { useReveal } from '../hooks/useReveal'
import { myMagikPlaceInstagram } from '../data/instagram'
import { campingOptions } from '../data/content'

/**
 * Attractive My Magik Place Instagram preview.
 * Does not invent or embed fake Reel URLs — directs visitors to the official profile.
 */
export default function MyMagikPlaceReels() {
  const ref = useReveal()
  const previewImages = campingOptions.map((option) => ({
    src: option.image,
    alt: `${option.name} at My Magik Place`,
  }))

  return (
    <section id="my-magik-place-reels" className="section bg-[rgb(231_235_228_/_0.45)]">
      <div ref={ref} className="container-site reveal">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-label">Instagram</p>
            <h2 className="section-title">{myMagikPlaceInstagram.title}</h2>
            <p className="section-lead">{myMagikPlaceInstagram.lead}</p>
          </div>
          <a
            href={myMagikPlaceInstagram.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            View on Instagram
          </a>
        </div>

        <div className="mt-10 overflow-hidden rounded-[1.6rem] border border-pine/10 bg-white shadow-[var(--shadow-soft)]">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid grid-cols-3 gap-1 bg-pine-deep/5 p-1 sm:gap-1.5 sm:p-1.5">
              {previewImages.map((image) => (
                <a
                  key={image.alt}
                  href={myMagikPlaceInstagram.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="relative aspect-[3/4] overflow-hidden rounded-[0.9rem]"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(19_40_33_/_0.55)_100%)]" />
                </a>
              ))}
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-moss">
                @{myMagikPlaceInstagram.handle}
              </p>
              <h3 className="mt-3 font-display text-[1.85rem] leading-tight text-pine-deep">
                Latest camping reels live on Instagram
              </h3>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
                Open the official My Magik Place profile to watch current reels from the campsite — day
                camping, tent stays, campfires, and riverside moments.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={myMagikPlaceInstagram.profileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp"
                >
                  View on Instagram
                </a>
                <a
                  href={`${myMagikPlaceInstagram.profileUrl}reels/`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  Open Instagram Reels
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
