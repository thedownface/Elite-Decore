import type { NavLink } from '@/types'

export const SITE = {
  name: 'Elite Decofe',
  legalName: 'Elite Decofe Design Studio LLP',
  tagline: 'Designing Spaces That Define Luxury',
  description:
    'Elite Decofe is a luxury interior design and architecture studio crafting bespoke residences, villas, workspaces and hospitality spaces with timeless material honesty.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://elitedecofe.com',
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
