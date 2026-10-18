import { ImageResponse } from 'next/og'
import { logoDataUrl } from '@/lib/logo-asset'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/** Apple touch icon — the studio's E/D emblem from the official logo, on paper. */
export default async function AppleIcon() {
  const mark = await logoDataUrl('mark')
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F4F3EF',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mark} width={110} height={129} alt="" />
      </div>
    ),
    size,
  )
}
