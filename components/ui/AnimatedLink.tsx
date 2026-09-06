'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

type Props = {
  href: string
  children: React.ReactNode
  className?: string
  /** Vertical roll-up of the label on hover, in addition to the underline. */
  roll?: boolean
  onClick?: () => void
}

export function AnimatedLink({ href, children, className, roll = true, onClick }: Props) {
  const pathname = usePathname()
  const active = pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      onClick={onClick}
      data-cursor="link"
      data-active={active}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'link-underline group/link relative inline-block overflow-hidden align-middle transition-colors duration-500 ease-expo',
        active ? 'text-gold-700' : 'text-ink/80 hover:text-ink',
        className,
      )}
    >
      {roll ? (
        <span className="relative block overflow-hidden">
          <span className="block transition-transform duration-700 ease-expo group-hover/link:-translate-y-full">
            {children}
          </span>
          <span
            aria-hidden
            className="absolute inset-0 block translate-y-full text-gold-700 transition-transform duration-700 ease-expo group-hover/link:translate-y-0"
          >
            {children}
          </span>
        </span>
      ) : (
        children
      )}
    </Link>
  )
}
