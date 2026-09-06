'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr, Preload } from '@react-three/drei'
import * as THREE from 'three'
import { ParticleField } from './ParticleField'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useWebGLSupport } from '@/hooks/useWebGL'
import type { Pointer } from '@/hooks/useMousePosition'

/** Slow dolly + pointer drift, applied to the camera rather than the field. */
function CameraRig({ pointer, reduced }: { pointer: React.MutableRefObject<Pointer>; reduced: boolean }) {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 12))

  useFrame((state) => {
    if (reduced) return
    const t = state.clock.elapsedTime
    target.current.set(
      pointer.current.nx * 0.75,
      -pointer.current.ny * 0.5 + Math.sin(t * 0.18) * 0.12,
      12 + Math.sin(t * 0.12) * 0.35,
    )
    camera.position.lerp(target.current, 0.035)
    camera.lookAt(0, 0, 0)
  })

  return null
}

export default function HeroScene({ pointer }: { pointer: React.MutableRefObject<Pointer> }) {
  const reduced = useReducedMotion()
  const webgl = useWebGLSupport()

  // The dust is pure decoration — if WebGL is unavailable, render nothing
  // rather than letting three.js throw.
  if (!webgl) return null

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      camera={{ position: [0, 0, 12], fov: 42, near: 0.1, far: 60 }}
      frameloop={reduced ? 'demand' : 'always'}
      aria-hidden
    >
      <Suspense fallback={null}>
        <ParticleField pointer={pointer} reduced={reduced} count={reduced ? 260 : 900} />
        <CameraRig pointer={pointer} reduced={reduced} />
        <AdaptiveDpr pixelated />
        <Preload all />
      </Suspense>
    </Canvas>
  )
}
