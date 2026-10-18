import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/data/site'
import { logoDataUrl } from '@/lib/logo-asset'

export const alt = `${SITE.name} — ${SITE.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Branded social card, rendered at build time. Kept to system serif/sans so it
 * needs no font fetch and cannot fail the build on a cold network.
 */
export default async function OpengraphImage() {
  const logo = await logoDataUrl('logo-light')
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
        <div style={{ display: 'flex' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={276} height={120} alt="" />
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
