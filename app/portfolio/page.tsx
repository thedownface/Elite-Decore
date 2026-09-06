import type { Metadata } from 'next'
import { PageHero } from '@/components/layout/PageHero'
import { PortfolioGrid } from '@/components/sections/PortfolioGrid'
import { CallToAction } from '@/components/sections/CallToAction'
import { JsonLd } from '@/components/seo/JsonLd'
import { createMetadata, breadcrumbJsonLd } from '@/lib/seo'
import { PROJECTS } from '@/lib/data/projects'
import { SITE } from '@/lib/data/site'

export const metadata: Metadata = createMetadata({
  title: 'Portfolio',
  description:
    'Selected interior architecture by Elite Decofe — residences, villas, kitchens, workspaces and hospitality across Mumbai, Pune, Bengaluru, Hyderabad and Goa.',
  path: '/portfolio',
  keywords: ['interior design portfolio', 'luxury interiors India', 'villa interior projects'],
})

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Elite Decofe Portfolio',
  url: `${SITE.url}/portfolio`,
  hasPart: PROJECTS.map((p) => ({
    '@type': 'CreativeWork',
    name: p.title,
    url: `${SITE.url}/portfolio/${p.slug}`,
    image: p.cover,
  })),
}

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
        ])}
      />
      <JsonLd data={collectionJsonLd} />

      <PageHero
        eyebrow="Selected Work"
        title="Two hundred and fifty projects. Eight worth showing you first."
        description="Every project below was designed, detailed and supervised entirely in-house. Photography is un-styled beyond our own handover styling — these are the rooms as they were delivered."
        breadcrumb={[
          { label: 'Home', href: '/' },
          { label: 'Portfolio', href: '/portfolio' },
        ]}
      />

      <section className="bg-paper py-20 md:py-24" aria-label="Project archive">
        <PortfolioGrid />
      </section>

      <CallToAction />
    </>
  )
}
