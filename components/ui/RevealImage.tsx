'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { EASE } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Props = {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  priority?: boolean
  sizes?: string
  /** Parallax travel in px across the full scroll of the element. */
  parallax?: number
  /** Clip-path direction for the entrance mask. */
  from?: 'bottom' | 'left' | 'right'
  quality?: number
  fill?: boolean
  width?: number
  height?: number
}

/**
 * The studio's signature image treatment: a clip-path curtain lifts while the
 * photograph itself un-scales from 1.18, so the frame and its content arrive at
 * different rates. Parallax continues on scroll.
 */
export function RevealImage({
  src,
  alt,
  className,
  imageClassName,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw',
  parallax = 0,
  from = 'bottom',
  quality = 78,
  fill = true,
  width,
  height,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const media = el.querySelector('[data-reveal-media]')
      if (!media) return

      if (reduced) {
        gsap.set(el, { clipPath: 'inset(0% 0% 0% 0%)' })
        gsap.set(media, { scale: 1 })
        return
      }

      const start =
        from === 'bottom'
          ? 'inset(0% 0% 100% 0%)'
          : from === 'left'
            ? 'inset(0% 100% 0% 0%)'
            : 'inset(0% 0% 0% 100%)'

      gsap
        .timeline({ scrollTrigger: { trigger: el, start: 'top 88%', once: true } })
        .fromTo(
          el,
          { clipPath: start },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: EASE.expo },
        )
        .fromTo(media, { scale: 1.18 }, { scale: 1, duration: 1.8, ease: EASE.expo }, 0)

      if (parallax !== 0) {
        gsap.fromTo(
          media,
          { yPercent: -parallax / 2 },
          {
            yPercent: parallax / 2,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 },
          },
        )
      }
    },
    { scope: ref, dependencies: [reduced] },
  )

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden bg-paper-muted', className)}
      style={reduced ? undefined : { clipPath: 'inset(0% 0% 100% 0%)' }}
    >
      <div data-reveal-media className="absolute inset-0 h-[calc(100%+8%)] -top-[4%] will-transform">
        <Image
          src={src}
          alt={alt}
          {...(fill ? { fill: true } : { width: width ?? 1600, height: height ?? 1200 })}
          sizes={sizes}
          quality={quality}
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          className={cn('h-full w-full object-cover', imageClassName)}
        />
      </div>
    </div>
  )
}
