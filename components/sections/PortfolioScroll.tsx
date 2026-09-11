'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { FEATURED_PROJECTS } from '@/lib/data/projects'
import { EASE } from '@/lib/motion'
import { pad } from '@/lib/utils'
import { RevealText } from '@/components/ui/RevealText'
import { FadeIn } from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useMediaQuery'

/**
 * Horizontal storytelling gallery.
 *
 * The section pins for the length of the track and converts vertical scroll into
 * horizontal travel. Each panel additionally scrubs its own image scale, blur and
 * text stagger against its position in the viewport, so panels arrive and depart
 * rather than simply sliding past.
 *
 * Below `md`, and under reduced-motion, the same markup falls back to a native
 * horizontal snap-scroller — no pinning, no scroll hijack.
 */
export function PortfolioScroll() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()

  const pinned = !reduced && !isMobile

  useGSAP(
    () => {
      const section = sectionRef.current
      const track = trackRef.current
      if (!section || !track || !pinned) return

      const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', track)
      const distance = () => track.scrollWidth - window.innerWidth

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Per-panel treatment, scrubbed against the horizontal tween itself.
      panels.forEach((panel) => {
        const media = panel.querySelector('[data-panel-media]')
        const copy = panel.querySelectorAll('[data-panel-copy] > *')
        const index = panel.querySelector('[data-panel-index]')

        gsap
          .timeline({
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          })
          .fromTo(
            media,
            { scale: 1.35, filter: 'blur(14px) brightness(0.55)' },
            { scale: 1, filter: 'blur(0px) brightness(1)', ease: 'none', duration: 1 },
          )
          .to(
            media,
            { scale: 1.16, filter: 'blur(9px) brightness(0.6)', ease: 'none', duration: 1 },
          )

        gsap.fromTo(
          copy,
          { yPercent: 65, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.06,
            ease: EASE.expo,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left 72%',
              end: 'left 30%',
              scrub: 1,
            },
          },
        )

        gsap.fromTo(
          index,
          { yPercent: 40, opacity: 0.15 },
          {
            yPercent: -40,
            opacity: 0.5,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        )
      })

      // Progress rail.
      gsap.fromTo(
        '[data-panel-progress]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance()}`,
            scrub: true,
          },
        },
      )
    },
    { scope: sectionRef, dependencies: [pinned] },
  )

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative overflow-hidden bg-paper"
      aria-labelledby="portfolio-heading"
    >
      {/* Intro block */}
      <div className={pinned ? 'absolute inset-x-0 top-0 z-20 pt-24 md:pt-28' : 'pt-24 md:pt-32'}>
        <div className="container-luxe flex items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <FadeIn y={12}>
              <span className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-gold-500/60" aria-hidden />
                Selected Work
              </span>
            </FadeIn>
            <RevealText
              as="h2"
              className="display-poster max-w-[14ch] text-fluid-2xl text-ink"
            >
              Projects that hold their composure.
            </RevealText>
          </div>

          <FadeIn delay={0.15} className="hidden shrink-0 md:block">
            <MagneticButton>
              <Button href="/portfolio" variant="outline" size="md">
                All Projects
              </Button>
            </MagneticButton>
          </FadeIn>
        </div>
      </div>
      <h2 id="portfolio-heading" className="sr-only">
        Featured portfolio
      </h2>

      {/* Track */}
      <div
        className={
          pinned
            ? 'flex h-[100svh] items-center'
            : 'no-scrollbar mt-12 flex snap-x snap-mandatory overflow-x-auto pb-12'
        }
      >
        <div
          ref={trackRef}
          className={pinned ? 'flex will-transform' : 'flex'}
          style={pinned ? { paddingLeft: 'max(1.25rem, 4vw)' } : undefined}
        >
          {FEATURED_PROJECTS.map((project, i) => (
            <article
              key={project.slug}
              data-panel
              className={
                pinned
                  ? 'relative mr-6 h-[74svh] w-[78vw] shrink-0 lg:mr-10 lg:w-[62vw] xl:w-[54vw]'
                  : 'relative mr-4 h-[64svh] w-[86vw] shrink-0 snap-center pl-5 last:pr-5 sm:w-[70vw]'
              }
            >
              <Link
                href={`/portfolio/${project.slug}`}
                data-cursor="view"
                data-cursor-label="View Project"
                className="group relative block h-full w-full overflow-hidden rounded-arch-lg shadow-lift ring-1 ring-ink/10"
                aria-label={`View ${project.title} in ${project.location}`}
              >
                <div data-panel-media className="absolute inset-0 will-transform">
                  <Image
                    src={project.cover}
                    alt={`${project.title} — ${project.style} interior in ${project.location}`}
                    fill
                    sizes="(max-width: 768px) 86vw, 62vw"
                    quality={78}
                    priority={i === 0}
                    loading={i === 0 ? undefined : 'lazy'}
                    className="object-cover"
                  />
                </div>

                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-transparent transition-opacity duration-700 group-hover:opacity-90"
                />

                <span
                  data-panel-index
                  aria-hidden
                  className="display-poster absolute right-6 top-6 text-[clamp(3rem,7vw,6rem)] leading-none text-paper/55 will-transform"
                >
                  {pad(i + 1)}
                </span>

                <div
                  data-panel-copy
                  className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-7 md:p-10"
                >
                  <span className="w-fit rounded-pill bg-paper px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-luxe text-ink shadow-soft">
                    {project.category}
                  </span>

                  <h3 className="display-poster text-[clamp(1.8rem,4.2vw,3.4rem)] text-paper">
                    {project.title}
                  </h3>

                  <dl className="flex flex-wrap gap-x-8 gap-y-2 border-t border-paper/30 pt-4 text-[0.66rem] uppercase tracking-luxe text-paper/85">
                    <div className="flex gap-2">
                      <dt className="text-paper/60">Location</dt>
                      <dd>{project.location}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-paper/60">Scope</dt>
                      <dd>{project.area}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-paper/60">Style</dt>
                      <dd>{project.style}</dd>
                    </div>
                  </dl>
                </div>
              </Link>
            </article>
          ))}

          {/* Closing card */}
          <div
            className={
              pinned
                ? 'mr-[6vw] flex h-[74svh] w-[42vw] shrink-0 items-center'
                : 'mr-5 flex h-[64svh] w-[70vw] shrink-0 snap-center items-center'
            }
          >
            <div className="flex flex-col gap-7">
              <p className="display-poster text-fluid-2xl text-ink">
                Every project we've shipped, right here.
              </p>
              <MagneticButton className="w-fit">
                <Button href="/portfolio" variant="primary" size="lg">
                  Browse the Archive
                </Button>
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {pinned && (
        <div className="absolute inset-x-0 bottom-10 z-20">
          <div className="container-luxe">
            <div className="h-px w-full bg-ink/10">
              <div
                data-panel-progress
                className="h-full origin-left scale-x-0 bg-gradient-to-r from-gold-600 to-gold-200"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
