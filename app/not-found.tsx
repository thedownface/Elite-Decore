'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { NAV_LINKS } from '@/lib/data/site'
import { FEATURED_PROJECTS } from '@/lib/data/projects'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * 404 as a floor plan: the room the visitor was looking for was never drawn.
 * The plan lines draw themselves in, then drift very slowly with the pointer.
 */
export default function NotFound() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return

      gsap
        .timeline()
        .fromTo(
          '[data-plan-line]',
          { strokeDashoffset: 600, opacity: 0 },
          { strokeDashoffset: 0, opacity: 1, duration: 1.8, stagger: 0.05, ease: 'expo.out' },
        )
        .fromTo(
          '[data-404-anim]',
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: 'expo.out' },
          '-=1.3',
        )

      const xTo = gsap.quickTo('[data-plan]', 'x', { duration: 1.6, ease: 'expo.out' })
      const yTo = gsap.quickTo('[data-plan]', 'y', { duration: 1.6, ease: 'expo.out' })

      const onMove = (e: PointerEvent) => {
        xTo((e.clientX / window.innerWidth - 0.5) * 34)
        yTo((e.clientY / window.innerHeight - 0.5) * 26)
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      return () => window.removeEventListener('pointermove', onMove)
    },
    { scope: ref, dependencies: [reduced] },
  )

  return (
    <div
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-paper pt-[var(--header-h)]"
    >
      {/* Floor plan */}
      <div data-plan aria-hidden className="absolute inset-0 will-transform">
        <svg
          viewBox="0 0 800 600"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full opacity-[0.45]"
        >
          <g
            stroke="#856717"
            strokeWidth="1.1"
            fill="none"
            strokeDasharray="600"
            strokeLinecap="square"
          >
            <rect data-plan-line x="90" y="80" width="620" height="440" />
            <line data-plan-line x1="380" y1="80" x2="380" y2="300" />
            <line data-plan-line x1="380" y1="360" x2="380" y2="520" />
            <line data-plan-line x1="90" y1="300" x2="240" y2="300" />
            <line data-plan-line x1="300" y1="300" x2="380" y2="300" />
            <line data-plan-line x1="380" y1="200" x2="710" y2="200" />
            <line data-plan-line x1="560" y1="200" x2="560" y2="520" />
            <rect data-plan-line x="130" y="120" width="90" height="60" />
            <rect data-plan-line x="430" y="250" width="70" height="90" opacity="0.6" />
            <circle data-plan-line cx="640" cy="360" r="42" />
            <line data-plan-line x1="240" y1="300" x2="300" y2="260" opacity="0.5" />
          </g>
        </svg>
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,243,239,0.4),rgba(244,243,239,0.95))]"
      />

      <div className="container-luxe relative z-10 py-20">
        <div className="flex max-w-2xl flex-col gap-8">
          <span data-404-anim className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-gold-500/60" aria-hidden />
            Error 404
          </span>

          <h1
            data-404-anim
            className="display-poster text-display text-ink"
          >
            This room was
            <span className="font-serif font-normal italic tracking-[-0.02em] text-gold-700">
              {' '}
              never drawn.
            </span>
          </h1>

          <p
            data-404-anim
            className="max-w-lg text-fluid-base font-normal leading-relaxed text-ink/65"
          >
            The page you are looking for does not exist — it may have been moved, renamed,
            or simply never made it past concept stage. Here is the way back.
          </p>

          <div data-404-anim className="flex flex-wrap items-center gap-4">
            <MagneticButton>
              <Button href="/" variant="primary" size="lg">
                Return Home
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button href="/portfolio" variant="outline" size="lg">
                View Portfolio
              </Button>
            </MagneticButton>
          </div>

          <nav
            data-404-anim
            aria-label="Site sections"
            className="mt-6 border-t border-ink/10 pt-7"
          >
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-[0.66rem] uppercase tracking-luxe text-ink/70 transition-colors hover:text-gold-700"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p data-404-anim className="text-xs font-normal text-ink/60">
            Or start with{' '}
            <Link
              href={`/portfolio/${FEATURED_PROJECTS[0].slug}`}
              className="link-underline text-ink/70"
            >
              {FEATURED_PROJECTS[0].title}
            </Link>
            , our most recent completion.
          </p>
        </div>
      </div>
    </div>
  )
}
