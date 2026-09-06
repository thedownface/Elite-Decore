'use client'

import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { MATERIALS } from '@/lib/data/materials'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/ui/FadeIn'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Loaded only when the section is reached — keeps three.js out of the initial bundle.
const MaterialScene = dynamic(() => import('@/components/three/MaterialScene'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <span className="text-[0.62rem] uppercase tracking-luxe text-ink/60">
        Preparing materials…
      </span>
    </div>
  ),
})

export function MaterialLab() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(MATERIALS[0].id)
  const [hovered, setHovered] = useState(false)
  const [mounted, setMounted] = useState(false)
  const reduced = useReducedMotion()

  const current = MATERIALS.find((m) => m.id === active) ?? MATERIALS[0]

  // Only instantiate WebGL once the section is genuinely close to the viewport.
  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setMounted(true)
            observer.disconnect()
          }
        },
        { rootMargin: '350px' },
      )
      observer.observe(el)
      return () => observer.disconnect()
    },
    { scope: ref },
  )

  // Cross-fade the specification copy on every change.
  useGSAP(
    () => {
      if (reduced) return
      gsap.fromTo(
        '[data-material-copy] > *',
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.06, ease: 'expo.out' },
      )
    },
    { scope: ref, dependencies: [active, reduced] },
  )

  return (
    <section
      ref={ref}
      id="materials"
      className="relative overflow-hidden border-y border-ink/10 bg-paper-soft py-24 md:py-32"
      aria-labelledby="materials-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/[0.07] blur-[100px]"
      />

      <div className="container-luxe relative">
        <SectionHeading
          eyebrow="Material Library"
          title="Turn it over. Feel the finish before it is specified."
          description="Every surface we specify is rendered here as it behaves in real light. Drag to rotate the sample; hover to warm the studio lighting."
          as="h2"
          className="max-w-4xl"
        />
        <h2 id="materials-heading" className="sr-only">
          Interactive material library
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* Viewer */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <div
              className="relative aspect-square w-full overflow-hidden rounded-arch-lg ring-1 ring-ink/10 sm:aspect-[4/3] lg:aspect-square"
              onPointerEnter={() => setHovered(true)}
              onPointerLeave={() => setHovered(false)}
              data-cursor="drag"
              data-cursor-label="Drag"
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(201,162,39,0.10),transparent_62%)]"
              />

              {mounted ? (
                <MaterialScene active={active} hovered={hovered} />
              ) : (
                <div className="absolute inset-0 grid place-items-center">
                  <span className="text-[0.62rem] uppercase tracking-luxe text-ink/60">
                    Material sampler
                  </span>
                </div>
              )}

              <span className="pointer-events-none absolute bottom-5 left-5 text-[0.6rem] uppercase tracking-luxe text-ink/60">
                Drag to rotate
              </span>
              <span className="pointer-events-none absolute bottom-5 right-5 text-[0.6rem] uppercase tracking-luxe text-gold-700">
                {current.finish}
              </span>
            </div>
          </div>

          {/* Selector + spec */}
          <div className="order-1 flex flex-col gap-8 lg:order-2 lg:col-span-5 lg:pl-6">
            <FadeIn>
              <ul role="tablist" aria-label="Material samples" className="flex flex-col">
                {MATERIALS.map((material) => {
                  const isActive = material.id === active
                  return (
                    <li key={material.id}>
                      <button
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls="material-spec"
                        data-cursor="link"
                        onClick={() => setActive(material.id)}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                        className={cn(
                          'group flex w-full items-center gap-4 border-b border-ink/10 py-4 text-left transition-colors duration-500 ease-expo',
                          isActive ? 'text-ink' : 'text-ink/65 hover:text-ink/80',
                        )}
                      >
                        <span
                          aria-hidden
                          className={cn(
                            'h-7 w-7 shrink-0 rounded-full ring-1 transition-all duration-500 ease-expo',
                            isActive ? 'scale-110 ring-gold-400/70' : 'ring-ink/12',
                          )}
                          style={{ background: material.swatch }}
                        />
                        <span className="flex-1 font-display text-xl font-semibold tracking-tightest">
                          {material.name}
                        </span>
                        <span className="text-[0.6rem] uppercase tracking-luxe text-ink/60">
                          {material.origin}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </FadeIn>

            <div
              id="material-spec"
              role="tabpanel"
              aria-live="polite"
              data-material-copy
              className="flex flex-col gap-4"
            >
              <h3 className="display-poster text-3xl text-ink">{current.name}</h3>
              <p className="max-w-md text-sm font-normal leading-relaxed text-ink/65">
                {current.description}
              </p>
              <dl className="flex gap-10 pt-2 text-[0.66rem] uppercase tracking-luxe">
                <div className="flex flex-col gap-1">
                  <dt className="text-ink/60">Finish</dt>
                  <dd className="text-ink/75">{current.finish}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-ink/60">Origin</dt>
                  <dd className="text-ink/75">{current.origin}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
