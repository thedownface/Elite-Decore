# Elite Decore

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
NEXT_PUBLIC_SITE_URL=https://elitedecore.in
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
                            Process, Testimonials, CallToAction,
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

## Brand mark

The monogram (`components/ui/Logo.tsx` → `Monogram`) — an E interlocked with
a gable-roofed D, its window lit gold — is drawn as flat, `currentColor` SVG
so it reads crisply on both the paper-light header/footer and the dark
preloader/favicons, at any size. It's a hand-vectorized redraw of the
studio's own logo art (`assets/logo/`, kept out of git — see `.gitignore`),
not that file used directly: the source is a moody glow-on-black concept
image, great for a loading-screen bloom but too soft to read as a small nav
icon or favicon. That said, `public/images/logo/monogram-glow.png` —
a crop of the source with black keyed to transparent (its brightness *is*
its alpha, since it's genuine additive glow-on-black art) — is used directly
as the ambient bloom behind the vector mark in the preloader
(`components/layout/Preloader.tsx`), so the two are still the same drawing.

The source file's baked-in wordmark reads "ELITE DECOFE" (a typo, or a
leftover from the old placeholder brand name) — every place that needs
the name as text uses real, correctly-spelled `SITE.name` / literal
"ELITE DECORE" instead of that raster text.

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
`aria-current` on active nav · form fields carry labels, `aria-invalid` and
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

`lib/data/site.ts` carries the studio's real name, tagline, phone, email and
Bangalore address, taken from the business card. All photography is the
studio's own — see `public/images/`, sourced from `assets/` (WhatsApp site
photos) — and there is no Unsplash or other stock imagery left in the codebase.
What is still placeholder or needs a final check:

- **Studio numbers.** `founded`, the `STATS` block and the team breakdown in
  `app/about/page.tsx` reflect the founding year, team size and project count
  given during setup (2020 · a small in-house team · 20+ projects). Update
  them the moment any of those change.
- **Testimonials.** The quotes in `lib/data/testimonials.ts` are written for
  this launch, tied to the real projects but not sourced from actual clients.
  Swap in real, permissioned client quotes as they come in.
- **Portfolio years.** Each project in `lib/data/projects.ts` has a plausible
  but unconfirmed `year` and no named client (`client: 'Private Residence'`
  throughout, deliberately — verify actual completion dates and client
  attribution before publishing anything more specific).
- **Excluded photo.** One photo in `assets/portfolio/Jai fortune apartments/`
  (`...2.34.18 PM.jpeg`) carries a third-party studio's watermark and
  copyright notice ("ATTICARCH") and was deliberately left out of
  `public/images/` — do not publish it as Elite Decore's own work. If that
  room should be in the portfolio, re-shoot or re-source it without the
  watermark.
- **Journal cover reuse.** Blog post covers in `lib/data/posts.ts` reuse real
  project photos thematically (there's no dedicated editorial photography) —
  swap in dedicated shots if you want the Journal to feel distinct from the
  Portfolio.
- **Social handles.** The four URLs in `SITE.socials` were guessed from the
  brand name. Verify each or remove it — they feed `sameAs` in the JSON-LD.
- **Map pin.** `localBusinessJsonLd` publishes no `geo` coordinates. Add the
  real latitude/longitude for the Kodigehalli Road address when convenient.
- The enquiry form and the footer newsletter both submit to Web3Forms
  (`lib/forms.ts`) — client-validated, then posted as JSON, with a honeypot
  field against spam. No backend of our own, so submissions land as email
  notifications to whatever inbox the Web3Forms access key is registered to;
  there's no CRM/ESP behind it. Swap `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (see
  `.env.example`) if that key is ever rotated or you move to a different
  provider — everything else in `lib/forms.ts` stays the same shape.
- WhatsApp click-to-chat is wired to `SITE.whatsappHref` (currently
  `919738125710`) in three places: the floating button on every page
  (`components/ui/WhatsAppButton.tsx`), the Contact page, and the footer.
  Update that one field if the number ever changes.
