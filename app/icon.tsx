import { ImageResponse } from 'next/og'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

/** Generated favicon — the studio monogram (E interlocked with a
 *  gable-roofed D, its window lit gold) on ink. */
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
          borderRadius: 14,
        }}
      >
        <svg width="46" height="46" viewBox="0 0 64 64" fill="none">
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
      </div>
    ),
    size,
  )
}
