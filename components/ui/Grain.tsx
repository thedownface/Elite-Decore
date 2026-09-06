/** Static film-grain + vignette overlay. Pure CSS, zero runtime cost. */
export function Grain() {
  return (
    <>
      <div aria-hidden className="noise-overlay" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[59]"
        style={{
          background:
            'radial-gradient(125% 100% at 50% 0%, transparent 62%, rgba(11,11,11,0.07) 100%)',
        }}
      />
    </>
  )
}
