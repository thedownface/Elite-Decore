'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber'
import { AdaptiveDpr, ContactShadows, Environment, Lightformer, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import {
  makeBrassTexture,
  makeConcreteTexture,
  makeMarbleTexture,
  makeWoodTexture,
} from '@/lib/textures'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useWebGLSupport } from '@/hooks/useWebGL'
import { MATERIALS } from '@/lib/data/materials'

type Props = { active: string; hovered: boolean }

type Recipe = {
  color: string
  roughness: number
  metalness: number
  clearcoat: number
  clearcoatRoughness: number
  repeat: number
  envIntensity: number
}

const RECIPES: Record<string, Recipe> = {
  marble: { color: '#f4f1ea', roughness: 0.28, metalness: 0.0, clearcoat: 0.55, clearcoatRoughness: 0.22, repeat: 1, envIntensity: 1.15 },
  walnut: { color: '#6f4a2e', roughness: 0.52, metalness: 0.0, clearcoat: 0.28, clearcoatRoughness: 0.45, repeat: 1.4, envIntensity: 0.85 },
  oak: { color: '#cdaa7c', roughness: 0.62, metalness: 0.0, clearcoat: 0.12, clearcoatRoughness: 0.6, repeat: 1.6, envIntensity: 0.8 },
  brass: { color: '#d3ad3c', roughness: 0.24, metalness: 1.0, clearcoat: 0.35, clearcoatRoughness: 0.2, repeat: 1, envIntensity: 1.6 },
  concrete: { color: '#8f8c86', roughness: 0.9, metalness: 0.05, clearcoat: 0.0, clearcoatRoughness: 1, repeat: 1.2, envIntensity: 0.7 },
}

function Slab({ active, hovered, reduced }: Props & { reduced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const drag = useRef({ active: false, lastX: 0, lastY: 0, vx: 0, vy: 0 })
  const spin = useRef({ x: -0.12, y: 0.5 })

  // Textures are generated once on mount and cached for the session.
  const maps = useMemo(
    () => ({
      marble: makeMarbleTexture(),
      walnut: makeWoodTexture(512, true),
      oak: makeWoodTexture(512, false),
      brass: makeBrassTexture(),
      concrete: makeConcreteTexture(),
    }),
    [],
  )

  useEffect(() => () => Object.values(maps).forEach((t) => t.dispose()), [maps])

  const recipe = RECIPES[active] ?? RECIPES.marble
  const map = maps[active as keyof typeof maps] ?? maps.marble

  // Punch the slab on every material change so the swap feels physical.
  const impulse = useRef(0)
  useEffect(() => {
    impulse.current = 1
  }, [active])

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    drag.current.active = true
    drag.current.lastX = e.clientX
    drag.current.lastY = e.clientY
    ;(e.target as Element)?.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!drag.current.active) return
    drag.current.vy += (e.clientX - drag.current.lastX) * 0.0045
    drag.current.vx += (e.clientY - drag.current.lastY) * 0.0035
    drag.current.lastX = e.clientX
    drag.current.lastY = e.clientY
  }

  const endDrag = () => {
    drag.current.active = false
  }

  useFrame((state, delta) => {
    const mesh = meshRef.current
    const mat = matRef.current
    if (!mesh || !mat) return

    const d = Math.min(delta, 0.05)

    if (!reduced) {
      // Inertial drag with a gentle idle rotation underneath.
      spin.current.y += drag.current.vy + (drag.current.active ? 0 : d * 0.18)
      spin.current.x += drag.current.vx
      drag.current.vy *= 0.92
      drag.current.vx *= 0.92
      spin.current.x = THREE.MathUtils.clamp(spin.current.x, -0.6, 0.6)

      mesh.rotation.y = spin.current.y
      mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, spin.current.x, 0.1)

      impulse.current = THREE.MathUtils.lerp(impulse.current, 0, 0.06)
      const s = 1 + impulse.current * 0.06
      mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, hovered ? s * 1.04 : s, 0.08))
      mesh.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.06
    }

    // Cross-fade material properties rather than swapping instantly.
    mat.color.lerp(new THREE.Color(recipe.color), 0.09)
    mat.roughness = THREE.MathUtils.lerp(mat.roughness, recipe.roughness, 0.09)
    mat.metalness = THREE.MathUtils.lerp(mat.metalness, recipe.metalness, 0.09)
    mat.clearcoat = THREE.MathUtils.lerp(mat.clearcoat, recipe.clearcoat, 0.09)
    mat.clearcoatRoughness = THREE.MathUtils.lerp(
      mat.clearcoatRoughness,
      recipe.clearcoatRoughness,
      0.09,
    )
    mat.envMapIntensity = THREE.MathUtils.lerp(
      mat.envMapIntensity,
      recipe.envIntensity * (hovered ? 1.45 : 1),
      0.07,
    )

    if (mat.map !== map) {
      map.repeat.set(recipe.repeat, recipe.repeat)
      mat.map = map
      mat.needsUpdate = true
    }
  })

  return (
    <group>
      <RoundedBox
        ref={meshRef}
        args={[2.5, 3.1, 0.34]}
        radius={0.14}
        smoothness={5}
        castShadow
        receiveShadow
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <meshPhysicalMaterial
          ref={matRef}
          map={map}
          color={recipe.color}
          roughness={recipe.roughness}
          metalness={recipe.metalness}
          clearcoat={recipe.clearcoat}
          clearcoatRoughness={recipe.clearcoatRoughness}
          envMapIntensity={recipe.envIntensity}
          reflectivity={0.6}
        />
      </RoundedBox>

      <ContactShadows
        position={[0, -1.85, 0]}
        opacity={0.42}
        scale={9}
        blur={2.9}
        far={4}
        resolution={512}
        color="#0B0B0B"
      />
    </group>
  )
}

