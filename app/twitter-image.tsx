import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/data/site'

export const alt = `${SITE.name} — ${SITE.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Branded social card, rendered at build time. Kept to system serif/sans so it
 * needs no font fetch and cannot fail the build on a cold network.
 */
export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(140deg, #141310 0%, #0A0A0A 55%, #0d0b06 100%)',
          color: '#F6F4EF',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 14,
              border: '1px solid rgba(201,162,39,0.45)',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
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
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 30, letterSpacing: '-0.02em' }}>Elite</span>
            <span
              style={{
                fontSize: 14,
                letterSpacing: '0.3em',
                color: '#DCC377',
                fontFamily: 'Helvetica, sans-serif',
              }}
            >
              DECORE
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              fontSize: 82,
              lineHeight: 1.04,
              letterSpacing: '-0.035em',
              maxWidth: 900,
            }}
          >
            <span>Creative Meets</span>
            <span style={{ color: '#DCC377', fontStyle: 'italic', marginLeft: 20 }}>
              Living
            </span>
          </div>
          <div style={{ width: 220, height: 2, background: '#C9A227' }} />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 19,
            letterSpacing: '0.18em',
            color: 'rgba(246,244,239,0.45)',
            fontFamily: 'Helvetica, sans-serif',
          }}
        >
          <span>INTERIOR DESIGN</span>
          <span>BENGALURU · EST. {SITE.founded}</span>
        </div>
      </div>
    ),
    size,
  )
}
