'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Registering twice is harmless, but the config call is not — guard both.
let registered = false

if (typeof window !== 'undefined' && !registered) {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
  ScrollTrigger.config({ ignoreMobileResize: true })
  registered = true
}

export { gsap, ScrollTrigger, useGSAP }
