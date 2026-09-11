import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/** Apple touch icon — the studio monogram, with the "Elite Decore" wordmark
 *  beneath it (an iOS home-screen tile has no room for both at favicon size,
 *  so it earns the extra 180px). */
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
          gap: 10,
          background: 'linear-gradient(150deg, #141414 0%, #0A0A0A 100%)',
        }}
      >
        <svg width="88" height="88" viewBox="0 0 64 64" fill="none">
          <path
            d="M10 8v50M10 8h20M10 33h8M10 58h20M30 8c18 0 27 11 27 25s-9 25-27 25"
            stroke="#F4F3EF"
            strokeWidth="4.4"
          />
          <path d="M26 46l10-12 10 12" stroke="#F4F3EF" strokeWidth="4" />
          <rect x="31.4" y="47.5" width="4" height="4" fill="#C9A227" />
          <rect x="36.6" y="47.5" width="4" height="4" fill="#C9A227" />
          <rect x="31.4" y="52.7" width="4" height="4" fill="#C9A227" />
          <rect x="36.6" y="52.7" width="4" height="4" fill="#C9A227" />
        </svg>
        <div
          style={{
            fontSize: 15,
            letterSpacing: '0.22em',
            color: '#F6F4EF',
            fontFamily: 'Georgia, serif',
          }}
        >
          ELITE DECORE
        </div>
      </div>
    ),
    size,
  )
}
