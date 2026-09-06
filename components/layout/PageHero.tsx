'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { RevealText } from '@/components/ui/RevealText'
import { FadeIn } from '@/components/ui/FadeIn'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Props = {
  eyebrow: string
  title: string
  description?: string
  image?: string
  imageAlt?: string
  breadcrumb?: { label: string; href: string }[]
  meta?: { label: string; value: string }[]
  className?: string
}

/** Shared inner-page opener — a quieter cousin of the home hero. */
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = '',
  breadcrumb,
  meta,
  className,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced || !image) return
      gsap.to('[data-page-plate]', {
        yPercent: 14,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 1 },
      })
    },
    { scope: ref, dependencies: [reduced, image] },
  )

  return (
    <section
      ref={ref}
      className={cn(
        'relative flex items-end overflow-hidden bg-paper pt-[var(--header-h)]',
        image ? 'min-h-[74svh]' : 'min-h-[52svh]',
        className,
      )}
    >
      {image && (
        <>
          <div data-page-plate className="absolute inset-0 will-transform">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              quality={78}
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-paper via-paper/85 to-paper/45"
          />
        </>
      )}

      {!image && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[80%] -translate-x-1/2 rounded-[100%] bg-gold-300/25 blur-3xl"
        />
      )}

      <div className="container-luxe relative z-10 py-16 md:py-24">
        {breadcrumb && (
          <FadeIn y={10}>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-[0.62rem] uppercase tracking-luxe text-ink/65">
                {breadcrumb.map((crumb, i) => (
                  <li key={crumb.href} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden>/</span>}
                    {i === breadcrumb.length - 1 ? (
                      <span aria-current="page" className="text-gold-700">
                        {crumb.label}
                      </span>
                    ) : (
                      <Link href={crumb.href} className="link-underline hover:text-ink">
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </FadeIn>
        )}

        <FadeIn y={12}>
          <span className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-gold-500/60" aria-hidden />
            {eyebrow}
          </span>
        </FadeIn>

        <RevealText
          as="h1"
          immediate
          delay={0.15}
          className="display-poster mt-6 max-w-[18ch] text-[clamp(2.4rem,7.6vw,7rem)] text-ink"
        >
          {title}
        </RevealText>

        {description && (
          <FadeIn delay={0.3}>
            <p className="mt-8 max-w-2xl text-fluid-base font-normal leading-relaxed text-ink/65">
              {description}
            </p>
          </FadeIn>
        )}

        {meta && (
          <FadeIn delay={0.4}>
            <dl className="mt-12 flex flex-wrap gap-x-14 gap-y-6 border-t border-ink/10 pt-8">
              {meta.map((item) => (
                <div key={item.label} className="flex flex-col gap-1.5">
                  <dt className="text-[0.6rem] uppercase tracking-luxe text-ink/60">
                    {item.label}
                  </dt>
                  <dd className="font-display text-lg font-semibold tracking-tightest text-ink">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
