/**
 * Elite Decore motion language.
 * One easing family, one duration scale — every animation in the site pulls from here.
 */

export const EASE = {
  expo: 'expo.out',
  expoInOut: 'expo.inOut',
  power: 'power3.out',
  luxe: 'cubic-bezier(0.16, 1, 0.3, 1)',
} as const

export const EASE_ARRAY = [0.16, 1, 0.3, 1] as const

export const DUR = {
  xs: 0.35,
  sm: 0.6,
  md: 0.9,
  lg: 1.2,
  xl: 1.8,
} as const

export const STAGGER = {
  tight: 0.04,
  base: 0.08,
  loose: 0.14,
} as const

/** Default ScrollTrigger start for entrance reveals. */
export const REVEAL_START = 'top 82%'

/** Framer Motion variants (micro-interactions only). */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.md, ease: EASE_ARRAY },
  },
} as const

export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER.base, delayChildren: 0.1 } },
} as const
