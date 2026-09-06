'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsTouch } from '@/hooks/useMediaQuery'

/**
 * Two-part cursor: a solid dot pinned to the pointer, and a gold ring that
 * trails it with easing. Elements opt into states via `data-cursor`:
 *   data-cursor="link" | "view" | "drag" | "hide"
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const isTouch = useIsTouch()

  useEffect(() => {
    if (reduced || isTouch) return
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    const setDotX = gsap.quickSetter(dot, 'x', 'px')
    const setDotY = gsap.quickSetter(dot, 'y', 'px')
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'expo.out' })
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'expo.out' })

    let visible = false

    const onMove = (e: PointerEvent) => {
      if (!visible) {
        visible = true
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.4, ease: 'expo.out' })
      }
      setDotX(e.clientX)
      setDotY(e.clientY)
      setRingX(e.clientX)
      setRingY(e.clientY)
    }

    const onLeave = () => {
      visible = false
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.25 })
    }

    const applyState = (target: Element | null) => {
      const host = target?.closest?.('[data-cursor]') as HTMLElement | null
      const state = host?.dataset.cursor
      const text = host?.dataset.cursorLabel ?? ''

      label.textContent = text
      gsap.to(ring, {
        scale: state === 'view' || state === 'drag' ? 3.2 : state === 'link' ? 1.9 : 1,
        borderColor:
          state === 'view' || state === 'drag' ? 'rgba(11,11,11,0)' : 'rgba(11,11,11,0.55)',
        backgroundColor:
          state === 'view' || state === 'drag' ? 'rgba(11,11,11,0.95)' : 'rgba(11,11,11,0)',
        duration: 0.5,
        ease: 'expo.out',
      })
      gsap.to(dot, { scale: state ? 0 : 1, duration: 0.35, ease: 'expo.out' })
      gsap.to(label, { autoAlpha: text ? 1 : 0, duration: 0.3 })
    }

    const onOver = (e: PointerEvent) => applyState(e.target as Element)
    const onDown = () => gsap.to(ring, { scale: 0.82, duration: 0.25, ease: 'expo.out' })
    const onUp = (e: PointerEvent) => applyState(e.target as Element)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced, isTouch])

  if (reduced || isTouch) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70] hidden md:block">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-ink/55 opacity-0"
      >
        <span
          ref={labelRef}
          className="scale-[0.32] whitespace-nowrap font-sans text-[0.62rem] font-semibold uppercase tracking-luxe text-paper opacity-0"
        />
      </div>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-gold-300 opacity-0"
      />
    </div>
  )
}
