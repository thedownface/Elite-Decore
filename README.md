# Elite Decofe

An immersive marketing site for a luxury interior design & architecture studio.
Built as an editorial, motion-led experience — a poster-type hero, pinned
horizontal portfolio, a WebGL material sampler, and a consistent GSAP motion
language across every page.

**Look:** paper-white ground, near-black display type, gold as the single accent,
and soft physical shadows. Headlines are set edge to edge in a heavy neo-grotesque
at `-0.055em` tracking and `0.82` leading; a high-contrast serif italic appears
only as punctuation (the wordmark, the payoff line, pull quotes).

```
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS
GSAP + ScrollTrigger · Lenis · Three.js / React Three Fiber / Drei · Framer Motion
```

---

## Getting started

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build (fully static)
npm run start        # serve the production build
npm run typecheck    # tsc --noEmit
npm run lint         # next lint
```

Set the canonical origin before deploying — it drives metadata, JSON-LD,
`sitemap.xml` and `robots.txt`:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://elitedecofe.com
```

---

## Architecture

```
app/                        App Router — every route prerenders to static HTML
  layout.tsx                Fonts, metadata, JSON-LD graph, global chrome
  page.tsx                  Home — all nine sections
  about|services|process|contact/
  portfolio/                Archive + [slug] detail (generateStaticParams)
  blog/                     Journal + [slug] entry
  not-found.tsx             404 drawn as an unbuilt floor plan
  icon|apple-icon|opengraph-image|twitter-image.tsx
  sitemap.ts robots.ts manifest.ts

components/
  layout/                   Header, MenuOverlay, Footer, Preloader, PageHero
  sections/                 Hero, About, Services, PortfolioScroll, MaterialLab,
                            Process, Testimonials, BeforeAfter, CallToAction,
                            PortfolioGrid, ContactForm
  three/                    HeroScene, ParticleField, MaterialScene
  ui/                       Button, MagneticButton, AnimatedLink, RevealText,
                            RevealImage, FadeIn, Counter, Marquee, Cursor,
                            Grain, ScrollProgress, SectionHeading, Logo
  providers/                SmoothScrollProvider (Lenis ↔ GSAP ticker)

lib/
  data/                     All site content — projects, services, process,
                            testimonials, materials, posts, site config
  gsap.ts                   Single plugin registration point
  motion.ts                 Easing / duration / stagger scale
  seo.ts                    createMetadata + every JSON-LD builder
  textures.ts               Procedural canvas PBR maps
  images.ts utils.ts

hooks/                      useLenis, useReducedMotion, useMediaQuery,
                            useMousePosition, useInView, useIsomorphicLayoutEffect
shaders/                    GLSL for the hero gold-dust field
types/                      Domain types
styles/globals.css          Design tokens, component layer, utilities
```

---

## Motion system

Everything animates from one vocabulary defined in `lib/motion.ts`:

| Token | Value | Used for |
| --- | --- | --- |
| `EASE.expo` | `expo.out` | every entrance and hover settle |
| `DUR.md` / `DUR.lg` | `0.9s` / `1.2s` | text reveals, image masks |
| `STAGGER.tight` | `0.04` | per-word text reveal |
| `REVEAL_START` | `top 82%` | scroll-triggered entrances |

### Design tokens

| Token | Value | Notes |
| --- | --- | --- |
| `paper` | `#F4F3EF` | page ground (`paper-pure` / `paper-soft` for raised surfaces) |
| `ink` | `#0B0B0B` | display type and solid buttons |
| `gold-700` | `#856717` | the floor for gold **text** — clears 4.5:1 on paper |
| `gold-500/600` | `#C9A227` / `#A9861D` | fills, rules and hover washes only |
| `shadow-soft/card/lift` | — | contact shadow + wide soft cast |

Two type utilities carry the identity: `.display-poster` (the edge-to-edge
grotesque setting) and `.hover-wash` (a gold field that wipes up from the
baseline behind rows and cards; `.hover-wash-ink` fills to black instead).

**Scroll.** `SmoothScrollProvider` runs Lenis on GSAP's ticker so ScrollTrigger
and the smoothed scroll share one clock — without that, pinned sections drift a
frame and jitter. Lenis scrolls the window natively, so no `scrollerProxy` is
needed.

