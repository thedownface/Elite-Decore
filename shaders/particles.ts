/**
 * Gold dust field for the hero.
 *
 * The vertex stage does all the motion: each particle carries a random seed and
 * scale, drifts on a slow sine, and reacts to a smoothed pointer uniform. The
 * fragment stage draws a soft radial falloff so points never show square edges.
 */

export const particlesVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform vec2  uPointer;
  uniform float uPixelRatio;

  attribute float aScale;
  attribute float aSeed;

  varying float vAlpha;
  varying float vSeed;

  void main() {
    vec3 pos = position;

    // Slow organic drift — three offset sines so the field never visibly loops.
    float t = uTime * 0.16;
    pos.x += sin(t + aSeed * 6.2831) * 0.42;
    pos.y += cos(t * 0.82 + aSeed * 12.566) * 0.55 + mod(t * 0.28 + aSeed, 1.0) * 0.6;
    pos.z += sin(t * 0.64 + aSeed * 3.1415) * 0.34;

    // Depth-weighted pointer parallax: near particles travel further.
    float depth = smoothstep(-6.0, 6.0, pos.z);
    pos.x += uPointer.x * (0.85 + depth * 1.5);
    pos.y += -uPointer.y * (0.6 + depth * 1.1);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mvPosition.z);

    // Fade at the edges of the volume so particles never pop in or out.
    float edge = 1.0 - smoothstep(4.0, 9.0, length(pos.xy));
    vAlpha = edge * (0.16 + aScale * 0.24);
    vSeed = aSeed;
  }
`

export const particlesFragmentShader = /* glsl */ `
  uniform vec3 uColorCore;
  uniform vec3 uColorEdge;

  varying float vAlpha;
  varying float vSeed;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    // Soft core with a wide falloff. On a paper ground the particles read as
    // settling dust rather than glowing light, so the core is the *darker* of
    // the two tints and alpha does the work that additive blending used to.
    float core = 1.0 - smoothstep(0.0, 0.5, d);
    float glow = pow(core, 2.0);

    vec3 tint = mix(uColorEdge, uColorCore, glow);

    // Gentle per-particle twinkle keyed off the seed.
    float twinkle = 0.72 + 0.28 * sin(vSeed * 40.0);

    gl_FragColor = vec4(tint, glow * vAlpha * twinkle);
    #include <colorspace_fragment>
  }
`
