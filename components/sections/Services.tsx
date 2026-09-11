'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { SERVICES } from '@/lib/data/services'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsTouch } from '@/hooks/useMediaQuery'
import { cn } from '@/lib/utils'

/**
 * Expanding service rows.
 *
 * Desktop: hovering a row grows it open and a preview plate trails the pointer.
 * Touch / reduced-motion: every row renders open with its image inline, so no
 * content is ever locked behind a hover the visitor cannot perform.
 */
export function Services() {
  const rootRef = useRef<HTMLElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<string | null>(null)
  const reduced = useReducedMotion()
  const isTouch = useIsTouch()

  const interactive = !reduced && !isTouch

  useGSAP(
    () => {
      if (!interactive) return
      const preview = previewRef.current
      if (!preview) return

      const xTo = gsap.quickTo(preview, 'x', { duration: 0.85, ease: 'expo.out' })
      const yTo = gsap.quickTo(preview, 'y', { duration: 0.85, ease: 'expo.out' })
      const rTo = gsap.quickTo(preview, 'rotate', { duration: 1.1, ease: 'expo.out' })

      let lastX = 0
      const onMove = (e: PointerEvent) => {
        const root = rootRef.current
        if (!root) return
        const rect = root.getBoundingClientRect()
        xTo(e.clientX - rect.left - 150)
        yTo(e.clientY - rect.top - 110)
        rTo(gsap.utils.clamp(-9, 9, (e.clientX - lastX) * 0.4))
        lastX = e.clientX
      }

      const root = rootRef.current
      root?.addEventListener('pointermove', onMove, { passive: true })
      return () => root?.removeEventListener('pointermove', onMove)
    },
    { scope: rootRef, dependencies: [interactive] },
  )

  // Grow / collapse the hovered row.
  useGSAP(
    () => {
      if (!interactive) return
      const preview = previewRef.current

      gsap.to(preview, {
        autoAlpha: active ? 1 : 0,
        scale: active ? 1 : 0.9,
        duration: 0.6,
        ease: 'expo.out',
      })

      SERVICES.forEach((service) => {
        const body = rootRef.current?.querySelector(`[data-service-body="${service.id}"]`)
        if (!body) return
        gsap.to(body, {
          height: active === service.id ? 'auto' : 0,
          opacity: active === service.id ? 1 : 0,
          duration: 0.7,
          ease: 'expo.out',
        })
      })
    },
    { scope: rootRef, dependencies: [active, interactive] },
  )

  const activeService = SERVICES.find((s) => s.id === active)

  return (
    <section
      ref={rootRef}
      id="services"
      className="relative overflow-hidden bg-paper-soft py-24 md:py-36 lg:py-44"
      aria-labelledby="services-heading"
    >
      <div className="container-luxe">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Capabilities"
            title="Six disciplines, one standard of finish."
            as="h2"
            className="lg:max-w-3xl"
          />
          <p className="max-w-sm text-sm font-normal leading-relaxed text-ink/70 lg:pb-3">
            Whether we are detailing a single wardrobe or delivering a full home turnkey,
            the drawings are held to the same tolerance.
          </p>
        </div>
        <h2 id="services-heading" className="sr-only">
          Our services
        </h2>

        <ul className="mt-16 border-t border-ink/10 md:mt-20">
          {SERVICES.map((service) => {
            const open = active === service.id
            return (
              <li
                key={service.id}
                id={service.id}
                className="hover-wash group border-b border-ink/10 scroll-mt-32"
                onMouseEnter={() => interactive && setActive(service.id)}
                onMouseLeave={() => interactive && setActive(null)}
                onFocus={() => interactive && setActive(service.id)}
              >
                <Link
                  href={`/services#${service.id}`}
                  data-cursor="link"
                  className="block px-4 py-8 outline-none transition-[padding] duration-700 ease-expo group-hover:px-7 md:py-10"
                >
                  <div className="flex items-baseline gap-5 md:gap-10">
                    <span
                      className={cn(
                        'font-sans text-[0.66rem] tracking-luxe transition-colors duration-500',
                        open ? 'text-gold-700' : 'text-ink/60',
                      )}
                    >
                      {service.index}
                    </span>

                    <h3
                      className={cn(
                        'display-poster flex-1 text-[clamp(1.9rem,5.6vw,4.6rem)] transition-colors duration-700 ease-expo',
                        open ? 'text-gold-900' : 'text-ink',
                      )}
                    >
                      {service.title}
                    </h3>

                    <span
                      aria-hidden
                      className={cn(
                        'hidden shrink-0 text-2xl font-normal transition-all duration-700 ease-expo md:block',
                        open ? 'translate-x-0 text-gold-700' : '-translate-x-4 text-ink/60',
                      )}
                    >
                      ↗
                    </span>
                  </div>

                  <div
                    data-service-body={service.id}
                    className={cn(
                      'overflow-hidden',
                      interactive ? 'h-0 opacity-0' : 'h-auto opacity-100',
                    )}
                  >
                    <div className="grid gap-8 pt-7 md:grid-cols-12 md:pl-[3.6rem]">
                      <div className="flex flex-col gap-5 md:col-span-7">
                        <p className="text-fluid-base font-normal leading-relaxed text-ink/70">
                          {service.description}
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {service.deliverables.map((d) => (
                            <li
                              key={d}
                              className="rounded-pill border border-ink/12 px-4 py-1.5 text-[0.66rem] uppercase tracking-luxe text-ink/70"
                            >
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Inline image for touch / reduced-motion visitors */}
                      {!interactive && (
                        <div className="relative aspect-[16/10] overflow-hidden rounded-arch md:col-span-5">
                          <Image
                            src={service.image}
                            alt={`${service.title} — ${service.tagline}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Pointer-tracking preview plate */}
      {interactive && (
        <div
          ref={previewRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-20 h-[220px] w-[300px] overflow-hidden rounded-arch opacity-0 shadow-lift ring-1 ring-ink/10 will-transform"
        >
          {SERVICES.map((service) => (
            <Image
              key={service.id}
              src={service.image}
              alt=""
              fill
              sizes="300px"
              loading="lazy"
              className={cn(
                'object-cover transition-opacity duration-500 ease-expo',
                activeService?.id === service.id ? 'opacity-100' : 'opacity-0',
              )}
            />
          ))}
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-4 text-[0.62rem] font-semibold uppercase tracking-luxe text-paper">
            {activeService?.tagline}
          </span>
        </div>
      )}
    </section>
  )
}
