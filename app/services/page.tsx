import type { Metadata } from 'next'
import Image from 'next/image'
import { PageHero } from '@/components/layout/PageHero'
import { Services } from '@/components/sections/Services'
import { Process } from '@/components/sections/Process'
import { CallToAction } from '@/components/sections/CallToAction'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { JsonLd } from '@/components/seo/JsonLd'
import { createMetadata, breadcrumbJsonLd, serviceJsonLd, faqJsonLd } from '@/lib/seo'
import { SERVICES } from '@/lib/data/services'
import { IMG } from '@/lib/images'

export const metadata: Metadata = createMetadata({
  title: 'Services',
  description:
    'Residential interiors, luxury villas, modular kitchens, workspaces, hospitality and turnkey delivery — six disciplines held to one standard of finish.',
  path: '/services',
  keywords: [
    'residential interior design',
    'villa interior designers',
    'modular kitchen design',
    'office interior design',
    'hospitality interior design',
    'turnkey interior contractor',
  ],
})

const ENGAGEMENTS = [
  {
    title: 'Design Only',
    price: 'Quoted after discovery',
    body: 'Full drawings, material specification and vendor tendering. You appoint and manage the contractor; we remain available for site queries.',
    points: ['Concept to working drawings', 'Material & FF&E specification', 'Tender documentation', 'Fortnightly site reviews'],
  },
  {
    title: 'Design & Supervision',
    price: 'From ₹1,100 / sq ft',
    body: 'Everything above, plus our project managers on site three times a week and a written progress report in your inbox every Friday.',
    points: ['All design deliverables', 'Weekly site supervision', 'Vendor coordination', 'Snag management'],
    featured: true,
  },
  {
    title: 'Turnkey',
    price: 'Quoted per project',
    body: 'One contract covering design, procurement, execution and styling. You receive keys to a finished, furnished and photographed home.',
    points: ['Single-point accountability', 'Fixed delivery date', 'Full FF&E procurement', 'Styled handover'],
  },
]

const FAQS = [
  {
    q: 'Do you work outside Bangalore?',
    a: 'Yes. We deliver projects beyond Bangalore across Karnataka and neighbouring states, supervised by our own project managers who travel to site rather than by local subcontractors.',
  },
  {
    q: 'Can you work with our existing architect?',
    a: 'Frequently, and gladly. On villa projects we prefer to be appointed at the massing stage so the interior and the architecture resolve together rather than in sequence.',
  },
  {
    q: 'What is the minimum project size?',
    a: 'There is no fixed minimum. Single kitchens and primary suites are common first engagements. What matters is that the brief has room for considered detailing.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
      {SERVICES.map((service) => (
        <JsonLd key={service.id} data={serviceJsonLd(service)} />
      ))}
      <JsonLd data={faqJsonLd(FAQS)} />

      <PageHero
        eyebrow="Studio Services"
        title="What we do, and how deeply we do it."
        description="Six disciplines, three levels of engagement, and one non-negotiable: the drawings are held to the same tolerance whether we are detailing a kitchen or delivering a hotel."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
        ]}
      />

      <Services />

      {/* Engagement models */}
      <section className="bg-paper py-24 md:py-32" aria-labelledby="engagement-heading">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Engagement"
            title="Three ways to work with the studio."
            description="Indicative rates for a residential project. Every proposal is priced properly after the discovery stage — we have never issued a quote before understanding the brief."
            as="h2"
            className="max-w-4xl"
          />
          <h2 id="engagement-heading" className="sr-only">
            Engagement models
          </h2>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {ENGAGEMENTS.map((tier, i) => (
              <FadeIn key={tier.title} delay={i * 0.09}>
                <div
                  className={`flex h-full flex-col gap-7 rounded-arch p-8 transition-transform duration-700 ease-expo hover:-translate-y-2 md:p-10 ${
                    tier.featured
                      ? 'glass shadow-card ring-1 ring-gold-500/25'
                      : 'border border-ink/10'
                  }`}
                >
                  <div className="flex flex-col gap-2">
                    {tier.featured && (
                      <span className="w-fit rounded-pill bg-gold-500/20 px-3 py-1 text-[0.58rem] uppercase tracking-luxe text-gold-700">
                        Most chosen
                      </span>
                    )}
                    <h3 className="font-display text-fluid-xl font-semibold text-ink">
                      {tier.title}
                    </h3>
                    <p className="text-[0.66rem] uppercase tracking-luxe text-gold-700">
                      {tier.price}
                    </p>
                  </div>

                  <p className="text-sm font-normal leading-relaxed text-ink/65">{tier.body}</p>

                  <ul className="mt-auto flex flex-col gap-3 border-t border-ink/10 pt-6">
                    {tier.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-ink/70">
                        <span aria-hidden className="mt-[0.45em] h-px w-4 shrink-0 bg-gold-500/70" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <MagneticButton className="w-fit">
                    <Button
                      href="/contact"
                      variant={tier.featured ? 'primary' : 'outline'}
                      size="sm"
                    >
                      Enquire
                    </Button>
                  </MagneticButton>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Process />

      {/* FAQ */}
      <section className="bg-paper-soft py-24 md:py-32" aria-labelledby="faq-heading">
        <div className="container-luxe grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Questions" title="Answered plainly." as="h2" />
            <h2 id="faq-heading" className="sr-only">
              Frequently asked questions
            </h2>
            <div className="relative mt-10 aspect-[4/3] overflow-hidden rounded-arch">
              <Image
                src={IMG.serviceTurnkey}
                alt="A completed turnkey interior on handover day"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </div>

          <dl className="lg:col-span-7">
            {FAQS.map((faq, i) => (
              <FadeIn key={faq.q} delay={i * 0.08}>
                <div className="border-b border-ink/10 py-8 first:border-t">
                  <dt className="font-display text-fluid-lg font-semibold leading-snug text-ink">
                    {faq.q}
                  </dt>
                  <dd className="mt-4 max-w-xl text-fluid-base font-normal leading-relaxed text-ink/65">
                    {faq.a}
                  </dd>
                </div>
              </FadeIn>
            ))}
          </dl>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
