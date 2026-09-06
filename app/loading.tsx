/** Route-level fallback — a quiet gold hairline rather than a spinner. */
export default function Loading() {
  return (
    <div className="flex min-h-[70svh] items-center justify-center bg-paper" role="status">
      <span className="sr-only">Loading</span>
      <span aria-hidden className="relative h-px w-48 overflow-hidden bg-ink/10">
        <span className="absolute inset-y-0 left-0 w-1/3 animate-marquee bg-gradient-to-r from-transparent via-gold-400 to-transparent [animation-duration:1.4s]" />
      </span>
    </div>
  )
}
