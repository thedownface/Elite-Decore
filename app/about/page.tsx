import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { About } from '@/components/sections/About'
import { MaterialLab } from '@/components/sections/MaterialLab'
import { Testimonials } from '@/components/sections/Testimonials'
import { CallToAction } from '@/components/sections/CallToAction'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RevealImage } from '@/components/ui/RevealImage'
import { FadeIn } from '@/components/ui/FadeIn'
import { JsonLd } from '@/components/seo/JsonLd'
import { createMetadata, breadcrumbJsonLd } from '@/lib/seo'
import { IMG } from '@/lib/images'
import { SITE } from '@/lib/data/site'

export const metadata: Metadata = createMetadata({
  title: 'About the Studio',
  description:
    'Elite Decore is a small in-house interior design studio in Bangalore. Six years, twenty homes, and one conviction: luxury is the absence of anything unconsidered.',
  path: '/about',
  keywords: ['interior design studio Bangalore', 'about Elite Decore', 'luxury design practice'],
})

const PRINCIPLES = [
  {
    index: '01',
    title: 'Material honesty',
    body: 'We do not use finishes that pretend to be other materials. If it looks like stone, it is stone. If the budget cannot carry stone, we design something else honestly rather than imitate it badly.',
  },
  {
    index: '02',
    title: 'Detail before decoration',
    body: 'A shadow gap resolved properly is worth more than any amount of styling. We spend an unusual proportion of our hours on junctions, reveals and thresholds that most people will never consciously notice.',
  },
  {
    index: '03',
    title: 'In-house execution',
    body: 'Detailing, procurement and site supervision stay inside the studio. The gap between a beautiful drawing and a built room is where most interiors quietly fail, and we refuse to outsource that gap.',
  },
  {
    index: '04',
    title: 'A deliberate pace',
    body: 'We cap our intake deliberately. The principal visits every site personally, on a regular schedule, and there are only so many hours in a week. Growth beyond that would cost the thing clients hire us for.',
  },
]

const TEAM = [
  { name: 'Design & Detailing', count: '3', note: 'Interior designers and drafters' },
  { name: 'Site Execution', count: '3', note: 'Carpentry, electrical and on-site supervision' },
  { name: 'Procurement', count: '1', note: 'Vendor sourcing, workshop liaison and QC' },
  { name: 'Client Care', count: '1', note: 'Scheduling, contracts and aftercare' },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      <PageHero
        eyebrow={`Est. ${SITE.founded} · Bangalore`}
        title="A studio built around a single idea."
        description="Elite Decore designs interiors for people who intend to live in them for twenty years. That intention changes every decision we make — which materials we specify, which projects we accept, and how many of them we take on at once."
        image={IMG.aboutStudio}
        imageAlt="A bedroom with a cherry-blossom mural feature wall, delivered by Elite Decore"
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
        ]}
        meta={[
          { label: 'Founded', value: SITE.founded },
          { label: 'Team', value: '8+ people' },
          { label: 'Projects', value: '20+' },
          { label: 'Based in', value: 'Bengaluru' },
        ]}
      />

      <About />

      {/* Principles */}
      <section className="bg-paper-soft py-24 md:py-32" aria-labelledby="principles-heading">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="What We Believe"
            title="Four positions we have never negotiated on."
            as="h2"
            className="max-w-4xl"
          />
          <h2 id="principles-heading" className="sr-only">
            Studio principles
          </h2>

          <ol className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2">
            {PRINCIPLES.map((principle, i) => (
              <FadeIn key={principle.index} delay={i * 0.08}>
                <li className="flex flex-col gap-4 border-t border-ink/10 pt-7">
                  <span className="font-sans text-[0.66rem] tracking-luxe text-gold-700">
                    {principle.index}
                  </span>
                  <h3 className="font-display text-fluid-xl font-semibold leading-tight text-ink">
                    {principle.title}
                  </h3>
                  <p className="text-fluid-base font-normal leading-relaxed text-ink/65">
                    {principle.body}
                  </p>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      {/* Team composition */}
      <section className="bg-paper py-24 md:py-32" aria-labelledby="team-heading">
        <div className="container-luxe grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="The Team"
              title="A small team, one roof."
              description="We have never used a freelance drafting pool or a third-party contractor. Everyone who touches your project is on our payroll and in our studio."
              as="h2"
            />
            <h2 id="team-heading" className="sr-only">
              Our team
            </h2>
          </div>

          <div className="lg:col-span-7">
            <RevealImage
              src={IMG.aboutStudio}
              alt="Bedroom feature wall with cherry-blossom mural and cove-lit ceiling, delivered by Elite Decore"
              className="aspect-[16/10] w-full rounded-arch"
              parallax={7}
              sizes="(max-width: 1024px) 100vw, 55vw"
            />

            <dl className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {TEAM.map((group, i) => (
                <FadeIn key={group.name} delay={i * 0.07}>
                  <div className="flex flex-col gap-2 border-t border-ink/10 pt-5">
                    <dt className="flex items-baseline gap-3">
                      <span className="font-display text-3xl font-semibold text-gold-700">
                        {group.count}
                      </span>
                      <span className="text-sm text-ink/80">{group.name}</span>
                    </dt>
                    <dd className="text-xs font-normal leading-relaxed text-ink/65">
                      {group.note}
                    </dd>
                  </div>
                </FadeIn>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <MaterialLab />
      <Testimonials />
      <CallToAction />
    </>
  )
}
