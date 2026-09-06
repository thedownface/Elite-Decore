import { cn } from '@/lib/utils'

/** Wordmark + monogram. The monogram doubles as the favicon and preloader mark. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      className={cn('h-9 w-9', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="46" height="46" rx="10" stroke="currentColor" strokeOpacity="0.4" />
      <path d="M14 33V15h11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      <path d="M14 24h9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      <path d="M14 33h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      <path
        d="M30 15h3.2c3.6 0 5.8 3.4 5.8 9s-2.2 9-5.8 9H30V15Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-baseline gap-[0.42em] leading-none', className)}>
      <span className="font-serif text-[1.55em] leading-none tracking-[-0.02em]">Elite</span>
      <span className="font-sans text-[0.6em] font-semibold uppercase tracking-luxe text-gold-700">
        Decofe
      </span>
    </span>
  )
}
