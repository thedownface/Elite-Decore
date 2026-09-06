import type { NavLink } from '@/types'

const FALLBACK_URL = 'https://elitedecofe.com'

/**
 * Resolves the canonical origin for metadata, JSON-LD, sitemap and robots.
 *
 * `??` is not enough here: a platform env var that is *defined but empty*
 * (Vercel does this for a variable added with no value) slips straight through
 * nullish coalescing and blows up `new URL('')` during page-data collection,
 * failing the build. So every candidate is trimmed, emptiness-checked and
 * URL-parsed before it is trusted.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    // Set automatically on Vercel, so preview deploys get correct absolute URLs.
    process.env.NEXT_PUBLIC_VERCEL_URL,
    process.env.VERCEL_URL,
  ]

  for (const raw of candidates) {
    const value = raw?.trim()
    if (!value) continue

    // VERCEL_URL arrives as a bare host with no protocol.
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`

    try {
      return new URL(withProtocol).origin
    } catch {
      // Malformed value — fall through to the next candidate.
    }
  }

  return FALLBACK_URL
}

export const SITE = {
  name: 'Elite Decofe',
  legalName: 'Elite Decofe Design Studio LLP',
  tagline: 'Designing Spaces That Define Luxury',
  description:
    'Elite Decofe is a luxury interior design and architecture studio crafting bespoke residences, villas, workspaces and hospitality spaces with timeless material honesty.',
  url: resolveSiteUrl(),
  locale: 'en_IN',
  email: 'studio@elitedecofe.com',
  phone: '+91 98200 41100',
  phoneHref: '+919820041100',
  founded: '2013',
  address: {
    street: '14 Athena House, Linking Road',
    district: 'Bandra West',
    city: 'Mumbai',
    region: 'Maharashtra',
    postalCode: '400050',
    country: 'IN',
    countryName: 'India',
  },
  hours: 'Mon – Sat · 10:00 – 19:00 IST',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/elitedecofe' },
    { label: 'Pinterest', href: 'https://pinterest.com/elitedecofe' },
    { label: 'Behance', href: 'https://behance.net/elitedecofe' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/elitedecofe' },
  ],
} as const

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Process', href: '/process' },
  { label: 'Journal', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export const STATS = [
  { value: 250, suffix: '+', label: 'Projects Delivered' },
  { value: 12, suffix: '', label: 'Years of Practice' },
  { value: 40, suffix: '+', label: 'In-House Designers' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
] as const
