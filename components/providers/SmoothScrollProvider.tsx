'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { LenisContext } from '@/hooks/useLenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Drives the entire site's scroll.
 *
 * Lenis owns the scroll position; GSAP's ticker owns the clock. Running both on
 * one RAF loop keeps ScrollTrigger perfectly in phase with the smoothed scroll —
 * without this, pinned sections drift by a frame and jitter visibly.
 *
 * When the visitor prefers reduced motion we never instantiate Lenis at all and
 * leave native scrolling untouched.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const reduced = useReducedMotion()
  const pathname = usePathname()

  useEffect(() => {
    if (reduced) return

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
      syncTouch: false,
      autoRaf: false,
    })

    setLenis(instance)

    const raf = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Lenis scrolls the window itself, so ScrollTrigger's default scroller is
    // already correct — it only needs to be told when a frame has moved.
    instance.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(raf)
      instance.destroy()
      setLenis(null)
    }
  }, [reduced])

  // Reset scroll + recalculate triggers on route change.
  //
  // When the URL carries a hash, the browser has already performed its own
  // anchor jump and Lenis picks that position up on its next frame — so leave it
  // alone. Re-implementing the jump only races the browser and lands wrong while
  // images are still sizing. All this needs to do is refresh ScrollTrigger once
  // the page has settled, since pinned sections measure against final layout.
  useEffect(() => {
    const hasHash = window.location.hash.length > 1
    let timer = 0

    if (!hasHash) {
      if (lenis) lenis.scrollTo(0, { immediate: true })
      else window.scrollTo(0, 0)
    }

    const settle = () => {
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 160)
    }

    if (document.readyState === 'complete') settle()
    else window.addEventListener('load', settle, { once: true })

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('load', settle)
    }
  }, [pathname, lenis])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
