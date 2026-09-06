'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsTouch } from '@/hooks/useMediaQuery'

type Props = {
  children: React.ReactNode
  className?: string
  /** Pull distance in px at the edge of the activation field. */
  strength?: number
  /** How far outside the element the magnet reaches, as a ratio of its size. */
  radius?: number
}

/**
 * Wraps any interactive element and pulls it toward the pointer, with the inner
 * content lagging slightly behind for a sense of weight. Disabled entirely for
 * touch devices and reduced-motion users.
 */
export function MagneticButton({ children, className, strength = 26, radius = 1.6 }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const isTouch = useIsTouch()

  useEffect(() => {
    if (reduced || isTouch) return
    const wrap = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return

    const xTo = gsap.quickTo(wrap, 'x', { duration: 0.9, ease: 'expo.out' })
    const yTo = gsap.quickTo(wrap, 'y', { duration: 0.9, ease: 'expo.out' })
    const ixTo = gsap.quickTo(inner, 'x', { duration: 1.2, ease: 'expo.out' })
    const iyTo = gsap.quickTo(inner, 'y', { duration: 1.2, ease: 'expo.out' })

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const reach = Math.max(rect.width, rect.height) * radius
      const dist = Math.hypot(dx, dy)

      if (dist > reach) {
        xTo(0)
        yTo(0)
        ixTo(0)
        iyTo(0)
        return
      }

      const pull = (1 - dist / reach) * strength
      const ux = (dx / (dist || 1)) * pull
      const uy = (dy / (dist || 1)) * pull

      xTo(ux)
      yTo(uy)
      ixTo(ux * 0.35)
      iyTo(uy * 0.35)
    }

    const onLeave = () => {
      xTo(0)
      yTo(0)
      ixTo(0)
      iyTo(0)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('blur', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('blur', onLeave)
    }
  }, [reduced, isTouch, strength, radius])

  return (
    <div ref={wrapRef} className={cn('inline-block will-transform', className)}>
      <div ref={innerRef} className="will-transform">
        {children}
      </div>
    </div>
  )
}
