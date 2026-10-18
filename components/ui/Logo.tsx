import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * The studio's logo, from the official artwork (elite decore logo.zip).
 * `tone="dark"` is the original black-and-gold art for paper-light surfaces;
 * `tone="light"` swaps the black for paper so it reads on ink (preloader).
 * Height is set via className; width follows the artwork's aspect ratio.
 */
type Tone = 'dark' | 'light'

const LOGO = { width: 1600, height: 697 }
const MARK = { width: 512, height: 599 }

export function Logo({
  className,
  tone = 'dark',
  priority,
}: {
  className?: string
  tone?: Tone
  priority?: boolean
}) {
  return (
    <Image
      src={tone === 'light' ? '/images/logo/logo-light.png' : '/images/logo/logo.png'}
      alt="Elite Decore — Creative Meets Living"
      width={LOGO.width}
      height={LOGO.height}
      priority={priority}
      sizes="320px"
      className={cn('h-12 w-auto select-none', className)}
      draggable={false}
    />
  )
}

/** The E/D emblem on its own, for tight spots. */
export function LogoMark({
  className,
  tone = 'dark',
  priority,
}: {
  className?: string
  tone?: Tone
  priority?: boolean
}) {
  return (
    <Image
      src={tone === 'light' ? '/images/logo/mark-light.png' : '/images/logo/mark.png'}
      alt=""
      aria-hidden
      width={MARK.width}
      height={MARK.height}
      priority={priority}
      sizes="128px"
      className={cn('h-9 w-auto select-none', className)}
      draggable={false}
    />
  )
}
