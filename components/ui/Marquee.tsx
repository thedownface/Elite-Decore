'use client'

import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
  speed?: number
  reverse?: boolean
  pauseOnHover?: boolean
}

/**
 * CSS-driven infinite marquee. The track is duplicated once and translated by
 * exactly -50%, so the loop is seamless with no JS measuring on resize.
 */
export function Marquee({
  children,
  className,
  speed = 42,
  reverse = false,
  pauseOnHover = true,
}: Props) {
  return (
    <div className={cn('mask-fade-x group/marquee relative overflow-hidden', className)}>
      <div
        className={cn(
          'flex w-max animate-marquee',
          reverse && '[animation-direction:reverse]',
          pauseOnHover && 'group-hover/marquee:[animation-play-state:paused]',
        )}
        style={{ animationDuration: `${speed}s` }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
