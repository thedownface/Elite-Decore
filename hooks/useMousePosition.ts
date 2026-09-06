'use client'

import { useEffect, useRef } from 'react'

export type Pointer = { x: number; y: number; nx: number; ny: number }

/**
 * Ref-based pointer tracking (no re-renders) for parallax and 3D camera drift.
 * `nx`/`ny` are normalised to -1..1 from the viewport centre.
 */
export function useMousePosition() {
  const pointer = useRef<Pointer>({ x: 0, y: 0, nx: 0, ny: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX
      pointer.current.y = e.clientY
      pointer.current.nx = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.ny = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return pointer
}
