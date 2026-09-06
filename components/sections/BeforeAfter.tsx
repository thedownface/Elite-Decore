'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { IMG } from '@/lib/images'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { clamp } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Comparison slider.
 *
 * Position is a motion value fed through a spring, so both pointer drags and
 * keyboard steps land with the same weighted settle. The handle is a real
 * slider role with arrow-key support — this is not a mouse-only control.
 */
export function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const reduced = useReducedMotion()

  const position = useMotionValue(50)
  const spring = useSpring(position, {
    stiffness: reduced ? 800 : 190,
    damping: reduced ? 60 : 26,
    mass: 0.7,
  })

  const clipPath = useTransform(spring, (v) => `inset(0 ${100 - v}% 0 0)`)
  const handleLeft = useTransform(spring, (v) => `${v}%`)

  const setFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    position.set(clamp(((clientX - rect.left) / rect.width) * 100, 0, 100))
  }, [position])

  useEffect(() => {
    if (!dragging) return
    const onMove = (e: PointerEvent) => setFromClientX(e.clientX)
    const onUp = () => setDragging(false)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [dragging, setFromClientX])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 4
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      position.set(clamp(position.get() - step, 0, 100))
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      position.set(clamp(position.get() + step, 0, 100))
    }
    if (e.key === 'Home') position.set(0)
    if (e.key === 'End') position.set(100)
  }

  return (
    <section
      className="relative overflow-hidden bg-paper py-24 md:py-32"
      aria-labelledby="transform-heading"
    >
      <div className="container-luxe">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Transformation"
            title="The same four walls, reconsidered."
            as="h2"
            className="lg:max-w-3xl"
          />
          <p className="max-w-sm text-sm font-normal leading-relaxed text-ink/70 lg:pb-3">
            Worli, 2,400 sq ft. Nine partitions removed, one structural core kept,
            fourteen weeks on site.
          </p>
        </div>
        <h2 id="transform-heading" className="sr-only">
          Before and after
        </h2>

        <div
          ref={containerRef}
          className="relative mt-14 aspect-[16/11] w-full select-none overflow-hidden rounded-arch-lg ring-1 ring-ink/10 md:aspect-[16/9]"
          onPointerDown={(e) => {
            setDragging(true)
            setFromClientX(e.clientX)
          }}
          data-cursor="drag"
          data-cursor-label="Drag"
        >
          {/* After (base layer) */}
          <Image
            src={IMG.afterState}
            alt="The completed living room after renovation, in warm neutral tones with bespoke joinery"
            fill
            sizes="(max-width: 1024px) 100vw, 90vw"
            quality={78}
            loading="lazy"
            className="object-cover"
          />

          {/* Before (clipped layer) */}
          <motion.div style={{ clipPath }} className="absolute inset-0">
            <Image
              src={IMG.beforeState}
              alt="The same room before renovation, with dated partitions and low light"
              fill
              sizes="(max-width: 1024px) 100vw, 90vw"
              quality={72}
              loading="lazy"
              className="object-cover grayscale"
            />
            <div aria-hidden className="absolute inset-0 bg-ink/15" />
          </motion.div>

          {/* Labels */}
          <span className="pointer-events-none absolute left-5 top-5 rounded-pill border border-ink/20 bg-paper/85 px-4 py-1.5 text-[0.6rem] uppercase tracking-luxe text-ink/80 backdrop-blur-sm">
            Before
          </span>
          <span className="pointer-events-none absolute right-5 top-5 rounded-pill border border-gold-600/70 bg-paper/85 px-4 py-1.5 text-[0.6rem] uppercase tracking-luxe text-gold-700 backdrop-blur-sm">
            After
          </span>

          {/* Handle */}
          <motion.div
            style={{ left: handleLeft }}
            className="absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-gold-300/80"
          >
            <button
              type="button"
              role="slider"
              aria-label="Reveal the space before and after renovation"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(spring.get())}
              aria-orientation="horizontal"
              onKeyDown={onKeyDown}
              onPointerDown={() => setDragging(true)}
              data-cursor="hide"
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-gold-700 bg-paper/85 text-gold-700 backdrop-blur-md transition-transform duration-500 ease-expo hover:scale-110 focus-visible:scale-110"
            >
              <span aria-hidden className="flex items-center gap-1 text-xs">
                <span className="translate-x-0">←</span>
                <span>→</span>
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
