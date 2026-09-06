'use client'

import { useEffect, useState } from 'react'

/**
 * Probes for a usable WebGL context once, on mount.
 *
 * Without this, machines with WebGL blocked (hardened browsers, some VMs,
 * headless environments) get an uncaught throw out of three.js the moment a
 * Canvas mounts. Returns `null` until the probe has run so callers can render
 * nothing rather than flashing a fallback.
 */
export function useWebGLSupport() {
  const [supported, setSupported] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl2') ??
        canvas.getContext('webgl') ??
        canvas.getContext('experimental-webgl')
      setSupported(Boolean(gl))
      // Release the probe context immediately; contexts are a scarce resource.
      const lose = (gl as WebGLRenderingContext | null)?.getExtension('WEBGL_lose_context')
      lose?.loseContext()
    } catch {
      setSupported(false)
    }
  }, [])

  return supported
}
