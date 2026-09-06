'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { PROJECTS, PROJECT_CATEGORIES } from '@/lib/data/projects'
import { EASE } from '@/lib/motion'
import { cn, pad } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Filterable archive grid with an animated re-layout on every filter change. */
export function PortfolioGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<string>('All')
  const reduced = useReducedMotion()

  const visible = useMemo(
    () => (filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  )

  useGSAP(
    () => {
      if (reduced) return
      gsap.fromTo(
        '[data-grid-card]',
        { y: 42, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.06,
          ease: EASE.expo,
        },
      )
    },
    { scope: ref, dependencies: [filter, reduced] },
  )

  return (
    <div ref={ref} className="container-luxe">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 border-b border-ink/10 pb-8">
        {PROJECT_CATEGORIES.map((category) => {
          const active = filter === category
          return (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={active}
              data-cursor="link"
              className={cn(
                'rounded-pill border px-5 py-2 text-[0.64rem] uppercase tracking-luxe transition-all duration-500 ease-expo',
                active
                  ? 'border-gold-600 bg-gold-500/20 text-gold-800'
                  : 'border-ink/12 text-ink/70 hover:border-ink/25 hover:text-ink/80',
              )}
            >
              {category}
            </button>
          )
        })}

        <span className="ml-auto text-[0.62rem] uppercase tracking-luxe text-ink/60">
          {pad(visible.length)} {visible.length === 1 ? 'Project' : 'Projects'}
        </span>
      </div>

      {/* Grid */}
      <ul className="mt-12 grid gap-x-7 gap-y-16 md:grid-cols-2">
        {visible.map((project, i) => (
          <li
            key={project.slug}
            data-grid-card
            className={cn(
              'group',
              // Break the rhythm so the grid reads as editorial, not catalogue.
              i % 4 === 0 && 'md:mt-0',
              i % 4 === 1 && 'md:mt-20',
              i % 4 === 2 && 'md:-mt-8',
              i % 4 === 3 && 'md:mt-12',
            )}
          >
            <Link
              href={`/portfolio/${project.slug}`}
              data-cursor="view"
              data-cursor-label="View"
              className="hover-wash flex flex-col gap-6 rounded-arch p-4 transition-shadow duration-700 ease-expo hover:shadow-card"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-arch bg-paper-muted ring-1 ring-ink/10">
                <Image
                  src={project.cover}
                  alt={`${project.title} — ${project.style} interior in ${project.location}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  quality={76}
                  priority={i < 2}
                  loading={i < 2 ? undefined : 'lazy'}
                  className="object-cover transition-transform [transition-duration:1400ms] ease-expo group-hover:scale-[1.07]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
                <span className="absolute left-5 top-5 rounded-pill bg-paper/90 px-3.5 py-1.5 text-[0.58rem] font-semibold uppercase tracking-luxe text-ink shadow-soft backdrop-blur-sm">
                  {project.category}
                </span>
                <span className="absolute bottom-5 right-5 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-paper text-lg text-ink opacity-0 shadow-soft transition-all duration-700 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
                  ↗
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="display-poster text-fluid-xl text-ink transition-colors duration-500 group-hover:text-gold-800">
                    {project.title}
                  </h2>
                  <span className="shrink-0 text-[0.62rem] uppercase tracking-luxe text-ink/60">
                    {project.year}
                  </span>
                </div>

                <p className="max-w-xl text-sm font-normal leading-relaxed text-ink/60">
                  {project.summary}
                </p>

                <dl className="flex flex-wrap gap-x-7 gap-y-1.5 pt-2 text-[0.62rem] uppercase tracking-luxe text-ink/65">
                  <div className="flex gap-2">
                    <dt className="sr-only">Location</dt>
                    <dd>{project.location}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="sr-only">Area</dt>
                    <dd>{project.area}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="sr-only">Style</dt>
                    <dd className="text-gold-700">{project.style}</dd>
                  </div>
                </dl>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
