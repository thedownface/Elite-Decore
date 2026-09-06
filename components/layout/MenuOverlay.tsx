'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { gsap, useGSAP } from '@/lib/gsap'
import { NAV_LINKS, SITE } from '@/lib/data/site'
import { FEATURED_PROJECTS } from '@/lib/data/projects'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { pad } from '@/lib/utils'

type Props = { open: boolean; onClose: () => void }

/** Full-screen navigation for small viewports, with staggered link reveals. */
export function MenuOverlay({ open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      if (reduced) {
        gsap.set(el, { autoAlpha: open ? 1 : 0 })
        gsap.set('[data-menu-item]', { yPercent: 0, opacity: 1 })
        return
      }

      if (open) {
        gsap
          .timeline()
          .set(el, { autoAlpha: 1, pointerEvents: 'auto' })
          .fromTo(
            '[data-menu-panel]',
            { clipPath: 'inset(0% 0% 100% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.95, ease: 'expo.inOut' },
          )
          .fromTo(
            '[data-menu-item]',
            { yPercent: 120, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1, stagger: 0.06, ease: 'expo.out' },
            '-=0.5',
          )
          .fromTo('[data-menu-meta]', { opacity: 0 }, { opacity: 1, duration: 0.7 }, '-=0.5')
      } else {
        gsap.to(el, {
          autoAlpha: 0,
          duration: 0.5,
          ease: 'expo.out',
          pointerEvents: 'none',
        })
      }
    },
    { scope: ref, dependencies: [open, reduced] },
  )

  return (
    <div
      ref={ref}
      id="menu-overlay"
      className="pointer-events-none fixed inset-0 z-40 opacity-0 lg:hidden"
      inert={!open}
    >
      <div data-menu-panel className="absolute inset-0 bg-paper">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.09]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(133,103,23,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(133,103,23,0.45) 1px, transparent 1px)',
            backgroundSize: '90px 90px',
          }}
        />
      </div>

      <nav
        aria-label="Mobile"
        className="container-luxe relative flex h-full flex-col justify-center pt-[var(--header-h)]"
      >
        <ul className="flex flex-col gap-1">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} className="overflow-hidden">
              <Link
                href={link.href}
                onClick={onClose}
                data-menu-item
                className="display-poster group flex items-baseline gap-4 py-2 text-[13vw] text-ink transition-colors duration-500 hover:text-gold-700 sm:text-[9vw]"
              >
                <span className="font-sans text-[0.6rem] tracking-luxe text-gold-700">
                  {pad(i + 1)}
                </span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          data-menu-meta
          className="mt-14 flex flex-col gap-6 border-t border-ink/12 pt-8 text-sm text-ink/65"
        >
          <div className="flex flex-col gap-1">
            <span className="eyebrow">Latest work</span>
            <Link
              href={`/portfolio/${FEATURED_PROJECTS[0].slug}`}
              onClick={onClose}
              className="link-underline text-ink"
            >
              {FEATURED_PROJECTS[0].title} — {FEATURED_PROJECTS[0].location}
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            <a href={`mailto:${SITE.email}`} className="link-underline text-ink">
              {SITE.email}
            </a>
            <a href={`tel:${SITE.phoneHref}`} className="link-underline text-ink/75">
              {SITE.phone}
            </a>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {SITE.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline text-[0.68rem] uppercase tracking-luxe text-ink/70"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}
