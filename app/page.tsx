import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { PortfolioScroll } from '@/components/sections/PortfolioScroll'
import { MaterialLab } from '@/components/sections/MaterialLab'
import { Process } from '@/components/sections/Process'
import { Testimonials } from '@/components/sections/Testimonials'
import { CallToAction } from '@/components/sections/CallToAction'
import { JsonLd } from '@/components/seo/JsonLd'
import { createMetadata, faqJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/data/site'

export const metadata: Metadata = createMetadata({
  title: `${SITE.name} — ${SITE.tagline}`,
  description: SITE.description,
  path: '/',
})

const FAQS = [
  {
    q: 'What does Elite Decore charge for interior design?',
    a: 'Design fees are structured either as a percentage of project value or a fixed fee per square foot, agreed in writing after the discovery stage. Turnkey projects are quoted as a single consolidated contract.',
  },
  {
    q: 'How long does a full interior project take?',
    a: 'A typical 3,000–6,000 sq ft residence runs six to eight months from brief to handover. Turnkey villas run nine to fourteen months. We commit to a delivery date in writing at contract stage.',
  },
  {
    q: 'Which cities does the studio work in?',
    a: 'We are based in Bangalore and work across the city and the wider Karnataka region, with site supervision provided by our own project managers rather than third-party contractors.',
  },
  {
    q: 'Do you take on single-room projects?',
    a: 'Yes — kitchens, wardrobes and single bedrooms are frequently our first engagement with a client. We keep our intake small so every site gets a personal visit.',
  },
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQS)} />
      <Hero />
      <About />
      <Services />
      <PortfolioScroll />
      <MaterialLab />
      <Process />
      <Testimonials />
      <CallToAction />
    </>
  )
}
