'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { IMG } from '@/lib/images'
import { SITE, STATS } from '@/lib/data/site'
import { RevealText } from '@/components/ui/RevealText'
import { RevealImage } from '@/components/ui/RevealImage'
import { FadeIn } from '@/components/ui/FadeIn'
import { Counter } from '@/components/ui/Counter'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export function About() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      // The secondary plate drifts against the primary one for editorial depth.
      gsap.fromTo(
        '[data-about-float]',
        { yPercent: 12 },
        {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          },
        },
      )
    },
    { scope: ref, dependencies: [reduced] },
  )

  return (
    <section
      ref={ref}
      id="about"
      className="relative overflow-hidden bg-paper py-24 md:py-36 lg:py-44"
      aria-label="About Elite Decofe"
    >
      <div className="container-luxe">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-14">
          {/* Editorial column */}
          <div className="flex flex-col gap-10 lg:col-span-6 lg:pr-10">
            <FadeIn y={14}>
              <span className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-gold-500/60" aria-hidden />
                The Studio
              </span>
            </FadeIn>

            <RevealText
              as="h2"
              className="text-fluid-2xl leading-[1.04] text-ink md:text-fluid-3xl"
            >
              We design for the way light moves through a room at four in the afternoon.
            </RevealText>

            <FadeIn delay={0.1} stagger={0.12}>
              <p className="max-w-xl text-fluid-base font-normal leading-relaxed text-ink/65">
                {SITE.name} began in {SITE.founded} with a single conviction: that luxury
                is not an accumulation of expensive objects, but the absence of anything
                unconsidered. Twelve years and two hundred and fifty projects later, that
                conviction has only sharpened.
              </p>
              <p className="max-w-xl text-fluid-base font-normal leading-relaxed text-ink/65">
                Our forty designers, drafters and project managers work from one studio in
                Bandra. We keep detailing, procurement and site supervision in-house
                because the gap between a drawing and a built room is where most interiors
                quietly fail.
              </p>
              <p className="max-w-xl text-fluid-base font-normal leading-relaxed text-ink/65">
                We take on roughly twenty projects a year. Not because we cannot take more,
                but because the principal visits every site, every week, and there are only
                so many weeks.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="flex flex-wrap items-center gap-5">
                <MagneticButton>
                  <Button href="/about" variant="outline" size="md">
                    Our Philosophy
                  </Button>
                </MagneticButton>
                <MagneticButton>
                  <Button href="/process" variant="ghost" size="md" sheen={false}>
                    How We Work →
                  </Button>
                </MagneticButton>
              </div>
            </FadeIn>
          </div>

          {/* Image composition */}
          <div className="relative lg:col-span-6">
            <RevealImage
              src={IMG.aboutPortrait}
              alt="A calm interior with plaster walls, oak joinery and a single sculptural chair"
              className="aspect-[4/5] w-full rounded-arch"
              parallax={9}
              sizes="(max-width: 1024px) 100vw, 45vw"
            />

            <div
              data-about-float
              className="absolute -bottom-10 -left-6 w-[46%] will-transform sm:-left-10 lg:-left-16"
            >
              <RevealImage
                src={IMG.aboutDetail}
                alt="Close detail of hand-rubbed walnut joinery meeting honed stone"
                className="aspect-[3/4] w-full rounded-arch shadow-lift ring-1 ring-ink/10"
                from="left"
                sizes="(max-width: 1024px) 45vw, 22vw"
              />
            </div>

            <FadeIn
              delay={0.35}
              className="absolute -right-2 top-8 hidden lg:block"
            >
              <div className="w-44 rounded-arch border border-ink/10 bg-paper-pure p-5 shadow-card">
                <p className="display-poster text-4xl text-gold-700">A+</p>
                <p className="mt-1 text-[0.66rem] uppercase tracking-luxe text-ink/70">
                  Craft Standard
                </p>
                <p className="mt-3 text-xs font-normal leading-relaxed text-ink/70">
                  Every bespoke piece is inspected twice before it leaves the workshop.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-28 border-t border-ink/10 pt-14 md:mt-36">
          <h3 className="sr-only">
            Studio by the numbers
          </h3>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.08} className="flex flex-col gap-3">
                <dt className="order-2 text-[0.66rem] uppercase tracking-luxe text-ink/65">
                  {stat.label}
                </dt>
                <dd className="display-poster order-1 text-[clamp(2.6rem,6.5vw,5.2rem)] text-ink">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dd>
                <div className="order-3 h-px w-full bg-gradient-to-r from-gold-500/45 to-transparent" />
              </FadeIn>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
