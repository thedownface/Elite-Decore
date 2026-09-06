'use client'

import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { particlesFragmentShader, particlesVertexShader } from '@/shaders'

type Props = {
  count?: number
  /** Normalised pointer, driven from the parent so DOM and GL stay in sync. */
  pointer: React.MutableRefObject<{ nx: number; ny: number }>
  reduced?: boolean
}

export function ParticleField({ count = 900, pointer, reduced = false }: Props) {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()

  const [positions, scales, seeds] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const scl = new Float32Array(count)
    const sd = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Bias toward the centre so the field reads as depth, not a flat plane.
      const r = Math.pow(Math.random(), 0.62) * 8
      const theta = Math.random() * Math.PI * 2

      pos[i * 3] = Math.cos(theta) * r
      pos[i * 3 + 1] = (Math.random() - 0.5) * 11
      pos[i * 3 + 2] = Math.sin(theta) * r * 0.7 - 2

      scl[i] = 0.35 + Math.random() * 1.5
      sd[i] = Math.random()
    }
    return [pos, scl, sd]
  }, [count])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 54 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: 1 },
      // Dark gold core fading to a lighter edge — the inverse of the dark-theme
      // ramp, so the dust stays visible against paper.
      uColorCore: { value: new THREE.Color('#7A5E14') },
      uColorEdge: { value: new THREE.Color('#C9A227') },
    }),
    [],
  )

  useFrame((state, delta) => {
    const mat = materialRef.current
    if (!mat) return

    mat.uniforms.uPixelRatio.value = Math.min(state.gl.getPixelRatio(), 2)
    if (reduced) return

    mat.uniforms.uTime.value += Math.min(delta, 0.05)

    // Damped follow keeps the parallax buttery even on a jittery pointer.
    const target = mat.uniforms.uPointer.value as THREE.Vector2
    target.x += (pointer.current.nx * 0.5 - target.x) * 0.045
    target.y += (pointer.current.ny * 0.5 - target.y) * 0.045
  })

  return (
    <points scale={Math.max(1, viewport.width / 12)} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={particlesVertexShader}
        fragmentShader={particlesFragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  )
}
