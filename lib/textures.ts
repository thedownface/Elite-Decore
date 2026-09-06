import * as THREE from 'three'

/**
 * Procedural material textures generated on a 2D canvas at runtime.
 *
 * Shipping photographic PBR maps for five materials would cost several megabytes
 * and a dozen network round-trips. Generating them locally keeps the 3D section
 * at zero asset weight while still giving MeshPhysicalMaterial real albedo and
 * roughness variation to work with.
 */

type Ctx = CanvasRenderingContext2D

const makeCanvas = (size: number) => {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  return { canvas, ctx: canvas.getContext('2d') as Ctx }
}

const finish = (canvas: HTMLCanvasElement, repeat = 1) => {
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(repeat, repeat)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return texture
}

/** Cheap value noise — deterministic per call site, good enough for surfaces. */
const noise = (x: number, y: number, seed = 0) => {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 37.719) * 43758.5453
  return n - Math.floor(n)
}

const fbm = (x: number, y: number, octaves = 4, seed = 0) => {
  let value = 0
  let amplitude = 0.5
  let frequency = 1
  for (let i = 0; i < octaves; i++) {
    value += amplitude * noise(x * frequency, y * frequency, seed + i)
    frequency *= 2.07
    amplitude *= 0.5
  }
  return value
}

function grain(ctx: Ctx, size: number, strength: number) {
  const image = ctx.getImageData(0, 0, size, size)
  const data = image.data
  for (let i = 0; i < data.length; i += 4) {
    const g = (Math.random() - 0.5) * strength
    data[i] += g
    data[i + 1] += g
    data[i + 2] += g
  }
  ctx.putImageData(image, 0, 0)
}

export function makeMarbleTexture(size = 512) {
  const { canvas, ctx } = makeCanvas(size)

  ctx.fillStyle = '#f2efe9'
  ctx.fillRect(0, 0, size, size)

  // Primary veins: turbulent polylines with soft grey-gold shadows.
  for (let v = 0; v < 9; v++) {
    const seed = v * 3.7
    ctx.beginPath()
    let y = (v / 9) * size + Math.random() * 40
    ctx.moveTo(-20, y)
    for (let x = 0; x <= size + 20; x += 6) {
      y += (fbm(x * 0.012, v * 0.7, 4, seed) - 0.5) * 16
      ctx.lineTo(x, y)
    }
    ctx.strokeStyle = v % 3 === 0 ? 'rgba(150,140,120,0.35)' : 'rgba(120,118,112,0.22)'
    ctx.lineWidth = 0.6 + Math.random() * 2.4
    ctx.stroke()

    // Gold sub-vein shadowing the main one.
    if (v % 3 === 1) {
      ctx.strokeStyle = 'rgba(178,146,68,0.20)'
      ctx.lineWidth = 0.8
      ctx.stroke()
    }
  }

  grain(ctx, size, 9)
  return finish(canvas, 1)
}

export function makeWoodTexture(size = 512, dark = true) {
  const { canvas, ctx } = makeCanvas(size)

  const base = dark ? ['#4a2f1e', '#6b4429'] : ['#c2a077', '#d9bf95']
  const gradient = ctx.createLinearGradient(0, 0, size, size)
  gradient.addColorStop(0, base[0])
  gradient.addColorStop(1, base[1])
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, size, size)

  // Growth rings: vertical bands warped by fbm, plus occasional tight grain.
  for (let x = 0; x < size; x += 1) {
    const warp = fbm(x * 0.006, 0.5, 5, dark ? 2 : 8) * 26
    const rings = Math.sin((x + warp) * 0.16) * 0.5 + 0.5
    const tight = Math.sin((x + warp) * 0.9) * 0.5 + 0.5

    ctx.fillStyle = `rgba(0,0,0,${rings * 0.14 + tight * 0.05})`
    ctx.fillRect(x, 0, 1, size)

    if (rings > 0.94) {
      ctx.fillStyle = `rgba(255,236,200,0.05)`
      ctx.fillRect(x, 0, 1, size)
    }
  }

  grain(ctx, size, 12)
  return finish(canvas, 1)
}

export function makeConcreteTexture(size = 512) {
  const { canvas, ctx } = makeCanvas(size)

  ctx.fillStyle = '#8d8a84'
  ctx.fillRect(0, 0, size, size)

  // Board-forming: horizontal plank seams with per-board tonal drift.
  const boards = 8
  const boardHeight = size / boards
  for (let b = 0; b < boards; b++) {
    const tone = 0.5 + fbm(b * 1.3, 2.2, 3, 5) * 0.5
    ctx.fillStyle = `rgba(255,255,255,${tone * 0.06})`
    ctx.fillRect(0, b * boardHeight, size, boardHeight)

    ctx.fillStyle = 'rgba(0,0,0,0.22)'
    ctx.fillRect(0, b * boardHeight, size, 1.5)
  }

  // Pour mottling.
  for (let i = 0; i < 2600; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const r = Math.random() * 9
    ctx.fillStyle = `rgba(${Math.random() > 0.5 ? '255,255,255' : '0,0,0'},${Math.random() * 0.045})`
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  grain(ctx, size, 16)
  return finish(canvas, 1)
}

export function makeBrassTexture(size = 512) {
  const { canvas, ctx } = makeCanvas(size)

  ctx.fillStyle = '#c9a227'
  ctx.fillRect(0, 0, size, size)

  // Directional brushing.
  for (let y = 0; y < size; y++) {
    const v = fbm(0.5, y * 0.35, 3, 11)
    ctx.fillStyle = `rgba(${v > 0.5 ? '255,240,190' : '90,70,20'},${Math.abs(v - 0.5) * 0.5})`
    ctx.fillRect(0, y, size, 1)
  }

  grain(ctx, size, 6)
  return finish(canvas, 1)
}
