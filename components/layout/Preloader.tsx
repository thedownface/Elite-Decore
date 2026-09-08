'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { Monogram } from '@/components/ui/Logo'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useLenis } from '@/hooks/useLenis'
import { pad } from '@/lib/utils'

const SESSION_KEY = 'ed:intro-played'

/**
 * First-visit intro: the monogram draws itself while a counter climbs to 100,
 * then two panels split apart to hand over to the hero. Plays once per session,
 * and is skipped entirely under reduced-motion.
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const lenis = useLenis()
  const [done, setDone] = useState(false)

  // The provider publishes Lenis asynchronously, so the timeline reads it from a
  // ref rather than closing over whatever it was on the first render (null).
  const lenisRef = useRef(lenis)
  useEffect(() => {
    lenisRef.current = lenis
  }, [lenis])

  useGSAP(
    () => {
      const root = rootRef.current
      if (!root) return

      const alreadyPlayed =
        typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY) === '1'

      if (reduced || alreadyPlayed) {
        setDone(true)
        document.documentElement.dataset.intro = 'done'
        return
      }

      document.body.style.overflow = 'hidden'
      lenisRef.current?.stop()

      const count = { n: 0 }
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem(SESSION_KEY, '1')
          document.body.style.overflow = ''
          document.documentElement.dataset.intro = 'done'
          lenisRef.current?.start()
          setDone(true)
        },
      })

      tl.to('[data-intro-mark] path', {
        strokeDashoffset: 0,
        duration: 1.5,
        stagger: 0.12,
        ease: 'expo.out',
      })
        .to('[data-intro-mark] rect', { opacity: 0.4, duration: 0.8 }, 0.3)
        .from('[data-intro-word]', { yPercent: 120, duration: 1.1, ease: 'expo.out' }, 0.35)
        .to(
          count,
          {
            n: 100,
            duration: 1.9,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (counterRef.current) counterRef.current.textContent = pad(Math.round(count.n), 3)
            },
          },
          0,
        )
        .to('[data-intro-line]', { scaleX: 1, duration: 1.9, ease: 'power2.inOut' }, 0)
        .to('[data-intro-content]', { autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, '+=0.15')
        .to(
          '[data-intro-panel]',
          {
            scaleY: 0,
            duration: 1.2,
            ease: 'expo.inOut',
            stagger: { each: 0.08, from: 'start' },
            transformOrigin: 'top center',
          },
          '-=0.15',
        )
    },
    { scope: rootRef, dependencies: [reduced] },
  )

  if (done) return null

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[100] flex items-center justify-center"
    >
      <div className="absolute inset-0 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} data-intro-panel className="h-full flex-1 origin-top bg-paper" />
        ))}
      </div>

      <div
        data-intro-content
        className="relative flex flex-col items-center gap-8 px-6 text-center"
      >
        <div data-intro-mark className="text-gold-700 [&_path]:[stroke-dasharray:60] [&_path]:[stroke-dashoffset:60] [&_rect]:opacity-0">
          <Monogram className="h-16 w-16" />
        </div>

        <div className="overflow-hidden">
          <span
            data-intro-word
            className="block font-display text-2xl font-bold uppercase tracking-[0.02em] text-ink md:text-4xl"
          >
            ELITE DECORE
          </span>
        </div>

        <div className="relative h-px w-56 overflow-hidden bg-ink/12 md:w-72">
          <div
            data-intro-line
            className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-gold-800 via-gold-600 to-gold-400"
          />
        </div>

        <span
          ref={counterRef}
          className="font-sans text-[0.65rem] tracking-luxe text-ink/70 tabular-nums"
        >
          000
        </span>
      </div>
    </div>
  )
}
