'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SITE } from '@/lib/data/site'
import { RevealText } from '@/components/ui/RevealText'
import { FadeIn } from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Closing statement over an animated architectural grid.
 * The grid is a single inline SVG whose lines draw themselves on entry — cheaper
 * and sharper than any raster, and it scales to any viewport without artefacts.
 */
export function CallToAction() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return

      gsap.fromTo(
        '[data-grid-line]',
        { strokeDashoffset: 1000, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 1,
          duration: 2.2,
          stagger: 0.045,
          ease: 'expo.out',
          scrollTrigger: { trigger: ref.current, start: 'top 78%', once: true },
        },
      )

      gsap.to('[data-grid-wrap]', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    },
    { scope: ref, dependencies: [reduced] },
  )

  return (
    <section
      ref={ref}
      className="relative flex min-h-[92svh] items-center overflow-hidden bg-paper"
      aria-labelledby="cta-heading"
    >
      {/* Architectural grid */}
      <div data-grid-wrap aria-hidden className="absolute inset-0 will-transform">
        <svg
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full opacity-[0.5]"
        >
          <defs>
            <linearGradient id="cta-line" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#856717" stopOpacity="0" />
              <stop offset="45%" stopColor="#856717" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#856717" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Perspective floor */}
          {Array.from({ length: 14 }).map((_, i) => (
            <line
              key={`h-${i}`}
              data-grid-line
              x1="0"
              y1={420 + i * i * 2.6}
              x2="1200"
              y2={420 + i * i * 2.6}
              stroke="url(#cta-line)"
              strokeWidth="0.7"
              strokeDasharray="1200"
            />
          ))}

          {/* Vanishing verticals */}
          {Array.from({ length: 17 }).map((_, i) => (
            <line
              key={`v-${i}`}
              data-grid-line
              x1={i * 75}
              y1="800"
              x2={600 + (i * 75 - 600) * 0.14}
              y2="410"
              stroke="url(#cta-line)"
              strokeWidth="0.7"
              strokeDasharray="1000"
            />
          ))}

          {/* Elevation grid above the horizon */}
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`e-${i}`}
              data-grid-line
              x1="0"
              y1={410 - i * 46}
              x2="1200"
              y2={410 - i * 46}
              stroke="url(#cta-line)"
              strokeWidth="0.5"
              strokeDasharray="1200"
              opacity="0.5"
            />
          ))}
        </svg>
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,243,239,0.45),rgba(244,243,239,0.94))]"
      />

      <div className="container-luxe relative z-10 flex flex-col items-center gap-10 py-24 text-center">
        <FadeIn y={14}>
          <span className="eyebrow">Let&rsquo;s begin</span>
        </FadeIn>

        {/* Font size lives on the heading so the `ch` measure resolves against it. */}
        <h2
          id="cta-heading"
          className="display-poster max-w-[14ch] text-display text-ink"
        >
          <RevealText split="words">Let&rsquo;s Create Your Dream Space</RevealText>
        </h2>

        <FadeIn delay={0.15}>
          <p className="max-w-lg text-fluid-base font-normal leading-relaxed text-ink/65">
            Tell us about the space, the people who will live in it, and when you would
            like to move in. We will tell you honestly whether we are the right studio
            for it.
          </p>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <MagneticButton strength={34}>
              <Button href="/contact" variant="primary" size="lg">
                Book a Consultation
              </Button>
            </MagneticButton>
            <MagneticButton strength={34}>
              <Button href={`tel:${SITE.phoneHref}`} variant="outline" size="lg">
                {SITE.phone}
              </Button>
            </MagneticButton>
          </div>
        </FadeIn>

        <FadeIn delay={0.35}>
          <p className="text-[0.64rem] uppercase tracking-luxe text-ink/60">
            Currently accepting projects for {new Date().getFullYear() + 1} · {SITE.address.city}
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
