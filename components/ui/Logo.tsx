import { cn } from '@/lib/utils'

/**
 * Wordmark + monogram. The monogram is drawn from the studio's own logo
 * mark (assets/logo) — an E interlocked with a D shaped as a gabled roof,
 * its window lit in gold. Strokes use `currentColor` so the mark reads on
 * both the paper-light header and the ink-dark footer/preloader; the window
 * stays a fixed gold-500, the one warm light in the mark either way. Doubles
 * as the favicon and preloader mark.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      className={cn('h-9 w-9', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* E interlocked with D. */}
      <g stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M10 8v50" />
        <path d="M10 8h20" />
        <path d="M10 33h8" />
        <path d="M10 58h20" />
        <path d="M30 8c18 0 27 11 27 25s-9 25-27 25" />
      </g>
      {/* The roofline the D's bowl is built around. */}
      <path
        d="M26 46l10-12 10 12"
        stroke="currentColor"
        strokeWidth="3.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* The lit window. */}
      <g fill="#C9A227">
        <rect x="31.4" y="47.5" width="4" height="4" />
        <rect x="36.6" y="47.5" width="4" height="4" />
        <rect x="31.4" y="52.7" width="4" height="4" />
        <rect x="36.6" y="52.7" width="4" height="4" />
      </g>
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
