'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { MagneticButton } from '@/components/ui/MagneticButton'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Replace with your error reporting sink (Sentry, Axiom, etc).
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[80svh] items-center bg-paper pt-[var(--header-h)]">
      <div className="container-luxe flex max-w-xl flex-col gap-7">
        <span className="eyebrow">Something went wrong</span>
        <h1 className="font-display text-fluid-2xl font-semibold leading-tight text-ink">
          An unexpected fault on our side.
        </h1>
        <p className="text-fluid-base font-normal leading-relaxed text-ink/65">
          The page failed to render. Try again — if it persists, write to us and we will
          look into it directly.
        </p>
        <div className="flex flex-wrap gap-4">
          <MagneticButton>
            <Button onClick={reset} variant="primary" size="md">
              Try again
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button href="/" variant="outline" size="md">
              Return home
            </Button>
          </MagneticButton>
        </div>
        {error.digest && (
          <p className="text-[0.62rem] uppercase tracking-luxe text-ink/60">
            Reference {error.digest}
          </p>
        )}
      </div>
    </div>
  )
}
