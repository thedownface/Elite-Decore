'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SITE } from '@/lib/data/site'
import { AnimatedLink } from '@/components/ui/AnimatedLink'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Button } from '@/components/ui/Button'
import { Monogram, Wordmark } from '@/components/ui/Logo'
import { useLenis } from '@/hooks/useLenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { MenuOverlay } from './MenuOverlay'

export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const lenis = useLenis()
  const reduced = useReducedMotion()

  // Hide on scroll down, reveal on scroll up.
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    let last = window.scrollY
    let frame = 0

    const update = () => {
      frame = 0
      const y = window.scrollY
      setScrolled(y > 40)

      if (!open && !reduced) {
        const goingDown = y > last && y > 220
        gsap.to(el, {
          yPercent: goingDown ? -110 : 0,
          duration: 0.7,
          ease: 'expo.out',
          overwrite: true,
        })
      }
      last = y
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [open, reduced])

  // Lock scroll while the overlay menu is open.
  useEffect(() => {
    if (open) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open, lenis])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-700 ease-expo',
          scrolled && !open
            ? 'border-b border-ink/10 bg-paper/85 shadow-soft backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="container-luxe flex h-[var(--header-h)] items-center justify-between gap-8">
          <Link
            href="/"
            data-cursor="link"
            aria-label={`${SITE.name} — home`}
            className="relative z-10 flex items-center gap-2.5 text-ink transition-colors duration-500 hover:text-gold-700"
          >
            <Monogram className="h-8 w-8 shrink-0" />
            <Wordmark className="text-[15px]" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {NAV_LINKS.map((link) => (
              <AnimatedLink
                key={link.href}
                href={link.href}
                className="font-sans text-[0.68rem] font-medium uppercase tracking-luxe"
              >
                {link.label}
              </AnimatedLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <MagneticButton className="hidden sm:block">
              <Button href="/contact" size="sm" variant="outline">
                Book Consultation
              </Button>
            </MagneticButton>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-overlay"
              aria-label={open ? 'Close menu' : 'Open menu'}
              data-cursor="link"
              className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-500 hover:border-gold-600 hover:text-gold-700 lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden className="flex flex-col items-center gap-[5px]">
                <span
                  className={cn(
                    'block h-px w-4 bg-current transition-transform duration-500 ease-expo',
                    open && 'translate-y-[3px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'block h-px w-4 bg-current transition-transform duration-500 ease-expo',
                    open && '-translate-y-[3px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  )
}
