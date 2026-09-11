import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { Process } from '@/components/sections/Process'
import { CallToAction } from '@/components/sections/CallToAction'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/ui/FadeIn'
import { JsonLd } from '@/components/seo/JsonLd'
import { createMetadata, breadcrumbJsonLd } from '@/lib/seo'
import { PROCESS_STEPS } from '@/lib/data/process'
import { SITE } from '@/lib/data/site'

export const metadata: Metadata = createMetadata({
  title: 'Our Process',
  description:
    'Six stages from discovery to delivery — written briefs, photoreal visualisation, weekly site reports and a snag-free handover backed by a two-year studio warranty.',
  path: '/process',
  keywords: ['interior design process', 'turnkey project timeline', 'interior project management'],
})

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'The Elite Decore interior design process',
  description:
    'How Elite Decore takes an interior project from first conversation to styled handover.',
  totalTime: 'P7M',
  step: PROCESS_STEPS.map((step, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: step.title,
    text: step.description,
    url: `${SITE.url}/process#step-${step.index}`,
  })),
}

const GUARANTEES = [
  {
    title: 'A date, in writing',
    body: 'Your delivery date is fixed at contract stage with a defined remedy if we miss it. A promise without a consequence is only marketing.',
  },
  {
    title: 'A report every Friday',
    body: 'Photographs, progress against programme, decisions needed from you, and anything that has slipped. Sent whether the news is good or not.',
  },
  {
    title: 'One point of contact',
    body: 'A single project lead from brief to handover. You never explain your project twice, and you never chase a vendor yourself.',
  },
  {
    title: 'Two-year warranty',
    body: 'Every bespoke piece we build is covered for two years, with aftercare visits at three, twelve and twenty-four months.',
  },
]

export default function ProcessPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Process', path: '/process' },
        ])}
      />
      <JsonLd data={howToJsonLd} />

      <PageHero
        eyebrow="How We Work"
        title="A process you can hold us to."
        description="Most interior projects fail on communication rather than design. Ours is engineered so you always know which stage you are in, what is being decided, and what happens next."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Process', href: '/process' },
        ]}
        meta={[
          { label: 'Stages', value: 'Six' },
          { label: 'Typical duration', value: '6 – 8 months' },
          { label: 'Site visits', value: '3 per week' },
          { label: 'Warranty', value: 'Two years' },
        ]}
      />

      <Process />

      <section className="bg-paper-soft py-24 md:py-32" aria-labelledby="guarantees-heading">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Commitments"
            title="Four things we put in the contract."
            as="h2"
            className="max-w-4xl"
          />
          <h2 id="guarantees-heading" className="sr-only">
            Our commitments
          </h2>

          <div className="mt-16 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {GUARANTEES.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="flex flex-col gap-4 border-t border-ink/10 pt-7">
                  <h3 className="font-display text-fluid-lg font-semibold text-ink">{item.title}</h3>
                  <p className="text-fluid-base font-normal leading-relaxed text-ink/65">
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  )
}
