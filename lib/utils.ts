import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** Maps a value from one range to another. */
export const mapRange = (v: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
  outMin + ((v - inMin) / (inMax - inMin)) * (outMax - outMin)

export const pad = (n: number, len = 2) => String(n).padStart(len, '0')

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })

/** Splits a string into words wrapped for per-word GSAP staggering. */
export const toWords = (text: string) => text.split(' ').filter(Boolean)
