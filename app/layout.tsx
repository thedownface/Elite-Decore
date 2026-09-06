import type { Metadata, Viewport } from 'next'
import { Archivo, Instrument_Serif, Inter_Tight } from 'next/font/google'
import '@/styles/globals.css'

import { SITE } from '@/lib/data/site'
import { organizationJsonLd, websiteJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/seo/JsonLd'
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Preloader } from '@/components/layout/Preloader'
import { Cursor } from '@/components/ui/Cursor'
import { Grain } from '@/components/ui/Grain'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

// Heavy neo-grotesque for the poster headlines.
const display = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

const sans = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

// Used sparingly — the wordmark and the occasional italic accent.
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.legalName,
  category: 'Interior Design',
  keywords: [
    'luxury interior design',
    'interior designers in Mumbai',
    'bespoke interior architecture',
    'villa interior designers',
    'turnkey interior projects',
    'modular kitchen design',
    'hospitality interior design',
    'Elite Decofe',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    creator: '@elitedecofe',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.webmanifest',
  formatDetection: { telephone: true, address: true, email: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#F4F3EF' },
    { media: '(prefers-color-scheme: light)', color: '#F4F3EF' },
  ],
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/*
          Entrance animations start from opacity:0 — without JS they must not stay
          there. The markup has to be injected rather than passed as a child, or
          React escapes it on the client and the server does not, which trips a
          hydration mismatch.
        */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<style>[class*="opacity-0"],[data-reveal-item],[data-hero-anim]{opacity:1!important;transform:none!important;clip-path:none!important}</style>',
          }}
        />
      </head>
      <body className="bg-paper text-ink">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-[110] focus:rounded-pill focus:bg-paper focus:px-6 focus:py-3 focus:text-sm focus:font-medium focus:text-paper"
        >
          Skip to content
        </a>

        <SmoothScrollProvider>
          <Preloader />
          <Cursor />
          <Grain />
          <ScrollProgress />
          <Header />

          <main id="main" className="relative">
            {children}
          </main>

          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
