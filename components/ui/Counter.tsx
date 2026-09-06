'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { EASE } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Props = {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

/** Counts from zero to `value` the first time it enters the viewport. */
export function Counter({ value, suffix = '', duration = 2.4, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      if (reduced) {
        el.textContent = `${value}${suffix}`
        return
      }

      const counter = { n: 0 }
      gsap.to(counter, {
        n: value,
        duration,
        ease: EASE.expo,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.n)}${suffix}`
        },
      })
    },
    { scope: ref, dependencies: [reduced, value] },
  )

  return (
    <span ref={ref} className={cn('tabular-nums', className)} aria-label={`${value}${suffix}`}>
      {reduced ? `${value}${suffix}` : `0${suffix}`}
    </span>
  )
}
