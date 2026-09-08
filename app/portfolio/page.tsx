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
    'Selected interior work by Elite Decore — modular kitchens, bedroom wardrobes and full-home interiors across Bengaluru.',
  path: '/portfolio',
  keywords: ['interior design portfolio Bangalore', 'modular kitchen projects', 'wardrobe design Bengaluru'],
})

const collectionJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Elite Decore Portfolio',
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
        title="Every project we've shipped, not a curated slice."
        description="Kitchens, wardrobes and full-home interiors from Bengaluru apartments — designed, detailed and supervised in-house. These are the rooms as they were handed over, photographed on site."
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
