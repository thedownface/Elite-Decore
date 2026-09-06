'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { IMG } from '@/lib/images'
import { EASE } from '@/lib/motion'
import { SITE } from '@/lib/data/site'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { pad } from '@/lib/utils'

// The GL layer is client-only and non-blocking — the hero is fully readable
// before it arrives, and it never enters the critical path.
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false })

/** Three explicit lines, each set to fill the measure edge to edge. */
const HEADLINE = ['Designing Spaces', 'That Define', 'Luxury']

const INDEX_LINKS = [
  { label: 'Work', href: '/portfolio' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Process', href: '/process' },
  { label: 'Journal', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const pointer = useMousePosition()
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      if (reduced) {
        gsap.set('[data-hero-anim]', { opacity: 1, y: 0, yPercent: 0 })
        return
      }

      const introDone = document.documentElement.dataset.intro === 'done'
      const tl = gsap.timeline({ delay: introDone ? 0.15 : 2.9 })

      tl.fromTo(
        '[data-hero-meta]',
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.06, ease: EASE.expo },
      )
        .fromTo(
          '[data-hero-line]',
          { yPercent: 112 },
          { yPercent: 0, duration: 1.5, stagger: 0.09, ease: EASE.expo },
          '-=0.6',
        )
        .fromTo(
          '[data-hero-index]',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.05, ease: EASE.expo },
          '-=1',
        )
        .fromTo(
          '[data-hero-plate]',
          { clipPath: 'inset(12% 12% 12% 12%)', scale: 1.1 },
          { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.6, ease: EASE.expo },
          '-=1.1',
        )
        .fromTo(
          '[data-hero-foot]',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: EASE.expo },
          '-=0.9',
        )

      // Scroll-out: the type rises away while the plate holds and dims.
      gsap
        .timeline({
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 1 },
        })
        .to('[data-hero-type]', { yPercent: -24, opacity: 0.15, ease: 'none' }, 0)
        .to('[data-hero-plate] img', { scale: 1.14, ease: 'none' }, 0)

      // Pointer depth.
      const setTypeX = gsap.quickTo('[data-hero-type]', 'x', { duration: 1.8, ease: 'expo.out' })
      const setPlateX = gsap.quickTo('[data-hero-plate]', 'x', { duration: 1.4, ease: 'expo.out' })
      const setPlateY = gsap.quickTo('[data-hero-plate]', 'y', { duration: 1.4, ease: 'expo.out' })

      const onMove = () => {
        setTypeX(pointer.current.nx * 8)
        setPlateX(pointer.current.nx * -16)
        setPlateY(pointer.current.ny * -10)
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      return () => window.removeEventListener('pointermove', onMove)
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden bg-paper pt-[var(--header-h)]"
      aria-labelledby="hero-heading"
    >
      {/* Gold dust, drawn behind the type */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <HeroScene pointer={pointer} />
      </div>

      <div className="container-luxe relative">
        {/* Corner meta, as in an editorial masthead */}
        <div className="flex items-start justify-between gap-8 pt-6">
          <p data-hero-meta data-hero-anim className="meta max-w-[16ch] opacity-0">
            Based in{' '}
            <span className="font-semibold text-ink underline decoration-gold-600 underline-offset-4">
              {SITE.address.city}, India
            </span>
            <br />
            Designing since {SITE.founded}
          </p>

          <p
            data-hero-meta
            data-hero-anim
            className="meta hidden max-w-[20ch] text-right opacity-0 sm:block"
          >
            It all starts with a room,
            <br />a brief and a long conversation
          </p>
        </div>

        {/* Poster headline */}
        <h1
          id="hero-heading"
          data-hero-type
          className="display-poster mt-8 text-mega text-ink will-transform md:mt-4"
        >
          <span className="sr-only">{HEADLINE.join(' ')}</span>
          <span aria-hidden className="block">
            {HEADLINE.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <span data-hero-line data-hero-anim className="block will-transform">
                  {/*
                    The payoff line switches to the serif accent. Instrument Serif
                    has a much smaller cap height than Archivo, so it is scaled up
                    and un-uppercased to sit optically level with the lines above.
                  */}
                  {i === 2 ? (
                    <em className="font-serif text-[1.16em] font-normal normal-case italic leading-[0.9] tracking-[-0.03em] text-gold-700">
                      {line}
                    </em>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </span>
        </h1>

        {/* Numbered index row */}
        <nav
          aria-label="Sections"
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-ink/10 py-5 sm:grid-cols-3 lg:flex lg:items-baseline lg:justify-between"
        >
          {INDEX_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              data-hero-index
              data-hero-anim
              data-cursor="link"
              className="group/idx flex items-baseline gap-2 opacity-0"
            >
              <span className="font-sans text-[0.62rem] font-medium tabular-nums text-ink/65 transition-colors duration-500 group-hover/idx:text-gold-700">
                {pad(i + 1)}
              </span>
              <span className="font-display text-[clamp(1.35rem,2.6vw,2.35rem)] font-semibold tracking-tightest text-ink transition-colors duration-500 group-hover/idx:text-gold-700">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Plate + supporting copy */}
        <div className="grid items-center gap-8 py-10 lg:grid-cols-12 lg:gap-10">
          <p
            data-hero-foot
            data-hero-anim
            className="order-2 text-fluid-base leading-relaxed text-ink/70 opacity-0 lg:order-1 lg:col-span-3"
          >
            Fuelled by long site walks, stubborn detailing and a refusal to specify anything
            we would not live with ourselves.
          </p>

          <div
            data-hero-plate
            className="order-1 overflow-hidden rounded-arch-lg shadow-lift will-transform lg:order-2 lg:col-span-6"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={IMG.heroLiving}
                alt="A sunlit luxury living room with travertine floors, low linen seating and brass detailing"
                fill
                priority
                fetchPriority="high"
                quality={80}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
          </div>

          <div
            data-hero-foot
            data-hero-anim
            className="order-3 flex flex-col gap-6 opacity-0 lg:col-span-3"
          >
            <p className="text-fluid-base leading-relaxed text-ink/70 lg:text-right">
              Turning &ldquo;we want it calm, but not cold&rdquo; into a complete material
              world you never want to leave.
            </p>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <MagneticButton>
                <Button href="/portfolio" variant="primary" size="md">
                  Explore Portfolio
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button href="/contact" variant="outline" size="md">
                  Book Consultation
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Ticker strip */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-2 border-t border-ink/10 py-5">
          {['250+ Projects', '12 Years', '40+ Designers', 'Mumbai · Pune · Bengaluru · Goa'].map(
            (meta) => (
              <span
                key={meta}
                data-hero-foot
                data-hero-anim
                className="text-[0.66rem] font-medium uppercase tracking-luxe text-ink/60 opacity-0"
              >
                {meta}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
