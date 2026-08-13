import SafeImage from './SafeImage'
import { myMagikPlaceInstagram } from '../data/instagram'
import {
  magikLocalReelsStills,
  MY_MAGIK_PLACE_INSTAGRAM_URL,
} from '../data/magikMedia'

/**
 * My Magik Place — Reels (Camping page).
 *
 * Instagram Reel embeds / CDN video URLs are unreliable (often 403 or empty).
 * This section never depends on a live Instagram feed to be visible.
 *
 * It shows authentic local Magik Place stills already in the project, plus a
 * clear View on Instagram CTA to the official account. Stills are photos —
 * not claimed as embedded Reels.
 */
export default function MyMagikPlaceReels() {
  const profileUrl = MY_MAGIK_PLACE_INSTAGRAM_URL || myMagikPlaceInstagram.profileUrl
  const stills = magikLocalReelsStills.slice(0, 3)

  return (
    <section
      id="my-magik-place-reels"
      className="section bg-[rgb(231_235_228_/_0.4)]"
      aria-labelledby="magik-reels-heading"
    >
      <div className="container-site">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="section-label">My Magik Place</p>
            <h2 id="magik-reels-heading" className="section-title">
              My Magik Place — Reels
            </h2>
            <p className="section-lead">
              See the camping experience, life around the campsite, nature and moments from My Magik
              Place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={profileUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
              View on Instagram
            </a>
            <a href={profileUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
              @mymagikplace
            </a>
          </div>
        </div>

        {stills.length ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {stills.map((still) => (
              <a
                key={still.id}
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                className="card-surface group block overflow-hidden transition hover:-translate-y-0.5"
              >
                <div className="relative aspect-[9/14] overflow-hidden bg-[linear-gradient(160deg,#d7e0d4_0%,#b7c7b2_55%,#8fa88a_100%)]">
                  <SafeImage
                    src={still.src}
                    alt={still.alt}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pine-deep/75 to-transparent px-4 py-5 text-sm font-semibold text-white">
                    View on Instagram
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-sm leading-relaxed text-muted">{still.caption}</p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="card-surface mt-10 p-6 sm:p-8">
            <h3 className="font-display text-2xl text-pine-deep">View My Magik Place on Instagram</h3>
            <p className="mt-3 max-w-2xl text-[1.02rem] leading-relaxed text-muted">
              See the camping experience, life around the campsite, nature and moments from My Magik
              Place.
            </p>
            <a href={profileUrl} target="_blank" rel="noreferrer" className="btn btn-primary mt-6">
              View on Instagram
            </a>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href={profileUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
            View on Instagram
          </a>
          <a
            href={`${profileUrl.replace(/\/$/, '')}/reels/`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline"
          >
            See all reels on Instagram
          </a>
          <p className="text-sm text-muted">
            Photos above are authentic My Magik Place stills from this site. Open Instagram to watch
            the latest Reels — we do not embed broken players.
          </p>
        </div>
      </div>
    </section>
  )
}
