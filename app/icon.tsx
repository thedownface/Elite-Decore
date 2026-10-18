import { ImageResponse } from 'next/og'
import { logoDataUrl } from '@/lib/logo-asset'

export const size = { width: 64, height: 64 }
export const contentType = 'image/png'

/** Generated favicon — the studio's E/D emblem from the official logo, on paper. */
export default async function Icon() {
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
          borderRadius: 14,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={mark} width={44} height={51} alt="" />
      </div>
    ),
    size,
  )
}
