'use client'

import Link from 'next/link'
import { useState } from 'react'
import { NAV_LINKS, SITE } from '@/lib/data/site'
import { SERVICES } from '@/lib/data/services'
import { Wordmark } from '@/components/ui/Logo'
import { RevealText } from '@/components/ui/RevealText'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { Button } from '@/components/ui/Button'

function Newsletter() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'done' | 'error'>('idle')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) {
      setState('error')
      return
    }
    // Wire to your ESP (Klaviyo / Mailchimp / Resend) here.
    setState('done')
    setEmail('')
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <label htmlFor="footer-email" className="eyebrow">
        The Quarterly Folio
      </label>
      <p className="max-w-xs text-sm font-normal leading-relaxed text-ink/60">
        Four letters a year on material, craft and the projects we are proudest of.
      </p>

      <div className="mt-2 flex items-center gap-2 border-b border-ink/15 pb-2 transition-colors duration-500 focus-within:border-gold-400">
        <input
          id="footer-email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setState('idle')
          }}
          placeholder="your@email.com"
          aria-describedby="footer-email-status"
          className="w-full bg-transparent py-1 text-sm text-ink placeholder:text-ink/60 focus:outline-none"
        />
        <button
          type="submit"
          data-cursor="link"
          className="shrink-0 font-sans text-[0.62rem] uppercase tracking-luxe text-gold-700 transition-colors duration-500 hover:text-gold-800"
        >
          Subscribe
        </button>
      </div>

      <p
        id="footer-email-status"
        role="status"
        aria-live="polite"
        className="min-h-[1.1rem] text-xs text-ink/70"
      >
        {state === 'done' && 'Thank you — please confirm via the email we just sent.'}
        {state === 'error' && 'Please enter a valid email address.'}
      </p>
    </form>
  )
}

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-44 left-1/2 h-80 w-[120%] -translate-x-1/2 rounded-[100%] bg-gold-300/25 blur-3xl"
      />

      <div className="container-luxe relative py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-8 lg:col-span-5">
            <Link href="/" className="w-fit text-ink" aria-label={`${SITE.name} — home`}>
              <Wordmark className="text-[19px]" />
            </Link>

            <RevealText
              as="p"
              className="max-w-md font-display text-fluid-xl font-semibold leading-[1.08] tracking-tightest text-ink"
            >
              Interiors composed with restraint, built with obsession.
            </RevealText>

            <MagneticButton className="w-fit">
              <Button href="/contact" variant="primary" size="md">
                Start a Project
              </Button>
            </MagneticButton>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="eyebrow mb-6">Studio</h2>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="link-underline text-sm text-ink/70 transition-colors hover:text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="lg:col-span-2">
            <h2 className="eyebrow mb-6">Services</h2>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services#${s.id}`}
                    className="link-underline text-sm text-ink/70 transition-colors hover:text-ink"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-10 lg:col-span-3">
            <div className="flex flex-col gap-3">
              <h2 className="eyebrow">Studio</h2>
              <address className="text-sm font-normal not-italic leading-relaxed text-ink/70">
                {SITE.address.street}
                <br />
                {SITE.address.district}, {SITE.address.city}
                <br />
                {SITE.address.region} {SITE.address.postalCode}
              </address>
              <a
                href={`mailto:${SITE.email}`}
                className="link-underline w-fit text-sm text-ink/85"
                data-cursor="link"
              >
                {SITE.email}
              </a>
              <a
                href={`tel:${SITE.phoneHref}`}
                className="link-underline w-fit text-sm text-ink/85"
                data-cursor="link"
              >
                {SITE.phone}
              </a>
              <a
                href={`https://wa.me/${SITE.whatsappHref}?text=${encodeURIComponent(
                  "Hi Elite Decore, I'd like to talk about an interior project.",
                )}`}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline w-fit text-sm text-ink/85"
                data-cursor="link"
              >
                WhatsApp us
              </a>
              <span className="text-xs text-ink/65">{SITE.hours}</span>
            </div>

            <Newsletter />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-ink/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-7 gap-y-2">
            {SITE.socials.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                data-cursor="link"
                className="link-underline text-[0.66rem] uppercase tracking-luxe text-ink/60 transition-colors hover:text-gold-700"
              >
                {s.label}
              </a>
            ))}
          </div>

          <p className="text-[0.66rem] uppercase tracking-luxe text-ink/60">
            © {year} {SITE.legalName} · All rights reserved
          </p>
        </div>
      </div>

      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[0.22em] whitespace-nowrap text-center font-display text-[19vw] font-semibold leading-none tracking-tightest text-white/[0.035]">
          ELITE DECORE
        </p>
      </div>
    </footer>
  )
}
