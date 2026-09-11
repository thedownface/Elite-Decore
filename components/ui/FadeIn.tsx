'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { EASE, REVEAL_START } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  /** Stagger direct children instead of animating the wrapper. */
  stagger?: number
}

/** Scroll-triggered entrance used for body copy, lists and cards. */
export function FadeIn({ children, className, delay = 0, y = 32, stagger }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      if (reduced) {
        gsap.set(stagger ? el.children : el, { opacity: 1, y: 0 })
        return
      }

      gsap.fromTo(
        stagger ? el.children : el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          delay,
          ease: EASE.expo,
          ...(stagger ? { stagger } : {}),
          scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
        },
      )
    },
    { scope: ref, dependencies: [reduced] },
  )

  // In stagger mode, GSAP animates each child's own opacity (set immediately
  // via fromTo, before the trigger fires) — the wrapper itself is never
  // animated, so it must not carry a static opacity-0 class or its children
  // stay invisible forever, regardless of their own opacity.
  return (
    <div ref={ref} className={cn(!reduced && !stagger && 'opacity-0', className)}>
      {children}
    </div>
  )
}
