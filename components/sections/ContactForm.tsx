'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { submitToWeb3Forms, Web3FormsError } from '@/lib/forms'

const PROJECT_TYPES = [
  'Residential Interiors',
  'Luxury Villa',
  'Modular Kitchen',
  'Office / Workspace',
  'Hospitality',
  'Turnkey Project',
]

const BUDGETS = ['₹2 – 15 L', '₹15 – 40 L', '₹40 L – 1 Cr', '₹1 – 3 Cr', '₹3 Cr +', 'Not yet defined']

type Errors = Partial<Record<'name' | 'email' | 'phone' | 'message', string>>

function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string
  htmlFor: string
  error?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={htmlFor} className="eyebrow text-ink/70">
        {label}
      </label>
      {children}
      <p
        id={`${htmlFor}-error`}
        role="alert"
        className={cn('min-h-[1rem] text-xs text-red-300/80', !error && 'sr-only')}
      >
        {error}
      </p>
    </div>
  )
}

const inputClass =
  'w-full border-b border-ink/15 bg-transparent py-3 text-fluid-base font-normal text-ink placeholder:text-ink/60 transition-colors duration-500 focus:border-gold-400 focus:outline-none'

/**
 * Enquiry form. Validation runs client-side for immediate feedback; wire
 * `submit()` to a server action or your CRM endpoint before going live.
 */
export function ContactForm() {
  const ref = useRef<HTMLFormElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [type, setType] = useState(PROJECT_TYPES[0])
  const [budget, setBudget] = useState(BUDGETS[2])
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      gsap.fromTo(
        '[data-field]',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.06,
          ease: 'expo.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        },
      )
    },
    { scope: ref, dependencies: [reduced] },
  )

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const next: Errors = {}

    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const location = String(data.get('location') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (name.length < 2) next.name = 'Please tell us your name.'
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(email)) next.email = 'A valid email, please.'
    if (phone.replace(/\D/g, '').length < 8) next.phone = 'A reachable number, please.'
    if (message.length < 20) next.message = 'A little more detail helps us respond properly.'

    setErrors(next)
    if (Object.keys(next).length > 0) {
      const first = ref.current?.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)
      first?.focus()
      return
    }

    setStatus('sending')
    try {
      await submitToWeb3Forms({
        subject: `New project enquiry from ${name} — Elite Decore`,
        from_name: 'Elite Decore Website',
        name,
        email,
        phone,
        location,
        project_type: type,
        budget,
        message,
        botcheck: String(data.get('botcheck') ?? ''),
      })
      setStatus('sent')
      ref.current?.reset()
      setType(PROJECT_TYPES[0])
      setBudget(BUDGETS[2])
    } catch (err) {
      setStatus('error')
      setErrors({
        message:
          err instanceof Web3FormsError
            ? err.message
            : 'Something went wrong sending this — please try WhatsApp or email us directly.',
      })
    }
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="glass flex flex-col items-start gap-5 rounded-arch p-10 shadow-card"
      >
        <span className="eyebrow">Received</span>
        <h3 className="font-display text-fluid-xl font-semibold leading-tight text-ink">
          Thank you — we will respond within one working day.
        </h3>
        <p className="max-w-md text-sm font-normal leading-relaxed text-ink/65">
          A studio director reads every enquiry personally. If your project is time-sensitive,
          call us and ask for the design desk.
        </p>
        <Button onClick={() => setStatus('idle')} variant="outline" size="sm">
          Send another enquiry
        </Button>
      </div>
    )
  }

  return (
    <form ref={ref} onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      {/* Web3Forms honeypot — real visitors never see or fill this. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-8 sm:grid-cols-2">
        <div data-field>
          <Field label="Your name" htmlFor="name" error={errors.name}>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Ira Malhotra"
              aria-invalid={!!errors.name}
              aria-describedby="name-error"
              className={inputClass}
            />
          </Field>
        </div>

        <div data-field>
          <Field label="Email" htmlFor="email" error={errors.email}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              className={inputClass}
            />
          </Field>
        </div>

        <div data-field>
          <Field label="Phone" htmlFor="phone" error={errors.phone}>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+91 98200 00000"
              aria-invalid={!!errors.phone}
              aria-describedby="phone-error"
              className={inputClass}
            />
          </Field>
        </div>

        <div data-field>
          <Field label="Location" htmlFor="location">
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Whitefield, Bangalore"
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <fieldset data-field className="flex flex-col gap-4">
        <legend className="eyebrow text-ink/70">Project type</legend>
        <div className="flex flex-wrap gap-2.5">
          {PROJECT_TYPES.map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name="projectType"
                value={option}
                checked={type === option}
                onChange={() => setType(option)}
                className="peer sr-only"
              />
              <span
                data-cursor="link"
                className="block rounded-pill border border-ink/12 px-5 py-2 text-[0.64rem] uppercase tracking-luxe text-ink/70 transition-all duration-500 ease-expo hover:border-ink/25 hover:text-ink/80 peer-checked:border-gold-600 peer-checked:bg-gold-500/20 peer-checked:text-gold-800 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-400"
              >
                {option}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset data-field className="flex flex-col gap-4">
        <legend className="eyebrow text-ink/70">Indicative budget</legend>
        <div className="flex flex-wrap gap-2.5">
          {BUDGETS.map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name="budget"
                value={option}
                checked={budget === option}
                onChange={() => setBudget(option)}
                className="peer sr-only"
              />
              <span
                data-cursor="link"
                className="block rounded-pill border border-ink/12 px-5 py-2 text-[0.64rem] uppercase tracking-luxe text-ink/70 transition-all duration-500 ease-expo hover:border-ink/25 hover:text-ink/80 peer-checked:border-gold-600 peer-checked:bg-gold-500/20 peer-checked:text-gold-800 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-400"
              >
                {option}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div data-field>
        <Field label="Tell us about the space" htmlFor="message" error={errors.message}>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Carpet area, who will live there, when you would like to move in, and anything you already know you want."
            aria-invalid={!!errors.message}
            aria-describedby="message-error"
            className={cn(inputClass, 'resize-none')}
          />
        </Field>
      </div>

      <div data-field className="flex flex-wrap items-center gap-6 pt-2">
        <MagneticButton>
          <Button type="submit" variant="primary" size="lg" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send Enquiry'}
          </Button>
        </MagneticButton>

        <p className="max-w-xs text-xs font-normal leading-relaxed text-ink/65">
          We reply within one working day. Your details are never shared with vendors.
        </p>
      </div>
    </form>
  )
}
