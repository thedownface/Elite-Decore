import { cn } from '@/lib/utils'

/**
 * Wordmark + monogram, drawn from the studio's business card:
 * a serif "Elite" over a gold script "Decore", and an E set inside a
 * double gold ring. The monogram doubles as the favicon and preloader mark.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={cn('h-9 w-9', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer gold ring, then the inner hairline — as on the card. */}
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="24" cy="24" r="17.5" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" />
      {/* The E. */}
      <path d="M18 33V15h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
      <path d="M18 24h8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
      <path d="M18 33h11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" />
      {/* The clipped bar that closes the counter on the card's mark. */}
      <path d="M31.5 21.5v5" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2.2" />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-baseline gap-[0.3em] leading-none', className)}>
      <span className="font-serif text-[1.55em] leading-none tracking-[-0.02em]">Elite</span>
      <span className="font-serif text-[1.15em] italic leading-none tracking-[-0.01em] text-gold-700">
        Decore
      </span>
    </span>
  )
}
