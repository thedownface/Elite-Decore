'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'
import { Logo } from '@/components/ui/Logo'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useLenis } from '@/hooks/useLenis'
import { pad } from '@/lib/utils'

const SESSION_KEY = 'ed:intro-played'

/**
 * First-visit intro: a dark stage matching the studio's own logo art — an
 * ambient glow blooms in behind the logo as it wipes in from the left, while
 * a counter climbs to 100. Two dark panels
 * then split apart to hand over to the paper-light hero underneath. Plays
 * once per session, and is skipped entirely under reduced-motion.
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

      tl.to('[data-intro-glow]', { opacity: 1, scale: 1, duration: 2.2, ease: 'expo.out' }, 0)
        .fromTo(
          '[data-intro-mark]',
          { clipPath: 'inset(0% 100% 0% 0%)', autoAlpha: 0, scale: 0.94 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            autoAlpha: 1,
            scale: 1,
            duration: 1.6,
            ease: 'expo.out',
          },
          0.15,
        )
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
          <div key={i} data-intro-panel className="h-full flex-1 origin-top bg-ink" />
        ))}
      </div>

      {/* Ambient bloom, lifted from the studio's own logo art. */}
      <div
        data-intro-glow
        className="pointer-events-none absolute h-[70vh] w-[70vh] max-w-[640px] scale-90 opacity-0 mix-blend-screen"
      >
        <Image
          src="/images/logo/monogram-glow.png"
          alt=""
          fill
          priority
          quality={80}
          sizes="640px"
          className="object-contain blur-2xl"
        />
      </div>

      <div
        data-intro-content
        className="relative flex flex-col items-center gap-8 px-6 text-center"
      >
        <div data-intro-mark className="opacity-0">
          <Logo tone="light" priority className="h-28 md:h-40" />
        </div>

        <div className="relative h-px w-56 overflow-hidden bg-paper/15 md:w-72">
          <div
            data-intro-line
            className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-gold-800 via-gold-500 to-gold-300"
          />
        </div>

        <span
          ref={counterRef}
          className="font-sans text-[0.65rem] tracking-luxe text-paper/70 tabular-nums"
        >
          000
        </span>
      </div>
    </div>
  )
}
