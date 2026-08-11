import locationImage from '../assets/images/location.jpg'
import { siteConfig } from '../config/site'
import { useReveal } from '../hooks/useReveal'
import { useLead } from '../context/LeadContext'
import { Events } from '../services/trackingService'

export default function Location() {
  const ref = useReveal()
  const { location, phone, email, social, whatsapp } = siteConfig
  const { requestWhatsAppContact, requestContactHost, trackEvent } = useLead()

  const onMaps = () => {
    trackEvent(Events.LOCATION_CLICKED, {
      page: '/#location',
      data: { target: 'maps' },
    })
  }

  const onWhatsApp = (event) => {
    event.preventDefault()
    requestWhatsAppContact({
      source: 'location',
      message: 'I would like to enquire about a booking.',
    })
  }

  const onPhone = () => {
    trackEvent(Events.CONTACT_CLICKED, {
      page: '/#location',
      data: { channel: 'phone' },
    })
  }

  return (
    <section id="location" className="section bg-[rgb(231_235_228_/_0.45)]">
      <div ref={ref} className="container-site reveal">
        <div className="max-w-2xl">
          <p className="section-label">Location & Contact</p>
          <h2 className="section-title">Find your way to Hostillam</h2>
          <p className="section-lead">
            We are tucked away on Vilpatti Road in Kodaikanal — close to nature, trails, and quiet hill air.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[1.4rem]">
              <img
                src={locationImage}
                alt="Scenic hills near Hostillam in Kodaikanal"
                className="aspect-[16/10] w-full object-cover"
              />
            </div>

            <div className="card-surface p-5 sm:p-6">
              <InfoRow label="Location" value={location.address} />
              <InfoRow
                label="WhatsApp"
                value={
                  <button
                    type="button"
                    onClick={onWhatsApp}
                    className="font-semibold text-pine hover:underline"
                  >
                    {whatsapp.display}
                  </button>
                }
              />
              <InfoRow
                label="Phone"
                value={
                  <a
                    href={`tel:${phone.number}`}
                    onClick={onPhone}
                    className="font-semibold text-pine hover:underline"
                  >
                    {phone.display}
                  </a>
                }
              />
              <InfoRow
                label="Email"
                value={
                  <a
                    href={`mailto:${email}`}
                    onClick={() =>
                      trackEvent(Events.CONTACT_CLICKED, {
                        page: '/#location',
                        data: { channel: 'email' },
                      })
                    }
                    className="font-semibold text-pine hover:underline"
                  >
                    {email}
                  </a>
                }
              />
              {social.instagram ? (
                <InfoRow
                  label="Instagram"
                  value={
                    <a
                      href={social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-pine hover:underline"
                    >
                      @host.illam
                    </a>
                  }
                />
              ) : null}

              <div className="mt-5 flex flex-wrap gap-3">
                <button type="button" onClick={onWhatsApp} className="btn btn-whatsapp">
                  Chat on WhatsApp
                </button>
                <a
                  href={location.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                  onClick={onMaps}
                >
                  Open in Maps
                </a>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => requestContactHost()}
                >
                  Contact Host
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.4rem] border border-pine/10 bg-white shadow-[var(--shadow-card)]">
            <iframe
              title="Hostillam location map"
              src={location.mapEmbedUrl}
              className="h-[28rem] w-full border-0 lg:h-full min-h-[28rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="border-b border-pine/8 py-3 first:pt-0 last:border-b-0 last:pb-0">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-moss">{label}</p>
      <div className="mt-1 text-[0.98rem] leading-relaxed text-ink">{value}</div>
    </div>
  )
}
