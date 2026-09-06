'use client'

import * as React from 'react'
import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'group/btn relative inline-flex select-none items-center justify-center gap-3 overflow-hidden whitespace-nowrap font-sans font-semibold uppercase tracking-luxe transition-all duration-500 ease-expo disabled:pointer-events-none disabled:opacity-45',
  {
    variants: {
      variant: {
        // Solid black — the default call to action on paper.
        primary: 'bg-ink text-paper shadow-ink hover:bg-gold-700 hover:shadow-gold',
        // Solid gold, for use against black or imagery.
        gold: 'bg-gold-600 text-ink shadow-gold hover:bg-gold-500',
        // Hairline that fills to black on hover.
        outline:
          'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper hover:shadow-ink',
        // Same idea, tuned for dark surfaces.
        inverse:
          'border border-paper/35 text-paper hover:border-paper hover:bg-paper hover:text-ink',
        ghost: 'text-ink/70 hover:text-gold-700',
      },
      size: {
        sm: 'h-10 rounded-pill px-5 text-[0.62rem]',
        md: 'h-12 rounded-pill px-7 text-[0.66rem]',
        lg: 'h-14 rounded-pill px-9 text-[0.7rem]',
        icon: 'h-12 w-12 rounded-full',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type BaseProps = VariantProps<typeof buttonVariants> & {
  className?: string
  children: React.ReactNode
  /** Renders the gold sheen sweep on hover. */
  sheen?: boolean
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: undefined }

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & { href: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button({ className, variant, size, sheen = true, children, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className)

  const inner = (
    <>
      {sheen && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gold-sheen opacity-0 transition-none group-hover/btn:animate-sheen group-hover/btn:opacity-40"
        />
      )}
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </>
  )

  if ('href' in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink
    const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')

    if (external) {
      return (
        <a className={classes} href={href} data-cursor="link" {...rest}>
          {inner}
        </a>
      )
    }
    return (
      <Link className={classes} href={href} data-cursor="link" {...rest}>
        {inner}
      </Link>
    )
  }

  return (
    <button className={classes} data-cursor="link" {...(props as ButtonAsButton)}>
      {inner}
    </button>
  )
}

export { buttonVariants }
