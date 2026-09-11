import type { Metadata } from 'next'
import { SITE } from '@/lib/data/site'

type SeoInput = {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  keywords?: string[]
}

const DEFAULT_KEYWORDS = [
  'luxury interior design',
  'interior designers Bangalore',
  'bespoke interiors',
  'villa interior design',
  'turnkey interior projects',
  'modular kitchen design',
  'hospitality interior design',
  'Elite Decore',
]

export function createMetadata({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  publishedTime,
  keywords = [],
}: SeoInput): Metadata {
  const url = `${SITE.url}${path}`

  // Only override the generated OG card when a page supplies its own artwork —
  // otherwise Next's `opengraph-image` file convention fills it in.
  const ogImages = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined

  return {
    title,
    description,
    keywords: [...DEFAULT_KEYWORDS, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      type,
      title,
      description,
      url,
      siteName: SITE.name,
      locale: SITE.locale,
      ...(ogImages ? { images: ogImages } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image ? { images: [image] } : {}),
      creator: '@elitedecore',
    },
  }
}

/** Organisation + LocalBusiness graph, injected once in the root layout. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'InteriorDesigner', 'LocalBusiness'],
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/icon`,
    image: `${SITE.url}/opengraph-image`,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: SITE.founded,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${SITE.address.street}, ${SITE.address.district}`,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    areaServed: ['Bangalore', 'Karnataka'],
    sameAs: SITE.socials.map((s) => s.href),
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { '@id': `${SITE.url}/#organization` },
  }
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  }
}

export function serviceJsonLd(service: { title: string; description: string; id: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    description: service.description,
    provider: { '@id': `${SITE.url}/#organization` },
    areaServed: { '@type': 'Country', name: SITE.address.countryName },
    url: `${SITE.url}/services#${service.id}`,
  }
}

export function projectJsonLd(project: {
  title: string
  summary: string
  cover: string
  slug: string
  year: string
  location: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    image: project.cover,
    url: `${SITE.url}/portfolio/${project.slug}`,
    dateCreated: project.year,
    locationCreated: { '@type': 'Place', name: project.location },
    creator: { '@id': `${SITE.url}/#organization` },
  }
}

export function articleJsonLd(post: {
  title: string
  excerpt: string
  cover: string
  slug: string
  date: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.cover,
    datePublished: post.date,
    dateModified: post.date,
    url: `${SITE.url}/blog/${post.slug}`,
    author: { '@id': `${SITE.url}/#organization` },
    publisher: { '@id': `${SITE.url}/#organization` },
  }
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
