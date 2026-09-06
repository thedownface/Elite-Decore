'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { PROCESS_STEPS } from '@/lib/data/process'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EASE } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useMediaQuery'

/**
 * Pinned vertical timeline.
 *
 * The left column pins while the steps scroll past it; a gold rail fills in
 * proportion to progress and the active step index swaps in the sticky header.
 */
export function Process() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()

  useGSAP(
    () => {
      const root = ref.current
      if (!root || reduced) return

      const steps = gsap.utils.toArray<HTMLElement>('[data-step]', root)

      // Rail fill.
      gsap.fromTo(
        '[data-rail-fill]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-steps]',
            start: 'top 65%',
            end: 'bottom 75%',
            scrub: 0.7,
          },
        },
      )

      steps.forEach((step, i) => {
        gsap.fromTo(
          step.querySelectorAll('[data-step-anim]'),
          { y: 46, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.07,
            ease: EASE.expo,
            scrollTrigger: { trigger: step, start: 'top 82%', once: true },
          },
        )

        // Node pulse as each step reaches the rail midpoint.
        gsap.to(step.querySelector('[data-step-node]'), {
          backgroundColor: '#C9A227',
          scale: 1.35,
          borderColor: 'rgba(201,162,39,0.9)',
          duration: 0.5,
          ease: EASE.expo,
          scrollTrigger: {
            trigger: step,
            start: 'top 60%',
            end: 'bottom 40%',
            toggleActions: 'play reverse play reverse',
          },
        })

        // Sticky counter — swaps the big index as each step crosses mid-viewport.
        if (!isMobile) {
          ScrollTrigger.create({
            trigger: step,
            start: 'top 55%',
            end: 'bottom 55%',
            onEnter: () => setCounter(step.dataset.step ?? '01'),
            onEnterBack: () => setCounter(step.dataset.step ?? '01'),
          })
        }

        void i
      })

      function setCounter(value: string) {
        const el = root?.querySelector('[data-step-counter]') as HTMLElement | null
        if (!el || el.textContent === value) return
        gsap
          .timeline()
          .to(el, { yPercent: -100, opacity: 0, duration: 0.28, ease: 'power2.in' })
          .set(el, { yPercent: 100 })
          .add(() => {
            el.textContent = value
          })
          .to(el, { yPercent: 0, opacity: 1, duration: 0.45, ease: EASE.expo })
      }
    },
    { scope: ref, dependencies: [reduced, isMobile] },
  )

  return (
    <section
      ref={ref}
      id="process"
      className="relative overflow-hidden bg-paper py-24 md:py-36"
      aria-labelledby="process-heading"
    >
      <div className="container-luxe">
        <SectionHeading
          eyebrow="How We Work"
          title="Six stages. No surprises."
          description="Every project runs on the same spine, from a 1,200 square foot apartment to a forty-two key hotel. You always know which stage you are in, and what comes next."
          as="h2"
          className="max-w-4xl"
        />
        <h2 id="process-heading" className="sr-only">
          Our design process
        </h2>

        <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Pinned index */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-32 flex flex-col gap-8">
              <div className="flex items-baseline gap-4">
                <span className="h-24 overflow-hidden">
                  <span
                    data-step-counter
                    className="display-poster block text-[7rem] leading-[0.8] text-gold-700"
                  >
                    01
                  </span>
                </span>
                <span className="font-sans text-[0.66rem] uppercase tracking-luxe text-ink/60">
                  / 06
                </span>
              </div>

              <p className="max-w-xs text-sm font-normal leading-relaxed text-ink/70">
                A written brief precedes every drawing. A weekly report follows every
                site visit. Nothing about our process is improvised.
              </p>

              <div className="rule" />

              <ul className="flex flex-col gap-2">
                {PROCESS_STEPS.map((step) => (
                  <li key={step.index}>
                    <a
                      href={`#step-${step.index}`}
                      className="link-underline text-sm text-ink/65 transition-colors hover:text-gold-700"
                    >
                      {step.index} — {step.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Steps */}
          <ol data-steps className="relative lg:col-span-8">
            {/* Rail */}
            <div
              aria-hidden
              className="absolute left-[7px] top-2 hidden h-full w-px bg-ink/12 sm:block"
            >
              <div
                data-rail-fill
                className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-gold-500 via-gold-400 to-gold-700"
              />
            </div>

            {PROCESS_STEPS.map((step) => (
              <li
                key={step.index}
                id={`step-${step.index}`}
                data-step={step.index}
                className="relative scroll-mt-32 pb-14 last:pb-0 sm:pl-12"
              >
                <span
                  data-step-node
                  aria-hidden
                  className="absolute left-0 top-2 hidden h-[15px] w-[15px] rounded-full border border-ink/25 bg-paper shadow-soft sm:block"
                />

                <div className="flex flex-col gap-4 border-b border-ink/10 pb-12">
                  <div data-step-anim className="flex items-center gap-4">
                    <span className="font-sans text-[0.66rem] tracking-luxe text-gold-700">
                      {step.index}
                    </span>
                    <span className="text-[0.62rem] uppercase tracking-luxe text-ink/60">
                      {step.duration}
                    </span>
                  </div>

                  <h3
                    data-step-anim
                    className="display-poster text-[clamp(1.8rem,4vw,3rem)] text-ink"
                  >
                    {step.title}
                  </h3>

                  <p
                    data-step-anim
                    className="max-w-xl text-fluid-base font-normal leading-relaxed text-ink/65"
                  >
                    {step.description}
                  </p>

                  <ul data-step-anim className="mt-2 flex flex-wrap gap-2">
                    {step.points.map((point) => (
                      <li
                        key={point}
                        className="rounded-pill border border-ink/10 px-4 py-1.5 text-[0.64rem] uppercase tracking-luxe text-ink/70"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
