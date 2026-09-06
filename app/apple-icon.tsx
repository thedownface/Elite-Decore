import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          background: 'linear-gradient(150deg, #141414 0%, #0A0A0A 100%)',
          color: '#C9A227',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ fontSize: 82, letterSpacing: '-0.05em', lineHeight: 1 }}>ED</div>
        <div
          style={{
            fontSize: 13,
            letterSpacing: '0.28em',
            color: '#F6F4EF',
            opacity: 0.6,
          }}
        >
          DECOFE
        </div>
      </div>
    ),
    size,
  )
}
