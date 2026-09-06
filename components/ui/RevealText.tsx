'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { EASE, REVEAL_START, STAGGER } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Intrinsic tags only — each accepts className, children and an element ref. */
type RevealTag = 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4'

type Props = {
  children: string
  as?: RevealTag
  className?: string
  /** Split granularity — lines stay intact, words stagger individually. */
  split?: 'words' | 'lines'
  delay?: number
  /** Play immediately (hero) instead of waiting for scroll. */
  immediate?: boolean
}

/**
 * Mask-based text reveal. Each fragment sits inside an overflow-hidden box and
 * rises from below, which reads far more expensively than a plain fade.
 * The full string is always present in the DOM for screen readers and SEO.
 */
export function RevealText({
  children,
  as = 'span',
  className,
  split = 'words',
  delay = 0,
  immediate = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // All members of RevealTag share the same prop shape; `div` stands in for the union.
  const Tag = as as 'div'

  useGSAP(
    () => {
      if (reduced) {
        gsap.set('[data-reveal-item]', { yPercent: 0, opacity: 1 })
        return
      }

      gsap.fromTo(
        '[data-reveal-item]',
        { yPercent: 118, opacity: 0, rotate: 1.5 },
        {
          yPercent: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.25,
          delay,
          ease: EASE.expo,
          stagger: split === 'words' ? STAGGER.tight : STAGGER.base,
          ...(immediate
            ? {}
            : { scrollTrigger: { trigger: ref.current, start: REVEAL_START, once: true } }),
        },
      )
    },
    { scope: ref, dependencies: [reduced, children] },
  )

  const fragments = split === 'words' ? children.split(' ') : children.split('\n')

  return (
    <Tag ref={ref} className={cn('block', className)}>
      <span className="sr-only">{children}</span>
      <span aria-hidden className={split === 'words' ? 'inline' : 'block'}>
        {fragments.map((fragment, i) => (
          <span
            key={`${fragment}-${i}`}
            className={cn(
              'overflow-hidden pb-[0.12em]',
              split === 'words' ? 'inline-flex' : 'block',
            )}
          >
            <span data-reveal-item className="inline-block will-transform">
              {fragment}
            </span>
            {split === 'words' && i < fragments.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </Tag>
  )
}
