'use client'

import { createContext, useContext } from 'react'
import type Lenis from 'lenis'

export const LenisContext = createContext<Lenis | null>(null)

/** Access the shared Lenis instance (for programmatic scrollTo / stop / start). */
export const useLenis = () => useContext(LenisContext)