**Techniques.** Mask/clip-path text reveals (`RevealText`), curtain + un-scale
image reveals with parallax (`RevealImage`), pinned horizontal scroll with
per-panel scale/blur scrub (`PortfolioScroll`), pinned timeline with a filling
rail (`Process`), magnetic buttons, a two-part trailing cursor with `data-cursor`
states, and a session-scoped preloader.

**Reduced motion is a first-class path, not a switch.** `useReducedMotion` is
read by every animated component: Lenis is never instantiated, the custom cursor
and magnetic pull are removed, GL scenes drop to `frameloop="demand"` with a
smaller particle count, the horizontal gallery becomes a native snap-scroller,
and every reveal renders in its final state.

---

## 3D

Both scenes are `next/dynamic` with `ssr: false`, so `three` stays out of the
initial bundle. The material sampler additionally waits for an IntersectionObserver
before mounting WebGL at all, and both scenes probe for a usable context first
(`hooks/useWebGL.ts`) — without that, machines with WebGL blocked get an uncaught
throw out of three.js. The sampler falls back to a flat swatch; the hero dust
simply does not render.

- **Hero** — ~900 GPU-side particles in a custom shader (`shaders/particles.ts`);
  drift, depth-weighted pointer parallax and twinkle all run in the vertex stage.
  Normal (not additive) blending with a dark-gold core, so the dust stays visible
  against paper.
- **Material sampler** — a draggable slab with inertia, cross-fading
  `MeshPhysicalMaterial` properties between five presets. Albedo maps are
  **generated procedurally on a 2D canvas** (`lib/textures.ts`) and lighting comes
  from in-scene `Lightformer`s, so the section fetches **zero** assets — no HDRI,
  no texture downloads.

---

## SEO

- Per-page `createMetadata()` — canonical, OpenGraph, Twitter card, keywords.
- JSON-LD: Organization + LocalBusiness + InteriorDesigner, WebSite, BreadcrumbList,
  Service (×6), CreativeWork per project, BlogPosting, FAQPage, HowTo.
- `sitemap.xml` and `robots.txt` generated from the same content source.
- OG/Twitter cards and icons rendered at build time with `next/og`.

## Accessibility

Skip link · semantic landmarks and heading order · visible gold focus rings ·
`aria-current` on active nav · the comparison slider is a real `role="slider"`
with arrow/Home/End keys · form fields carry labels, `aria-invalid` and
`role="alert"` errors · all decorative art is `aria-hidden` · text colours were
tuned to clear 4.5:1 (ink at 60% opacity and gold-700 are the floors on paper;
copy set over a dark image scrim is paper-toned instead) · full
`prefers-reduced-motion` path ·
`<noscript>` fallback so JS-off visitors never see an `opacity:0` page.

## Performance

Every route prerenders to static HTML · AVIF/WebP via `next/image` with explicit
`sizes` · hero image is `priority`/`fetchPriority=high`, everything else lazy ·
`three` and both canvases code-split behind dynamic imports · fonts self-hosted
and subset by `next/font` with `display: swap` · animations restricted to
transform/opacity with `will-change` hints · `AdaptiveDpr` and a capped
`dpr={[1, 1.75]}` on both canvases.

---

## Content

All copy lives in `lib/data/*` — editing `projects.ts`, `services.ts`,
`testimonials.ts`, `process.ts`, `materials.ts` or `posts.ts` updates the pages,
the sitemap and the structured data together.

Photography is served from Unsplash through the Next image pipeline
(`next.config.mjs` → `remotePatterns`). Swap `lib/images.ts` and the `cover` /
`gallery` fields for the studio's own assets before launch.

## Deploy

```bash
vercel deploy --prod
```

`vercel.json` pins the framework, region and immutable caching for static assets.
Set `NEXT_PUBLIC_SITE_URL` in the project's environment variables.

> **Note:** never run `next build` while `next dev` is live — they share `.next`
> and the dev server's CSS chunk will start 404-ing, leaving an unstyled page.
> Stop dev, build, then restart dev.

## Before going live

- Replace Unsplash imagery with licensed studio photography.
- Point `ContactForm.onSubmit` and the footer newsletter at a real endpoint
  (server action, CRM or ESP) — both are currently client-validated stubs.
- Update `lib/data/site.ts` with real address, phone, email and social handles.
