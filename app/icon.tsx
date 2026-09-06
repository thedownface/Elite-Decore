import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

/** Generated favicon — the studio monogram on ink. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0A',
          color: '#C9A227',
          fontSize: 34,
          fontFamily: 'Georgia, serif',
          letterSpacing: '-0.04em',
          borderRadius: 14,
        }}
      >
        ED
      </div>
    ),
    size,
  )
}