/**
 * Studio lighting built entirely from in-scene Lightformers.
 * No HDRI is fetched, so the section adds zero network weight and works offline.
 */
function StudioEnvironment({ hovered }: { hovered: boolean }) {
  const keyRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    const key = keyRef.current
    if (!key) return
    const material = key.material as THREE.MeshBasicMaterial
    material.color.lerp(new THREE.Color(hovered ? '#fff4d6' : '#ffffff'), 0.06)
  })

  return (
    <Environment resolution={128} frames={Infinity}>
      <color attach="background" args={['#EDEBE4']} />

      {/* Key */}
      <Lightformer
        ref={keyRef}
        form="rect"
        intensity={hovered ? 5.5 : 3.6}
        position={[3.5, 4, 3]}
        rotation={[-Math.PI / 4, Math.PI / 5, 0]}
        scale={[8, 8, 1]}
      />
      {/* Warm gold rim — the source of the brass glow */}
      <Lightformer
        form="rect"
        intensity={hovered ? 3.4 : 2.1}
        color="#e9c877"
        position={[-5, 1.5, -2]}
        rotation={[0, Math.PI / 2.4, 0]}
        scale={[6, 6, 1]}
      />
      {/* Cool fill to keep whites from going muddy */}
      <Lightformer
        form="rect"
        intensity={1.1}
        color="#b9c6d8"
        position={[0, -3.5, 2]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[7, 7, 1]}
      />
      {/* Overhead strip for the specular highlight along the top edge */}
      <Lightformer
        form="ring"
        intensity={2.4}
        color="#ffffff"
        position={[0, 6, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[4, 4, 1]}
      />
    </Environment>
  )
}

export default function MaterialScene({ active, hovered }: Props) {
  const reduced = useReducedMotion()
  const webgl = useWebGLSupport()
  const [ready, setReady] = useState(false)

  useEffect(() => setReady(true), [])
  if (!ready) return null

  // Without WebGL the sampler still has to communicate the material, so fall
  // back to a large flat swatch rather than an empty frame.
  if (webgl === false) {
    const sample = MATERIALS.find((m) => m.id === active) ?? MATERIALS[0]
    return (
      <div className="absolute inset-0 grid place-items-center p-10">
        <div
          className="h-2/3 w-2/3 rounded-arch shadow-lift ring-1 ring-ink/10"
          style={{ background: sample.swatch }}
          role="img"
          aria-label={`${sample.name} swatch`}
        />
      </div>
    )
  }

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      shadows
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      camera={{ position: [0, 0.4, 6.4], fov: 34 }}
      frameloop={reduced ? 'demand' : 'always'}
    >
      <Suspense fallback={null}>
        <StudioEnvironment hovered={hovered} />
        <Slab active={active} hovered={hovered} reduced={reduced} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 4]} intensity={1.1} castShadow />
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  )
}
