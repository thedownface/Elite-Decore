import type { NavLink } from '@/types'

const FALLBACK_URL = 'https://www.elitedecore.co.in'

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
  /**
   * VERCEL_URL is the *per-deployment* host (elite-decore-<hash>.vercel.app),
   * never the production alias, and it is behind deployment protection. Trusting
   * it in production pointed every canonical, og:url, robots Host and sitemap
   * <loc> at a login-walled URL, which told Google the real domain was not the
   * canonical one. So it is only a candidate off production; production uses the
   * explicit NEXT_PUBLIC_SITE_URL, or the real domain below.
   */
  const isProduction = process.env.VERCEL_ENV === 'production'

  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    // Preview and development deploys still want their own absolute URLs.
    ...(isProduction ? [] : [process.env.NEXT_PUBLIC_VERCEL_URL, process.env.VERCEL_URL]),
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
  name: 'Elite Decore',
  legalName: 'Elite Decore',
  tagline: 'Creative Meets Living',
  description:
    'Elite Decore is an interior design studio in Bangalore crafting bespoke residences, villas, workspaces and hospitality spaces with timeless material honesty.',
  url: resolveSiteUrl(),
  locale: 'en_IN',
  email: 'info@elitedecore.in',
  phone: '+91 97381 25710',
  phoneHref: '+919738125710',
  whatsappHref: '919738125710',
  founded: '2020',
  address: {
    street: '#95, Muninanjappa Layout',
    district: 'Near Alpha Garden, Kodigehalli Road',
    city: 'Bangalore',
    region: 'Karnataka',
    postalCode: '560048',
    country: 'IN',
    countryName: 'India',
  },
  hours: 'Mon – Sat · 10:00 – 19:00 IST',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/elitedecore' },
    { label: 'Pinterest', href: 'https://pinterest.com/elitedecore' },
    { label: 'Behance', href: 'https://behance.net/elitedecore' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/elitedecore' },
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
  { value: 20, suffix: '+', label: 'Projects Delivered' },
  { value: 6, suffix: '', label: 'Years of Practice' },
  { value: 8, suffix: '+', label: 'In-House Team' },
  { value: 100, suffix: '%', label: 'In-House Execution' },
] as const
