import { experiences } from '../data/content'
import { useReveal } from '../hooks/useReveal'

export default function Experience() {
  const ref = useReveal()

  return (
    <section id="experience" className="section">
      <div ref={ref} className="container-site reveal">
        <div className="max-w-2xl">
          <p className="section-label">Experience</p>
          <h2 className="section-title">Moments that stay with you</h2>
          <p className="section-lead">
            From quiet mornings to campfire evenings — Hostillam is made of small, memorable experiences.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {experiences.map((item, index) => (
            <article
              key={item.id}
              className={`group relative overflow-hidden rounded-[1.35rem] ${
                index === 0 || index === 3 ? 'sm:col-span-2 lg:col-span-1 xl:col-span-2' : ''
              } ${index === 0 ? 'min-h-[22rem]' : 'min-h-[18rem]'}`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgb(19_40_33_/_0.82)_100%)]" />
              <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
                <h3 className="font-display text-[1.65rem] text-white">{item.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
